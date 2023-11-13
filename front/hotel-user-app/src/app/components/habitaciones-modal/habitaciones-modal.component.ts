import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GraphqlService } from 'src/app/graphql.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitaciones-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './habitaciones-modal.component.html',
  styleUrls: ['./habitaciones-modal.component.scss']
})
export class HabitacionesModalComponent implements OnInit {
  habitaciones: any[] = [];
  mostrarFormulario: boolean = false;
  habitacionSeleccionada: string | null = null;
  hotelId!: string;
  nombreHotel!: string;

  constructor(
    private graphqlService: GraphqlService,
    public dialogRef: MatDialogRef<HabitacionesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombreHotel = data.nombreHotel; // Inicializar nombreHotel
    this.hotelId = data.hotelId; // Inicializar hotelId
  }

  ngOnInit(): void {
    this.cargarHabitaciones(this.data.hotelId);
  }

  cargarHabitaciones(hotelId: string): void {
    this.graphqlService.getHabitacionesByHotelId(hotelId).subscribe({
      next: (response) => {
        this.habitaciones = response.data.habitacionesByHotelId;
      },
      error: (error) => console.error(error)
    });
  }

  mostrarFormularioReserva(habitacionId: string): void {
    this.habitacionSeleccionada = habitacionId;
    this.mostrarFormulario = true;
  }

  realizarReserva(): void {
    // Aquí va la lógica para realizar la reserva, como crear el huésped y luego la reserva
    // Usar el servicio GraphqlService y los métodos correspondientes
  }


  abrirImagenHotel(nombrefoto: string): void {
    Swal.fire({
      imageUrl: 'assets/' + nombrefoto,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: 'Imagen de la habitacion'
    });
  }


  cerrarModal(): void {
    this.dialogRef.close();
  }


}
