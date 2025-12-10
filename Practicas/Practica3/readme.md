# ComicVault API REST (TypeScript + Node.js + Express + MongoDB)

## Objetivo

Crear una API REST completa llamada **ComicVault**, que gestione una colección de tebeos de distintos usuarios.

---

## Requisitos funcionales

### 1. Autenticación de usuarios

* Permitir registrar nuevos usuarios con nombre y contraseña.
* Implementar un sistema de login que devuelva un **token JWT**.
* Las rutas protegidas solo podrán usarse si se envía un token válido en la cabecera.

### 2. Gestión de tebeos

* Cada usuario podrá **crear, leer, actualizar y eliminar** sus propios tebeos.
* Un tebeo debe incluir al menos los campos:

  * `title` (título)
  * `author` (autor o guionista)
  * `year` (año de publicación)
  * `publisher` (editorial, opcional)
  * `userId` (referencia al propietario del tebeo)

### 3. Rutas principales

| Método | Ruta           | Descripción                               |
| ------ | -------------- | ----------------------------------------- |
| POST   | /auth/register | Registrar un usuario                      |
| POST   | /auth/login    | Iniciar sesión y obtener token            |
| GET    | /comics        | Listar los tebeos del usuario autenticado |
| POST   | /comics        | Crear un nuevo tebeo                      |
| PUT    | /comics/:id    | Modificar un tebeo existente              |
| DELETE | /comics/:id    | Eliminar un tebeo                         |

### 4. Base de datos

* Usar **MongoDB** con la librería oficial de Node.js (`mongodb`).
* Crear las colecciones `users` y `comics`.
* Asegurar que un usuario solo pueda acceder o modificar **sus propios documentos**.

### 5. Aspectos técnicos

* Backend con **Node.js** y **Express**.
* Usar **TypeScript**.
* Implementar un middleware para **validar el token JWT**.
* Devolver **mensajes de error claros** en formato JSON.

### 6. Extra (opcional)

* Añadir **paginación** o **búsqueda por título** dentro de los tebeos del usuario.
* Permitir marcar tebeos como “leídos” o “pendientes”.
* Crear un endpoint público `/comics/public` que liste los títulos más populares sin requerir autenticación.

---

## Entrega final

* Crear un **repositorio en GitHub** con la solución.
* Subir el código y asegurarse de que compile sin errores.
* Entregar el **enlace al repositorio** en la plataforma de la asignatura.

---

> Nota: Se recomienda organizar el proyecto con carpetas para `routes`, `controllers`, `models`, y `middlewares`. Mantener un solo archivo de configuración para la conexión a MongoDB y la inicialización de Express.
