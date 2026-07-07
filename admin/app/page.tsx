'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function IndexPage() {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (session === undefined) return;
    router.replace(session ? '/questions' : '/login');
  }, [session, router]);

  return <p className="center-note muted">Loading…</p>;
}
