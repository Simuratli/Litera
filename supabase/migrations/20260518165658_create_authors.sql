create table authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Herkes okuyabilir
alter table authors enable row level security;
create policy "Authors are viewable by everyone"
  on authors for select using (true);