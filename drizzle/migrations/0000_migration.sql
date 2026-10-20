create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.mission_media (
  id text primary key default 'mission',
  video_path text not null,
  mime_type text not null,
  transcript text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 'mission')
);
grant select on public.mission_media to anon, authenticated;
grant insert, update, delete on public.mission_media to authenticated;
grant all on public.mission_media to service_role;
alter table public.mission_media enable row level security;
create policy "anyone reads mission media" on public.mission_media for select to anon, authenticated using (true);
create policy "admins insert" on public.mission_media for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "admins update" on public.mission_media for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "admins delete" on public.mission_media for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "anyone reads site media" on storage.objects for select to anon, authenticated using (bucket_id = 'site-media');
create policy "admins upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "admins update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "admins delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));