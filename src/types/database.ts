-- =============================================
-- Phase 2: Education structure foundation
-- =============================================

-- Grades
create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  name text not null,                    -- e.g. "Grade 7"
  level text not null check (level in ('primary', 'secondary')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Subjects
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,                    -- e.g. "Mathematics"
  name_st text,                          -- Sesotho name (optional)
  code text,                             -- short code
  created_at timestamptz not null default now()
);

-- Curricula (e.g. Lesotho National Curriculum 2026)
create table if not exists public.curricula (
  id uuid primary key default gen_random_uuid(),
  country text not null default 'Lesotho',
  name text not null,
  year integer,
  version text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Courses
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  subject_id uuid references public.subjects(id) on delete set null,
  grade_id uuid references public.grades(id) on delete set null,
  curriculum_id uuid references public.curricula(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft', 'processing', 'ai_generated', 'under_review', 'approved', 'published', 'archived')),
  is_ai_generated boolean not null default false,
  language text not null default 'en' check (language in ('en', 'st')),
  thumbnail_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Basic course modules (can be expanded later)
create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.grades enable row level security;
alter table public.subjects enable row level security;
alter table public.curricula enable row level security;
alter table public.courses enable row level security;
alter table public.course_modules enable row level security;

-- Public read for published content (students can browse)
create policy "Anyone can view published courses"
  on public.courses for select
  using (status = 'published' or auth.uid() = created_by);

create policy "Authenticated users can view grades"
  on public.grades for select
  to authenticated
  using (true);

create policy "Authenticated users can view subjects"
  on public.subjects for select
  to authenticated
  using (true);

create policy "Authenticated users can view curricula"
  on public.curricula for select
  to authenticated
  using (true);

create policy "Anyone can view modules of published courses"
  on public.course_modules for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = course_modules.course_id
        and (c.status = 'published' or c.created_by = auth.uid())
    )
  );

-- Teachers & admins can create / update their own courses
create policy "Teachers and admins can insert courses"
  on public.courses for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('teacher', 'admin')
    )
  );

create policy "Owners and admins can update courses"
  on public.courses for update
  to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Simple seed data (optional – remove later)
insert into public.grades (name, level, sort_order) values
  ('Grade 7', 'primary', 7),
  ('Grade 8', 'secondary', 8),
  ('Grade 9', 'secondary', 9),
  ('Grade 10', 'secondary', 10)
on conflict do nothing;

insert into public.subjects (name, name_st, code) values
  ('Mathematics', 'Lipalo', 'MATH'),
  ('English', 'Senyesemane', 'ENG'),
  ('Sesotho', 'Sesotho', 'SES'),
  ('Science', 'Saense', 'SCI')
on conflict do nothing;
