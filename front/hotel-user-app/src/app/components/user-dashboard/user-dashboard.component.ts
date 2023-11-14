import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlService } from 'src/app/graphql.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { HabitacionesModalComponent } from '../habitaciones-modal/habitaciones-modal.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  hoteles: any[] = [];
  constructor(private graphqlService: GraphqlService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarHoteles();
  }

  cargarHoteles(): void {
    this.graphqlService.getHoteles().subscribe({
      next: (response) => {
        console.log(response.data.hotels);
        this.hoteles = response.data.hotels;
      },
      error: (error) => console.error(error)
    });
  }

  abrirImagenHotel(nombrefoto: string): void {
    Swal.fire({
      imageUrl: 'assets/' + nombrefoto,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: 'Imagen del hotel'
    });
  }

  abrirHabitacionesModal(hotelId: string, nombreHotel: string): void {
    const dialogRef = this.dialog.open(HabitacionesModalComponent, {
      width: '1000px',
      data: { hotelId: hotelId, nombreHotel: nombreHotel }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crearReserva(result);
      }
    });
  }



  crearReserva(datosReserva: any): void {
    this.graphqlService.createHuesped(datosReserva.datosHuesped).subscribe({
      next: (responseHuesped: any) => {
        if (responseHuesped.data && responseHuesped.data.createHuesped && responseHuesped.data.createHuesped.id) {
          this.graphqlService.createReserva({
            habitacionId: datosReserva.habitacionId,
            huespedId: responseHuesped.data.createHuesped.id,
            fechaEntrada: datosReserva.fechaEntrada,
            fechaSalida: datosReserva.fechaSalida,
            cantidadPersonas: datosReserva.cantidadPersonas
          }).subscribe({
            next: (responseReserva:any) => {
              if (responseReserva.data && responseReserva.data.createReserva && responseReserva.data.createReserva.id) {
                // Aquí asumimos que la reserva se ha creado con éxito y procedemos a crear el contacto de emergencia
                this.graphqlService.createContacto({
                  nombreCompleto: datosReserva.nombreCompletoContacto,
                  telefonoContacto: datosReserva.telefonoContacto,
                  reservaId: responseReserva.data.createReserva.id
                }).subscribe({
                  next: (responseContacto) => {
                    console.log('Contacto de emergencia creado', responseContacto);
                    Swal.fire(`¡Reserva Creada!', 'Su reserva es la # ${responseReserva.data.createReserva.id} y sera enviada a su email.`);
                  },
                  error: (errorContacto) => {
                    console.error('Error al crear el contacto de emergencia:', errorContacto);
                    Swal.fire('Error', 'Contacto de Emergencia No Creado. Intente Más Tarde.', 'error');
                  }
                });
              } else {
                console.error('No se pudo obtener el ID de la reserva');
                Swal.fire('Error', 'No se pudo obtener el ID de la reserva. Intente Más Tarde.', 'error');
              }
            },
            error: (errorReserva) => {
              console.error('Error al crear la reserva:', errorReserva);
              Swal.fire('Error', 'Reserva No Exitosa. Intente Más Tarde.', 'error');
            }
          });
        } else {
          console.error('Datos del huésped no están disponibles');
          Swal.fire('Error', 'No se pudo crear el huésped. Intente Más Tarde.', 'error');
        }
      },
      error: (errorHuesped) => {
        console.error('Error al crear el huésped:', errorHuesped);
        Swal.fire('Error', 'No se pudo crear el huésped. Intente Más Tarde.', 'error');
      }
    });
  }


}
