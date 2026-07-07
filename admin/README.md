# Ump Admin

Next.js admin UI for the Ump question bank. Trainers draft questions; the
admin reviews, publishes, and clears question reports. All reads and writes
go through Supabase row-level security with the signed-in user's JWT — the
service_role key is never used here.

## One-time setup

1. Run `../supabase/admin.sql` in the Supabase SQL editor (after
   `schema.sql` and `reports.sql`). It creates `user_roles` and the
   authenticated policies.
2. Create accounts in the dashboard (Authentication → Users → Add user →
   Create new user; set a password, check "Auto Confirm User").
3. Grant each account a role in the SQL editor:

   ```sql
   insert into public.user_roles (user_id, role)
   select id, 'admin' from auth.users where email = 'you@example.com';
   -- 'trainer' for trainers
   ```

4. Disable public signups (Authentication → Sign In / Providers → Email →
   turn off sign-ups) so accounts stay invite-only.
5. `cp .env.example .env.local` and fill in the same URL and anon key the
   mobile app uses.

## Run

```sh
npm install
npm run dev   # http://localhost:3000
```

## Roles

| Ability                             | trainer | admin |
| ----------------------------------- | ------- | ----- |
| Read all questions (incl. drafts)   | ✓       | ✓     |
| Create drafts                       | ✓       | ✓     |
| Edit / delete drafts                | ✓       | ✓     |
| Edit / delete published questions   |         | ✓     |
| Publish / unpublish                 |         | ✓     |
| Read question reports               | ✓       | ✓     |
| Clear question reports              |         | ✓     |

Question ids are permanent (the app's spaced-repetition progress is keyed on
them): they're generated at create time and never editable.
