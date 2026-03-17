# CRM Créditos Visibles

CRM para gestión de aliados comerciales de Créditos Visibles. Pipeline Kanban, integración con WhatsApp, seguimiento de interacciones y control de documentación.

## Guía de Despliegue (Paso a Paso)

### PASO 1: Crear cuenta en Supabase (Base de datos gratuita)

1. Ve a **https://supabase.com** y crea una cuenta gratis
2. Clic en **"New Project"**
3. Ponle nombre: `crm-creditos-visibles`
4. Elige una contraseña segura para la base de datos
5. Región: **South America (São Paulo)** para mejor velocidad
6. Clic en **"Create new project"** y espera ~2 minutos

### PASO 2: Crear las tablas de la base de datos

1. En tu proyecto de Supabase, ve al menú lateral → **SQL Editor**
2. Clic en **"New query"**
3. Copia y pega TODO el contenido del archivo `supabase-setup.sql`
4. Clic en **"Run"** (botón verde)
5. Deberías ver: "Success. No rows returned" — eso es correcto

### PASO 3: Configurar la autenticación

1. En Supabase, ve a **Authentication** → **Providers**
2. Asegúrate de que **Email** esté habilitado
3. Ve a **Authentication** → **URL Configuration**
4. En "Site URL" pon la URL de tu sitio (la pondrás después de Vercel)
5. Opcionalmente desactiva "Confirm email" en **Authentication** → **Settings** para que no pida confirmar correo

### PASO 4: Obtener las credenciales de Supabase

1. Ve a **Settings** → **API** (menú lateral)
2. Copia la **URL** (algo como `https://xxxxx.supabase.co`)
3. Copia la **anon public key** (clave larga que empieza con `eyJ...`)
4. Guárdalas, las necesitarás en el paso 6

### PASO 5: Subir el código a GitHub

1. Ve a **https://github.com** e inicia sesión
2. Crea un nuevo repositorio: `crm-creditos-visibles`
3. Sube todos los archivos de este proyecto al repositorio

### PASO 6: Desplegar en Vercel

1. Ve a **https://vercel.com** e inicia sesión con tu cuenta de GitHub
2. Clic en **"Add New" → "Project"**
3. Selecciona tu repositorio `crm-creditos-visibles`
4. En **"Environment Variables"** agrega estas dos variables:
   - `VITE_SUPABASE_URL` = la URL que copiaste en paso 4
   - `VITE_SUPABASE_ANON_KEY` = la anon key que copiaste en paso 4
5. Clic en **"Deploy"**
6. Espera ~1 minuto y tendrás tu URL (algo como `crm-creditos-visibles.vercel.app`)

### PASO 7: Actualizar URL en Supabase

1. Vuelve a Supabase → **Authentication** → **URL Configuration**
2. En "Site URL" pon tu URL de Vercel (ej: `https://crm-creditos-visibles.vercel.app`)
3. En "Redirect URLs" agrega también esa URL

### PASO 8: Crear usuarios para tu equipo

1. Abre tu CRM en la URL de Vercel
2. Clic en "Crear cuenta" e ingresa correo y contraseña
3. Repite para cada miembro del equipo (2-3 personas)

---

## Dominio personalizado (Opcional)

Si tienes un dominio como `creditosvisibles.com`:
1. En Vercel → tu proyecto → **Settings** → **Domains**
2. Agrega `crm.creditosvisibles.com`
3. Configura el DNS según las instrucciones de Vercel
4. Actualiza la URL en Supabase (paso 7)

## Estructura del Proyecto

```
crm-creditos-visibles/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx           ← CRM completo
│   ├── supabaseClient.js ← Conexión a Supabase
│   ├── main.jsx          ← Entry point
│   └── index.css         ← Estilos globales
├── index.html
├── package.json
├── vite.config.js
├── supabase-setup.sql    ← Script para crear tablas
└── .env.example          ← Variables de entorno de ejemplo
```

## Desarrollo local

```bash
npm install
cp .env.example .env     # Edita con tus credenciales de Supabase
npm run dev               # Abre en http://localhost:5173
```
