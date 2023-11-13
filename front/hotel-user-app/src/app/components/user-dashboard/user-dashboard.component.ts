import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlService } from 'src/app/graphql.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  hoteles: any[] = [];
  habitaciones: any[] = [];
  mostrarHabitacionesDelHotel: boolean = false;
  hotelSeleccionado: string | null = null;

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

  cargarHabitaciones(hotelId: string): void {
    console.log(hotelId);
    this.mostrarHabitacionesDelHotel = true;
    this.hotelSeleccionado = hotelId;

    this.graphqlService.getHabitacionesByHotelId(hotelId).subscribe({
      next: (response) => {
        console.log(response.data.habitacionesByHotelId);
        this.habitaciones = response.data.habitacionesByHotelId;
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

  crearReserva(datosReserva: any): void {
    // Lógica para crear el huésped y luego la reserva
  }

  // Puedes agregar más métodos según sea necesario
}
