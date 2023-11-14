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
import Swal from 'sweetalert2';
import { HabitacionesModalComponent } from '../habitaciones-modal/habitaciones-modal.component';


interface HuespedResponse {
  data: {
    createHuesped: {
      id: string;
      nombres: string;
      apellidos: string;
      tipoDocumento: string;
      numeroDocumento: string;
      email: string;
      telefono: string;
      genero: string;
      fechaNacimiento: string;
    };
  };
}


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
    MatDialogModule
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
      width: '600px',
      data: { hotelId: hotelId, nombreHotel: nombreHotel }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crearReserva(result);
      }
    });
  }

  irALogin(){
    // this.router.navigate(['/login']);
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
            next: (responseReserva) => {
              Swal.fire('¡Reserva Exitosa!', 'Tu reserva ha sido creada con éxito.', 'success');
            },
            error: (error) => {
              console.error('Error al crear la reserva:', error);
              Swal.fire('Error', 'Reserva No Exitosa. Intente Más Tarde.', 'error');
            }
          });
        } else {
          console.error('Datos del huésped no están disponibles');
          Swal.fire('Error', 'No se pudo crear el huésped. Intente Más Tarde.', 'error');
        }
      },
      error: (error) => {
        console.error('Error al crear el huésped:', error);
        Swal.fire('Error', 'No se pudo crear el huésped. Intente Más Tarde.', 'error');
      }
    });
  }




}
