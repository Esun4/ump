'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';
import { Role } from '@/lib/types';

// Wraps every signed-in page: header nav, sign-out, and the auth gate.
// The gate is UX only — RLS is what actually stops an unauthorized user.
export default function Shell({
  children,
}: {
  children: (role: Role) => React.ReactNode;
}) {
  const { session, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session === null) router.replace('/login');
  }, [session, router]);

  if (session === undefined || session === null || role === undefined) {
    return <p className="center-note muted">Loading…</p>;
  }

  if (role === null) {
    return (
      <div className="login-wrap">
        <div className="card login-card">
          <h1>No access</h1>
          <p className="muted sub">
            {session.user.email} is signed in but has no role yet. Ask the
            administrator to add you to user_roles.
          </p>
          <button
            className="btn-secondary"
            onClick={() => void getSupabase().auth.signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const navLink = (href: string, label: string) => (
    <Link href={href} className={pathname.startsWith(href) ? 'active' : ''}>
      {label}
    </Link>
  );

  return (
    <>
      <header className="shell-header">
        <span className="brand">Ump Admin</span>
        <nav>
          {navLink('/questions', 'Questions')}
          {navLink('/reports', 'Reports')}
        </nav>
        <span className="spacer" />
        <span className="who">
          {session.user.email} · {role}
        </span>
        <button
          className="btn-link"
          onClick={() => void getSupabase().auth.signOut()}
        >
          Sign out
        </button>
      </header>
      <main className="container">{children(role)}</main>
    </>
  );
}
