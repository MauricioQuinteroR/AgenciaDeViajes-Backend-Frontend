

# App FullStack para Gestión de Agencia De Viajes

## Introducción

Este proyecto se divide en dos: Backend Y FrontEnd
El Backend Permite realizar operaciones de CRUD para entidades como Usuarios, Hoteles, Habitaciones, Huéspedes, Reservas y Contactos, usando nestjs, graphql, JWT para seguridad y Bcrypt para encriptado.
El Frontend esta construido con Angular 16 y node 18.10.0 Consumiendo con Apollo Client una API GRAPHQL.

## Características principales del FrontEnd

 * Utiliza las tecnologías Angular 16, GraphQL con Apollo consumiendo una API desplegada en AWS en EC2 con dominio en Route53.
 * Por el momento no se puede usar Angular 17 por la compatibilidad con graphql
 
 <img src="/assets/angularyapollo.png" alt="logo" style="height: 500px; width:100%;"/>

# AND

<img src="/assets/jwt.jpg" alt="logo" style="height: 200px; width:100%;"/>

## Instalación y ejecución

* npm install
* ng s -o

# DashBoard Usuario
<img src="/assets/usuario1.png" alt="logo" style="height: 50%; width:50%;"/>
<img src="/assets/usuario2.png" alt="logo" style="height: 50%; width:50%;"/>
<img src="/assets/usuario3.png" alt="logo" style="height: 50%; width:50%;"/>


# DashBoard Administrador 

<img src="/assets/admin1.png" alt="logo" style="height: 24%; width:23%;"/>
<img src="/assets/admin2.png" alt="logo" style="height: 20%; width:20%;"/>
<img src="/assets/admin3.png" alt="logo" style="height: 80%; width:100%;"/>
<img src="/assets/admin4.png" alt="logo" style="height: 20%; width:20%;"/>
<img src="/assets/admin5.png" alt="logo" style="height: 20%; width:20%;"/>


## Características principales del Backend


* Implementa un conjunto completo de operaciones de CRUD para entidades de gestión de hoteles.
* Utiliza las tecnologías NestJs, MongoDB y GraphQL.
* Es fácil de instalar y usar.

 <img src="/assets/nestjsgraphqlmongodb.png" alt="logo" style="height: 500px; width:100%;"/>

# Entidades con su CRUD
* Contacto De Emergencia
* Habitacion
* Hotel
* Huesped
* Reserva
* Usuario Admin


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


#Licencia
[MIT]

# Autor
[Ing. Edgar Carlos Mauricio Quintero Romero - Linkedin](https://www.linkedin.com/in/alzheimeer)
[Ing. Edgar Carlos Mauricio Quintero Romero - Github 1](https://github.com/alzheimeer)
[Ing. Edgar Carlos Mauricio Quintero Romero - Github 2](https://github.com/SIS-VIDA-EdgarQuintero)


