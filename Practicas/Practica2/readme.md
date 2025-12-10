# API y Cliente LaserDisc (TypeScript + Express + Axios)

## Objetivo

Crear una pequeña API REST con Express en TypeScript que gestione una colección de discos LaserDisc y un cliente que la use mediante Axios, todo dentro de un único archivo `index.ts`.

---

## Parte 1: API con Express

### Requisitos generales

* El servidor debe ejecutarse en el puerto 3000.
* Los discos estarán guardados en un array en memoria (no se usa base de datos).
* Cada disco debe seguir este tipo:

```
type LD = {
  id: number
  filmName: string
  rotationType: “CAV” | “CLV”,
  region: string,
  lengthMinutes: number,
  videoFormat: “NTSC” | “PAL”
}
```

### Pasos a seguir

1. Importar Express y configurar el servidor.
2. Crear un array inicial de discos (simulado).
3. Implementar los siguientes endpoints:

   * GET /ld → Mostrar todos los discos.
   * GET /ld/:id → Mostrar un disco por su ID.
   * POST /ld → Guardar un nuevo disco.
   * DELETE /ld/:id → Eliminar un disco.
4. Arrancar el servidor:

   * `app.listen(3000, () => console.log("Servidor en http://localhost:3000"));`

### Detalles de los endpoints

| Método | Ruta    | Descripción              | Qué debe hacer                                                                                       |
| ------ | ------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| GET    | /ld     | Mostrar todos los discos | Devolver el array completo en formato JSON                                                           |
| GET    | /ld/:id | Mostrar un disco por ID  | Buscar por ID. Si no existe, devolver 404 con `{ message: “Disco no encontrado" }`                   |
| POST   | /ld     | Guardar un nuevo disco   | Recibir todos los datos en el body. Generar un id nuevo y añadirlo al array. Devolver el nuevo disco |
| DELETE | /ld/:id | Eliminar un disco        | Buscar el disco por ID y eliminarlo. Si no existe, devolver error 404                                |

---

## Parte 2: Cliente con Axios

### Requisitos

* Crear una función `testApi()` en el mismo archivo que:

  1. Espere 1 segundo después de arrancar el servidor.
  2. Use Axios para llamar a la API e imprimir los resultados por consola.

### Pasos concretos

1. Obtener todos los discos (GET /ld).
2. Mostrar la lista inicial en consola.
3. Crear un nuevo disco (POST /ld).
4. Volver a obtener todos los discos (GET /ld).
5. Comprobar que aparece el nuevo disco.
6. Eliminar ese disco (DELETE /ld/:id).
7. Mostrar la lista final.

---

## Criterios de evaluación (10 puntos)

* Todo debe estar en un solo archivo `index.ts`.
* Script de ejecución con ts-node y nodemon funcional.
* No se debe usar ninguna carpeta ni módulos adicionales.
* Se entregará el enlace del repo directamente clonable con git.
* Mal uso de la herramienta como commits posteriores al examen se traducirá en 0.
* Durante todo el examen se deberá grabar pantalla en todo momento.
* El uso de cualquier herramienta generativa está absolutamente prohibido.
* Se pueden usar apuntes e información en internet siempre que no se rompa la norma anterior.
* El incumplimiento de cualquiera de las anteriores normas dará automáticamente un 0.
