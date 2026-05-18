create table books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author_id uuid references authors(id) on delete set null,
  cover_url text,
  published_year int,
  created_at timestamptz default now()
);

alter table books enable row level security;
create policy "Books are viewable by everyone"
  on books for select using (true);