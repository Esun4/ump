'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from './supabase';
import { Role } from './types';

export interface AuthState {
  // undefined = still resolving; null = signed out / no role.
  session: Session | null | undefined;
  role: Role | null | undefined;
}

// Tracks the Supabase session and the user's row in user_roles. A signed-in
// user with no role sees a "no access" screen; RLS would block them anyway,
// this just makes it legible.
export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [role, setRole] = useState<Role | null | undefined>(undefined);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === undefined) return;
    if (session === null) {
      setRole(null);
      return;
    }
    let cancelled = false;
    setRole(undefined);
    getSupabase()
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setRole((data?.role as Role | undefined) ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  return { session, role };
}
