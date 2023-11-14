import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}



  getHoteles() {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          hotels {
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
      `
    }).valueChanges;
  }

  getHotelById(hotelId: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($id: String!) {
          hotelById(id: $id) {
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
      variables: { id: hotelId }
    }).valueChanges;
  }


  getHabitaciones() {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          habitaciones {
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
      `
    }).valueChanges;
  }

  habitacionById(Id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          habitaciones {
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
      variables: { id: Id }
    }).valueChanges;
  }

  getHabitacionesByHotelId(id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($id: String!) {
          habitacionesByHotelId(id: $id) {
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
      variables: { id: id }
    }).valueChanges;
}




  getHuespedById(huespedId: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query HuespedById($id: String!) {
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
        id: huespedId
      }
    }).valueChanges;
  }

  createHuesped(huespedData: {
    nombres: string,
    apellidos: string,
    tipoDocumento: string,
    numeroDocumento: string,
    email?: string,
    telefono?: string,
    genero?: string,
    fechaNacimiento?: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateHuesped($huespedData: CreateHuespedInput!) {
          createHuesped(createHuespedDto: $huespedData) {
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
        huespedData
      }
    });
  }

  updateHuesped(huespedId: string, updateHuespedDto: {
    apellidos?: string,
    nombres?: string,
    tipoDocumento?: string,
    numeroDocumento?: string,
    email?: string,
    telefono?: string,
    genero?: string,
    fechaNacimiento?: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateHuesped($id: String!, $updateHuespedDto: UpdateHuespedInput!) {
          updateHuesped(id: $id, updateHuespedDto: $updateHuespedDto) {
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
        id: huespedId,
        updateHuespedDto
      }
    });
  }


  getReservaById(reservaId: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query ReservaById($id: String!) {
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
        id: reservaId
      }
    }).valueChanges;
  }

  createReserva(reservaData: {
    habitacionId: string,
    huespedId: string,
    cantidadPersonas: number,
    fechaEntrada: string,
    fechaSalida: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateReserva($reservaData: CreateReservaInput!) {
          createReserva(createReservaDto: $reservaData) {
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
        reservaData
      }
    });
  }


  updateReserva(reservaId: string, updateReservaDto: {
    cantidadPersonas?: number,
    fechaEntrada?: string,
    fechaSalida?: string,
    habitacionId?: string,
    huespedId?: string
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateReserva($id: String!, $updateReservaDto: UpdateReservaInput!) {
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
        id: reservaId,
        updateReservaDto
      }
    });
  }


  createContacto(contactoData: {
    nombreCompleto: string,
    telefonoContacto: string,
    reservaId: string,
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation createContacto($contactoData: CreateContactoInput!) {
          createContacto(createContactoDto: $contactoData) {
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
        contactoData
      }
    });
  }


}
