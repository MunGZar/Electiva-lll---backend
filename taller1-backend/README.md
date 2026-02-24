# Snippet Safe - API REST

API REST segura para la gestión de fragmentos de código (snippets) privados, construida con Node.js, Express y MongoDB.

## 🚀 Características

- **Autenticación JWT**: Seguridad robusta para el manejo de sesiones.
- **Muro de Privacidad**: Los usuarios solo pueden ver, editar y borrar sus propios snippets.
- **Validación de Datos**: Entradas saneadas con `express-validator`.
- **Manejo de Errores Global**: Respuestas en formato JSON consistentes.
- **Relaciones con MongoDB**: Implementación de 'Mongoose References' para vincular usuarios y snippets.

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local o una cuenta en MongoDB Atlas)

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd taller1-backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:
   ```env
   PORT=3000
   MONGODB_URI=tu_cadena_de_conexion_a_mongodb
   JWT_SECRET=una_llave_secreta_muy_segura
   JWT_EXPIRES_IN=30d
   ```

## 🚀 Ejecución

**Modo Desarrollo (con nodemon):**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```

## 🛣️ Endpoints (v1)

### Autenticación
| Método | Endpoint | Acción |
| :--- | :--- | :--- |
| POST | `/api/v1/auth/register` | Registrar un nuevo usuario |
| POST | `/api/v1/auth/login` | Iniciar sesión y obtener el token JWT |

### Snippets (Protegidos por Token)
*Requieren el Header `Authorization: Bearer <TOKEN>`*

| Método | Endpoint | Acción |
| :--- | :--- | :--- |
| POST | `/api/v1/snippets` | Crear un nuevo snippet |
| GET | `/api/v1/snippets` | Listar solo mis snippets |
| PUT | `/api/v1/snippets/:id` | Editar un snippet propio |
| DELETE | `/api/v1/snippets/:id` | Borrar un snippet propio |

## 🔒 Privacidad Garantizada

El sistema utiliza el ID del usuario extraído directamente del Token JWT para todas las operaciones de base de datos. Esto garantiza que un usuario nunca pueda manipular el recurso de otro, incluso si conoce el ID.

## 🛠️ Tecnologías Utilizadas

- **Backend**: Express.js
- **Base de Datos**: MongoDB & Mongoose
- **Seguridad**: JSON Web Token (JWT) & Bcryptjs
- **Validación**: Express-validator
