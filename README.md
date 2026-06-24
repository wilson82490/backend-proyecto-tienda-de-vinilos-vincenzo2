# Vinilos API

API REST desarrollada con Node.js, Express y MongoDB para gestionar el catálogo de una tienda de vinilos. Incluye autenticación JWT, roles de administrador, paginación, búsqueda, filtros y endpoints auxiliares para géneros y vinilos destacados.

---

## Características

- Catálogo de vinilos con **paginación**, **búsqueda**, **ordenamiento** y **filtro por género**
- Endpoints de géneros (`GET /api/vinilos/genres`) y vinilos destacados (`GET /api/vinilos/featured`)
- Modelo de vinilo con campo **price** (precio obligatorio, mínimo 0)
- Registro e inicio de sesión con **JWT**
- Contraseñas encriptadas con **bcrypt**
- Rutas protegidas con rol de **administrador** (CRUD de vinilos)
- Seeders de vinilos y usuarios de ejemplo
- Tests con **Mocha**, **Chai** y **Supertest**

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Node.js | Runtime |
| Express 5 | Framework HTTP |
| MongoDB / Mongoose | Base de datos y ODM |
| jsonwebtoken | Autenticación JWT |
| bcryptjs | Hash de contraseñas |
| dotenv | Variables de entorno |
| cors | CORS |
| Mocha + Chai + Supertest | Tests |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [npm](https://www.npmjs.com/)
- Base de datos **MongoDB** (Atlas o instancia local)
- Repositorio clonado en tu máquina

---

## Instalación y configuración

### 1. Clonar e instalar

```bash
git clone <url-del-repositorio>
cd backend-proyecto-tienda-de-vinilos-vincenzo2
git switch dev
npm install
```

### 2. Variables de entorno

Copia el archivo de ejemplo y completa tus valores:

```bash
cp .env-example .env
```

Contenido de `.env-example`:

```env
PORT=3000
MONGODB_URI=
JWT_SECRET=
```

Ejemplo de configuración local (sin credenciales reales):

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre-db>?appName=<app>
JWT_SECRET=una-clave-secreta-segura
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (por defecto `3000`) |
| `MONGODB_URI` | URI de conexión a MongoDB |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |

> **Importante:** no subas el archivo `.env` al repositorio ni compartas credenciales reales.

---

## Ejecución

### Desarrollo (con recarga automática)

```bash
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

### Producción

```bash
npm start
```

### Cargar datos iniciales

Poblar vinilos de ejemplo:

```bash
npm run seed
```

Poblar usuarios de ejemplo:

```bash
npm run seed:users
```

#### Credenciales por defecto (seeder de usuarios)

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | `admin@vinilos.com` | `admin123` |
| Usuario | `user@vinilos.com` | `user1234` |

### Tests

```bash
npm test
```

Los tests usan la configuración definida en `test/setup.js` y `.env.test`.

---

## Endpoints

### Home

#### `GET /`

Mensaje de bienvenida.

**Respuesta `200`:**

```json
{
  "message": "Bienvenidos a la API de vinilos"
}
```

---

### Autenticación

Prefijo: `/api/auth`

#### `POST /api/auth/register`

Registra un nuevo usuario.

**Body:**

```json
{
  "name": "Vincenzo Acconcia",
  "email": "user@example.com",
  "password": "1234567"
}
```

**Respuesta `201`:** usuario creado (sin contraseña).

---

#### `POST /api/auth/login`

Inicia sesión y devuelve un token JWT.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "1234567"
}
```

**Respuesta `200`:**

```json
{
  "message": "Login correcto",
  "token": "jwt-token",
  "user": {
    "_id": "...",
    "name": "Vincenzo Acconcia",
    "email": "user@example.com",
    "admin": false
  }
}
```

---

### Vinilos

Prefijo: `/api/vinilos`

#### `GET /api/vinilos`

Lista vinilos con paginación, búsqueda, ordenamiento y filtro por género.

**Query params:**

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| `page` | number | `1` | Página actual |
| `limit` | number | `4` | Vinilos por página |
| `search` | string | `""` | Búsqueda en título y descripción |
| `genre` | string | — | Filtra por género exacto |
| `sortBy` | string | `title` | Campo de ordenamiento |
| `order` | string | `asc` | `asc` o `desc` |

**Respuesta `200`:**

```json
{
  "vinilos": [
    {
      "_id": "...",
      "title": "Thriller",
      "genre": "pop",
      "year": 1982,
      "price": 29.99,
      "image": "https://...",
      "featured": false,
      "createdAt": "2026-06-05T17:31:02.907Z",
      "updatedAt": "2026-06-05T17:31:02.907Z"
    }
  ],
  "totalPages": 3,
  "currentPage": 1,
  "totalItems": 12
}
```

---

#### `GET /api/vinilos/genres`

Devuelve la lista de géneros distintos presentes en el catálogo.

**Respuesta `200`:**

```json
["pop", "rock", "jazz"]
```

---

#### `GET /api/vinilos/featured`

Devuelve hasta 3 vinilos marcados como destacados (`featured: true`).

**Respuesta `200`:**

```json
{
  "vinilos": [
    {
      "_id": "...",
      "title": "Abbey Road",
      "genre": "rock",
      "year": 1969,
      "price": 34.99,
      "image": "https://...",
      "featured": true
    }
  ]
}
```

---

#### `GET /api/vinilos/:id`

Obtiene un vinilo por ID (incluye `description`).

**Respuesta `200`:** objeto vinilo completo.  
**Respuesta `404`:** `{ "message": "Vinilo no encontrado" }`

---

#### `POST /api/vinilos`

Crea un vinilo. **Requiere JWT + rol admin.**

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "title": "Thriller",
  "description": "Álbum icónico de Michael Jackson",
  "genre": "pop",
  "year": 1982,
  "price": 29.99,
  "image": "https://...",
  "featured": false
}
```

**Respuesta `201`:** vinilo creado.

---

#### `PUT /api/vinilos/:id`

Actualiza un vinilo. **Requiere JWT + rol admin.**

**Headers:** `Authorization: Bearer <token>`

**Body:** campos a actualizar (misma estructura que POST).

**Respuesta `200`:** vinilo actualizado.

---

#### `DELETE /api/vinilos/:id`

Elimina un vinilo. **Requiere JWT + rol admin.**

**Headers:** `Authorization: Bearer <token>`

**Respuesta `200`:**

```json
{
  "message": "Vinilo borrado"
}
```

---

## Modelo Vinilo

| Campo | Tipo | Notas |
|---|---|---|
| `title` | String | Obligatorio, mínimo 3 caracteres |
| `description` | String | Opcional |
| `genre` | String | Obligatorio |
| `year` | Number | Obligatorio |
| `price` | Number | Obligatorio, ≥ 0 |
| `image` | String | URL obligatoria |
| `featured` | Boolean | Default `false` |
| `createdAt` / `updatedAt` | Date | Timestamps automáticos |

---

## Estructura del proyecto

```txt
backend-proyecto-tienda-de-vinilos-vincenzo2/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── vinilo.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── admin.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Vinilo.js
│   ├── routes/
│   │   ├── auth.router.js
│   │   └── vinilo.router.js
│   └── seeders/
│       ├── user.seeder.js
│       └── vinilo.seeder.js
├── test/
│   ├── auth.test.js
│   ├── vinilos.test.js
│   └── setup.js
├── app.js
├── index.js
├── .env-example
└── package.json
```

---

## Deploy

Backend desplegado en Render:

```txt
https://mi-api.onrender.com
```

---

## Autor

Proyecto desarrollado como práctica del curso Full Stack de Neoland.

**Autor:** Vincenzo Acconcia
