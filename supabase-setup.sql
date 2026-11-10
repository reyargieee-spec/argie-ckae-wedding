-- Run this once in Supabase → SQL Editor → New query → Run.
-- Guests can add entries and see the shared walls. Only you (in the
-- Supabase dashboard) can edit or delete. RSVPs and time-capsule
-- letters are write-only for guests: only you can read them.

create table if not exists photos      (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), name text not null, url text not null, caption text, prompt text);
create table if not exists wishes      (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), name text not null, relation text, message text not null, color text);
create table if not exists reactions   (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), kind text not null, target text, count int default 1 check (count between 1 and 50));
create table if not exists votes       (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), poll int not null, choice text not null check (choice in ('groom','bride')), name text);
create table if not exists quiz_scores (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), name text not null, score int not null, total int not null);
create table if not exists songs       (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), name text, title text not null, artist text);
create table if not exists capsule     (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), name text not null, message text not null);
create table if not exists rsvps       (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), name text not null, contact text, attending boolean, guests int, diet text, message text);

-- Length limits so nobody can post huge text
alter table wishes  add constraint wishes_len  check (char_length(message) <= 600 and char_length(name) <= 60);
alter table capsule add constraint capsule_len check (char_length(message) <= 2000);
alter table photos  add constraint photos_len  check (char_length(coalesce(caption,'')) <= 140);

do $$
declare t text;
begin
  foreach t in array array['photos','wishes','reactions','votes','quiz_scores','songs','capsule','rsvps'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "guests add" on %I for insert to anon with check (true)', t);
  end loop;
  foreach t in array array['photos','wishes','reactions','votes','quiz_scores','songs'] loop
    execute format('create policy "guests read" on %I for select to anon using (true)', t);
  end loop;
end $$;

-- Public photo bucket (images only, max 8 MB each)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('wedding-photos', 'wedding-photos', true, 8388608, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "guests upload photos" on storage.objects
  for insert to anon with check (bucket_id = 'wedding-photos');
