# Sekolong.com

Digital learning platform for Lesotho and Africa.

**Stack:** React · Vite · TypeScript · Tailwind CSS · Supabase

---

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and add your Supabase project URL and anon key:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up Supabase (profiles table + trigger)

In the Supabase SQL Editor, run:

```sql
-- Profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'student' check (role in ('student', 'teacher', 'parent', 'admin')),
  avatar_url text,
  language text not null default 'en' check (language in ('en', 'st')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Allow insert for the trigger / signup flow
create policy "Enable insert for authenticated users"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production (Hostinger)

```bash
npm run build
```

Upload the contents of the `dist/` folder to your Hostinger public directory.

---

## Project structure

```
src/
├── components/     # UI & layout components
├── contexts/       # Auth context
├── hooks/          # Custom hooks (future)
├── lib/            # Supabase client & utilities
├── pages/          # Route pages
├── types/          # TypeScript types
└── assets/         # Static assets
```


