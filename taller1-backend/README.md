# Snippet Safe - API REST

API para guardar snippets de código de forma privada. Hecha con Node.js, Express y MongoDB.

## Características

- Autenticación con JWT
- Cada usuario solo ve/edita/borra sus propios snippets
- Validación con `express-validator`
- Manejo de errores global en JSON

## Requisitos

- Node.js
- MongoDB

## Instalación

git clone <https://github.com/MunGZar/Electiva-lll---backend>
cd taller1-backend
npm install

Crear archivo `.env`:

PORT=3000
MONGODB_URI=la url que nos da mongodb atlas
JWT_SECRET=tu_llave_secreta
JWT_EXPIRES_IN=30d

## Ejecución

npm run dev    # desarrollo
npm start      # producción

## Endpoints

Base URL: http://localhost:3000/api/v1

### Auth

**Registro** — POST /api/v1/auth/register
```json
{
  "name": "Jose",
  "email": "jose@correo.com",
  "password": "123456"
}
```

**Login** — POST /api/v1/auth/login
```json
{
  "email": "jose@correo.com",
  "password": "123456"
}
```

Ambos devuelven:
```json
{ "success": true, "token": "eyJhbG..." }
```

### Snippets

Todas requieren header: "Authorization: Bearer <TOKEN>"

**Crear** — `POST /api/v1/snippets
```json
{
  "title": "Hola Mundo",
  "language": "python",
  "code": "print('hola')",
  "tags": ["python", "basico"]
}
```
`tags` es opcional.

**Listar los mios** —GET /api/v1/snippets

No lleva body.

**Editar** — PUT /api/v1/snippets/:id
```json
{
  "title": "Titulo editado",
  "language": "javascript",
  "code": "console.log('editado')",
  "tags": ["js"]
}
```

**Borrar** — DELETE /api/v1/snippets/:id

No lleva body.

## Errores comunes



400 = Validación fallida (campos faltantes, password corta, etc) 
401 = redenciales inválidas - Sin token - in permiso 
404 = nippet no encontrado

## Orden para probar

1. Registrarse (POST /auth/register)
2. Login (POST /auth/login) → copiar token
3. Crear snippet (POST /snippets)
4. Listar (GET /snippets)
5. Editar (PUT /snippets/:id)
6. Borrar (DELETE /snippets/:id)

## Prueba de Fuego (Seguridad)

1. Registrar User A y User B
2. Crear un snippet con token de User A
3. Intentar borrarlo con token de User B
4. El server responde 401 - "No tiene permiso para borrar este snippet"
5. El snippet de A sigue intacto

Resultado: correcto — un usuario no puede tocar los snippets de otro.

## Tecnologías

- Express.js
- MongoDB + Mongoose
- JWT + Bcryptjs
- Express-validator
