import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  loginUser(email: string, password: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query loginUser($email: String!, $password: String!) {
         loginUser(loginUserDto: { email: $email, password: $password })
        }
      `,
      variables: { email: email, password: password }
    }).valueChanges;
  }

  registerUser(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation registerUser($email: String!, $password: String!) {
          registerUser(createUserDto: { email: $email, password: $password }) {
            id
            email
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        email,
        password
      }
    });
  }


  updatePassword(userId: string, newPassword: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updatePassword($userId: String!, $newPassword: String!) {
          updatePassword(userId: $userId, newPassword: $newPassword) {
            id
            email
          }
        }
      `,
      variables: {
        userId,
        newPassword
      }
    });
  }


  updateEmail(userId: string, newEmail: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateEmail($userId: String!, $newEmail: String!) {
          updateEmail(userId: $userId, newEmail: $newEmail) {
            id
            email
          }
        }
      `,
      variables: {
        userId,
        newEmail
      }
    });
  }


  updateUserActive(id: string, active: boolean) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateUserActive($id: String!, $active: Boolean!) {
          updateUserActive(id: $id, active: $active) {
            id
            email
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id,
        active
      }
    });
  }



  getUsers() {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          users {
            id
            email
            active
            createdAt
            updatedAt
          }
        }
      `
    }).valueChanges;
  }



  getUserById(id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getUserById($id: String!) {
          userById(id: $id) {
            id
            email
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id
      }
    }).valueChanges;
  }


  getUserByEmail(email: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getUserByEmail($email: String!) {
          userByEmail(email: $email) {
            id
            email
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        email
      }
    }).valueChanges;
  }



  getReservas() {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          reservas {
            id
            fechaEntrada
            fechaSalida
            cantidadPersonas
            habitacionId
            huespedId
            active
            createdAt
            updatedAt
          }
        }
      `
    }).valueChanges;
  }

  getReservaById(id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getReservaById($id: String!) {
          reservaById(id: $id) {
            id
            fechaEntrada
            fechaSalida
            cantidadPersonas
            habitacionId
            huespedId
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id
      }
    }).valueChanges;
  }

  deleteReserva(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteReserva($id: String!) {
          deleteReserva(id: $id)
        }
      `,
      variables: {
        id
      }
    });
  }

  updateReserva(id: string, updateReservaDto: { cantidadPersonas: number }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateReserva($id: String!, $updateReservaDto: UpdateReservaInput!) {
          updateReserva(id: $id, updateReservaDto: $updateReservaDto) {
            id
            fechaEntrada
            fechaSalida
            cantidadPersonas
            habitacionId
            huespedId
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id,
        updateReservaDto
      }
    });
  }


  getHuespedes() {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          huespedes {
            id
            nombres
            apellidos
            tipoDocumento
            numeroDocumento
            email
            telefono
            genero
            fechaNacimiento
            active
            createdAt
            updatedAt
          }
        }
      `
    }).valueChanges;
  }


  getHuespedById(id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getHuespedById($id: String!) {
          huespedById(id: $id) {
            id
            nombres
            apellidos
            tipoDocumento
            numeroDocumento
            email
            telefono
            genero
            fechaNacimiento
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id
      }
    }).valueChanges;
  }


  createHotel(hotelData: {
    nombre: string,
    ubicacion: string,
    descripcion: string,
    nombrefoto: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation createHotel($hotelData: CreateHotelInput!) {
          createHotel(createHotelDto: $hotelData) {
            id
            nombre
            ubicacion
            descripcion
            nombrefoto
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        hotelData
      }
    });
  }


  updateHotelActive(id: string, active: boolean) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateHotelActive($id: String!, $active: Boolean!) {
          updateHotelActive(id: $id, active: $active) {
            id
            nombre
            ubicacion
            descripcion
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id,
        active
      }
    });
  }


  updateHotel(id: string, hotelData: {
    nombre?: string,
    ubicacion?: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateHotel($id: String!, $updateHotelDto: UpdateHotelInput!) {
          updateHotel(id: $id, updateHotelDto: $updateHotelDto) {
            id
            nombre
            ubicacion
            descripcion
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id,
        updateHotelDto: hotelData
      }
    });
  }

  createHabitacion(habitacionData: {
    tipo: string,
    costoBase: number,
    estado: string,
    hotelId: string,
    nombrefoto: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation createHabitacion($createHabitacionDto: CreateHabitacionInput!) {
          createHabitacion(createHabitacionDto: $createHabitacionDto) {
            id
            tipo
            costoBase
            impuestos
            estado
            hotelId
            nombrefoto
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        createHabitacionDto: habitacionData
      }
    });
  }



  updateHabitacion(id: string, habitacionData: {
    estado?: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateHabitacion($id: String!, $updateHabitacionDto: UpdateHabitacionInput!) {
          updateHabitacion(id: $id, updateHabitacionDto: $updateHabitacionDto) {
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
      `,
      variables: {
        id,
        updateHabitacionDto: habitacionData
      }
    });
  }


  getContactos() {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          contactos {
            id
            nombreCompleto
            telefonoContacto
            reservaId
            active
            createdAt
            updatedAt
          }
        }
      `
    }).valueChanges;
  }

  contactoById(id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query contactoById($id: String!) {
          contactoById(id: $id) {
            id
            nombreCompleto
            telefonoContacto
            reservaId
            active
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id
      }
    }).valueChanges;
  }




}
