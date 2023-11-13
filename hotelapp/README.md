# API GraphQL de Gestión de Hoteles

## Introducción

Este proyecto es una API GraphQL para un sistema de gestión de hoteles. Permite realizar operaciones de CRUD para entidades como Usuarios, Hoteles, Habitaciones, Huéspedes, Reservas y Contactos.

## Características principales

* Implementa un conjunto completo de operaciones de CRUD para entidades de gestión de hoteles.
* Utiliza las tecnologías Node.js, MongoDB y GraphQL.
* Es fácil de instalar y usar.

## Instalación y ejecución

Para instalar y ejecutar esta API localmente, sigue estos pasos:

1. Clona el repositorio:

Utiliza el código con precaución. Más información
git clone https://github.com/[SIS-VIDA-EdgarQuintero]/api-graphql-hoteles.git


2. Instala las dependencias:

- npm install

3. Configura las variables de entorno:

- Crea un archivo .env en la raíz del proyecto y configura las variables necesarias (por ejemplo, la cadena de conexión a MongoDB).

4. Ejecuta el proyecto:

- npm run start:dev

5. Uso de la API

- Una vez que la API esté en ejecución, puedes realizar consultas y mutaciones GraphQL.

Endpoint GraphQL: http://localhost:3000/graphql

Puedes usar herramientas como altair para interactuar con la API, o integrarla con tu frontend.

En la carpeta Altair en la raiz del proyecto encontras todos los archivos para que importes las queries y mutaciones disponibles

6. Ejemplos de consultas y mutaciones

**Crear un hotel:**

```
graphql
mutation {
  createHotel(createHotelDto: { nombre: "tequendama" }) {
    id
    nombre
    ubicacion
    descripcion
    active
    createdAt
    updatedAt
  }
}

```

**Obtener habitaciones:**

```
graphql
query {
  habitaciones {
    id
    tipo
    costoBase
    impuestos
    estado
    active
    createdAt
    updatedAt
  }
}

```

#Contribuir
Para contribuir a este proyecto, por favor envía un pull request con tus cambios para revisión.

#Licencia
[MIT]


