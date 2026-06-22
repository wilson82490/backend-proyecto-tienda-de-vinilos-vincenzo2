# Vinilos API

API REST desarrollada con Node.js, Express y MongoDB para gestionar vinilos.

---

# Características

- CRUD completo de vinilos
- Registro de usuarios
- Inicio de sesión con JWT
- Contraseñas encriptadas con bcrypt
- Autenticación mediante Bearer Token
- Rutas protegidas con rol de administrador
- MongoDB Atlas
- Seeder de datos iniciales
- Tests con Mocha, Chai y Supertest

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- Mocha
- Chai
- Supertest

---

# Instalación

Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

Ingresar al proyecto:

```bash
cd backend-proyecto-tienda-de-vinilos-vincenzo2
```

Cambiar a la rama `dev`:

```bash
git switch dev
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` a partir de `.env-example`:

```bash
cp .env-example .env
```

Luego edita `.env` con tu configuración.

## .env-example

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

Poblar la base de datos con vinilos de ejemplo:

```bash
npm run seed
```

Poblar la base de datos con usuarios de ejemplo:

```bash
npm run seed:users
```

---

# Endpoints

---

## Home

### GET /

Devuelve un mensaje de bienvenida.

### Respuesta exitosa

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

### Respuesta exitosa

#### Status: 201 Created

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "_id": "...",
    "name": "Vincenzo Acconcia",
    "email": "user@example.com"
  }
}
```

### Posibles errores

#### Status: 422 Unprocessable Entity

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "El correo no es valido"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "Contraseña muy corta, mínimo 6 caracteres"
}
```

#### Status: 400 Bad Request

```json
{
  "message": "El correo ya esta registrado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al registrar al usuario"
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

### Respuesta exitosa

#### Status: 200 OK

```json
{
  "message": "Login correcto",
  "token": "jwt-token",
  "user": {
    "_id": "...",
    "name": "Juan Pérez",
    "email": "example@example.com",
    "admin": false
  }
}
```

### Posibles errores

#### Status: 422 Unprocessable Entity

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 401 Unauthorized

```json
{
  "message": "Credenciales invalidas"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al iniciar sesión"
}
```

---

# Vinilos

## Obtener todos los vinilos

### GET /api/vinilos

Devuelve todos los vinilos.

### Respuesta exitosa

#### Status: 200 OK

```json
[
  {
    "_id": "...",
    "title": "Thriller",
    "genre": "pop",
    "year": 1982,
    "image": "https://...",
    "featured": false,
    "createdAt": "2026-06-05T17:31:02.907Z",
    "updatedAt": "2026-06-05T17:31:02.907Z"
  }
]
```

### Posibles errores

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al obtener los vinilos"
}
```

---

## Obtener vinilo por ID

### GET /api/vinilos/:id

Devuelve un vinilo por su ID.

### Respuesta exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "title": "Thriller",
  "genre": "pop",
  "year": 1982,
  "image": "https://...",
  "featured": false,
  "createdAt": "2026-06-05T17:31:02.907Z",
  "updatedAt": "2026-06-05T17:31:02.907Z"
}
```

### Posibles errores

#### Status: 404 Not Found

```json
{
  "message": "Vinilo no encontrado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al obtener el vinilo"
}
```

---

## Crear vinilo

### POST /api/vinilos

Requiere autenticación y rol de administrador.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Body

```json
{
  "title": "Thriller",
  "genre": "pop",
  "year": 1982,
  "image": "https://..."
}
```

### Respuesta exitosa

#### Status: 201 Created

```json
{
  "_id": "...",
  "title": "Thriller",
  "genre": "pop",
  "year": 1982,
  "image": "https://...",
  "featured": false,
  "createdAt": "2026-06-05T17:31:02.907Z",
  "updatedAt": "2026-06-05T17:31:02.907Z"
}
```

### Posibles errores

#### Status: 401 Unauthorized

```json
{
  "message": "Falta el token"
}
```

#### Status: 403 Forbidden

```json
{
  "message": "Acceso denegado"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al crear el vinilo"
}
```

---

## Actualizar vinilo

### PUT /api/vinilos/:id

Requiere autenticación y rol de administrador.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Body

```json
{
  "title": "Thriller Remastered",
  "genre": "pop",
  "year": 2003,
  "image": "https://..."
}
```

### Respuesta exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "title": "Thriller Remastered",
  "genre": "pop",
  "year": 2003,
  "image": "https://...",
  "featured": false,
  "createdAt": "2026-06-05T17:31:02.907Z",
  "updatedAt": "2026-06-05T17:31:02.907Z"
}
```

### Posibles errores

#### Status: 401 Unauthorized

```json
{
  "message": "Token invalido"
}
```

#### Status: 403 Forbidden

```json
{
  "message": "Acceso denegado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Vinilo no encontrado"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "El titulo tiene que ser un string"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al actualizar el vinilo"
}
```

---

## Eliminar vinilo

### DELETE /api/vinilos/:id

Requiere autenticación y rol de administrador.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta exitosa

#### Status: 200 OK

```json
{
  "message": "Vinilo borrado"
}
```

### Posibles errores

#### Status: 401 Unauthorized

```json
{
  "message": "Falta el token"
}
```

#### Status: 403 Forbidden

```json
{
  "message": "Acceso denegado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Vinilo no encontrado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al borrar el vinilo"
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
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
└── seeders/

test/
├── auth.test.js
├── vinilos.test.js
└── setup.js

app.js
index.js
```

---

# Autor

Proyecto desarrollado como práctica del curso Full Stack de Neoland.

Autor: Vincenzo Acconcia
