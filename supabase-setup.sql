-- ============================================
-- CRM CRÉDITOS VISIBLES - Setup de Base de Datos
-- Ejecuta este script en Supabase SQL Editor
-- ============================================

-- 1. Tabla de aliados
create table public.allies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  company text not null,
  phone text not null,
  email text,
  city text,
  instagram text,
  nit text,
  stage integer default 1 not null,
  rut_doc boolean default false,
  camara_com boolean default false,
  cedula_doc boolean default false,
  contrato_doc boolean default false,
  otro_doc boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Tabla de interacciones
create table public.interactions (
  id uuid default gen_random_uuid() primary key,
  ally_id uuid references public.allies(id) on delete cascade not null,
  type text not null,
  note text not null,
  created_at timestamptz default now()
);

-- 3. Índices para mejor rendimiento
create index idx_allies_stage on public.allies(stage);
create index idx_interactions_ally on public.interactions(ally_id);
create index idx_interactions_date on public.interactions(created_at);

-- 4. Habilitar RLS (Row Level Security)
alter table public.allies enable row level security;
alter table public.interactions enable row level security;

-- 5. Políticas de seguridad (usuarios autenticados pueden ver y editar todo)
create policy "Usuarios autenticados pueden ver aliados"
  on public.allies for select
  to authenticated
  using (true);

create policy "Usuarios autenticados pueden crear aliados"
  on public.allies for insert
  to authenticated
  with check (true);

create policy "Usuarios autenticados pueden editar aliados"
  on public.allies for update
  to authenticated
  using (true);

create policy "Usuarios autenticados pueden eliminar aliados"
  on public.allies for delete
  to authenticated
  using (true);

create policy "Usuarios autenticados pueden ver interacciones"
  on public.interactions for select
  to authenticated
  using (true);

create policy "Usuarios autenticados pueden crear interacciones"
  on public.interactions for insert
  to authenticated
  with check (true);

create policy "Usuarios autenticados pueden eliminar interacciones"
  on public.interactions for delete
  to authenticated
  using (true);

-- 6. Función para actualizar updated_at automáticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger allies_updated_at
  before update on public.allies
  for each row execute function update_updated_at();

-- ============================================
-- ¡Listo! Tu base de datos está configurada.
-- ============================================
