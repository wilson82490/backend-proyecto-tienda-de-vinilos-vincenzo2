<!-- # Backend Proyecto vinilos - 

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <repository_url>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd backend-proyecto-tienda-de-vinilos-vincenzo2
   ```

3. Cambiar a la rama `dev`:

   ```bash
   git switch dev
   ```

4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Crea un archivo `.env` basado en el archivo `.env-example` y configura tus variables de entorno:

   ```bash
   cp .env-example .env
   ```

   Luego, edita el archivo `.env` para agregar tu configuración personalizada, como el puerto y la URI de MongoDB.

6. Inicia el servidor:
   ```bash
   npm start
   ```
   Para desarrollo con recarga automática, puedes usar:
   ```bash
   npm run dev
   ```

## Seeders

Si deseas poblar la base de datos con datos de ejemplo, puedes ejecutar el seeder:

```bash
npm run seed
```

## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la API a través de `http://localhost:<PORT>/api`, donde `<PORT>` es el puerto que configuraste en tu archivo `.env`.

### Obtener todas los vinilos

metodo GET a `/api/vinilos` para obtener una lista de todas los vinilos.

response:

```json
[
  {
    "_id": "6a2...",
    "title": "Breaking Bad",
    "genre": "Drama",
    "year": 2008,
    "image": "https://picsum.photos/300/400?random=1",
    "featured": true,
    "createdAt": "2026-06-05T17:31:02.907Z",
    "updatedAt": "2026-06-05T17:31:02.907Z"
  }
]
```

### Obtener un vinilo por ID

metodo GET a `/api/vinilos/:id` para obtener los detalles de un vinilo específica por su ID.

response:

status: 200

```json
{
  "_id": "6a2...",
  "title": "Breaking Bad",
  "genre": "Drama",
  "year": 2008,
  "image": "https://picsum.photos/300/400?random=1",
  "featured": true,
  "createdAt": "2026-06-05T17:31:02.907Z",
  "updatedAt": "2026-06-05T17:31:02.907Z"
}
```

status: 404

```json
{
  "message": "Vinilo no encontrado"
}
```
 -->


 # Vinilos API

API REST desarrollada con Node.js, Express y MongoDB para gestionar películas y series.

---

# Características

- CRUD completo de películas
- Registro de usuarios
- Inicio de sesión con JWT
- Contraseñas encriptadas con bcrypt
- Autenticación mediante Bearer Token
- MongoDB Atlas
- Seeder de datos iniciales
- Tests con Vitest y Supertest

---

# 🛠 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- Vitest
- Supertest

---

# Instalación

Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

Ingresar al proyecto:

```bash
cd backend-proyecto-tienda-de-vinilos-series
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` utilizando como referencia `.env.example`.

## .env.example

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

## Ejemplo

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster0.1yxp6uf.mongodb.net/discos?appName=Cluster0
JWT_SECRET=mi-clave-secreta
```

---

# Ejecutar en desarrollo

```bash
npm run dev
```

---

# Ejecutar en producción

```bash
npm start
```

---

# Ejecutar tests

```bash
npm test
```

---

# Cargar datos iniciales

```bash
npm run seed
```

---

# Endpoints

---

## Home

### GET /

Devuelve un mensaje de bienvenida.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Bienvenidos a la API de vinilos"
}
```

---

# Autenticación

## Registro

### POST /api/auth/register

Registra un nuevo usuario.

### Body

```json
{
  "name": "Vincenzo Acconcia",
  "email": "user@example.com",
  "password": "1234567"
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "message": "Usuario registrado correctamente"
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 400 Bad Request

```json
{
  "message": "El usuario ya existe"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Login

### POST /api/auth/login

Inicia sesión y devuelve un token JWT.

### Body

```json
{
  "email": "example@example.com",
  "password": "123456"
}
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "token": "jwt-token",
  "user": {
    "_id": "...",
    "name": "Juan Pérez",
    "email": "example@example.com"
  }
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 401 Unauthorized

```json
{
  "message": "Credenciales inválidas"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

# Vinilos

## Obtener todos las Vinilos

### GET /api/vinilos

Devuelve todas las películas.

### Respuesta Exitosa

#### Status: 200 OK

```json
[
  {
    "_id": "...",
    "title": "thriller",
    "genre": "pop",
    "year": 1989,
    "image": "https://..."
  }
]
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Obtener vinilo por ID

### GET /api/vinilo/:id

Devuelve una película por su ID.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "title": "thriller",
  "genre": "pop",
  "year": 1989,
  "image": "https://..."
}
```

### Posibles Errores

#### Status: 404 Not Found

```json
{
  "message": "vinilo no encontrada"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Crear vinilo

### POST /api/vinilos
Requiere autenticación.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Body

```json
{
  "title": "thriller",
  "genre": "pop",
  "year": 1989,
  "image": "https://..."
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "_id": "...",
  "title": "thriller",
  "genre": "pop",
  "year": 1989,
  "image": "https://..."
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 400 Bad Request

```json
{
  "message": "Datos inválidos"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Actualizar película

### PUT /api/movies/:id

Requiere autenticación.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "title": "thriller Recargada",
  "genre": "pop",
  "year": 2003,
  "image": "https://..."
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "vinilo no encontrada"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Eliminar película

### DELETE /api/movies/:id

Requiere autenticación.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Vinilo eliminado correctamente"
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Vinilo no encontrada"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

# Deploy

Backend desplegado en Render.

```txt
https://mi-api.onrender.com
```

---

# Estructura del proyecto

```txt
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── seeders/
├── tests/
│
└── app.js

index.js
```

---

# Autor

Proyecto desarrollado como práctica del curso Full Stack de Neoland.

Autor: Vincenzo Acconcia