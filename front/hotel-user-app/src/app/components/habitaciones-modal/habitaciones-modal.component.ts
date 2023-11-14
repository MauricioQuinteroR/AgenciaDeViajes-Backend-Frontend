import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
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
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './habitaciones-modal.component.html',
  styleUrls: ['./habitaciones-modal.component.scss']
})
export class HabitacionesModalComponent implements OnInit {
  habitaciones: any[] = [];
  mostrarFormulario: boolean = false;
  habitacionSeleccionada: any = null;
  hotelId!: string;
  nombreHotel!: string;

  constructor(
    private graphqlService: GraphqlService,
    public dialogRef: MatDialogRef<HabitacionesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombreHotel = data.nombreHotel;
    this.hotelId = data.hotelId;
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

  mostrarFormularioReserva(idhabitacion: any): void {
    console.log(idhabitacion)
    this.habitacionSeleccionada = idhabitacion;
    this.mostrarFormulario = true;
  }

  realizarReserva(reservaFormValue: any): void {
    // Preparar los datos para enviar al componente padre
    const datosReserva = {
      habitacionId: this.habitacionSeleccionada,
      datosHuesped: {
        nombres: reservaFormValue.nombres,
        apellidos: reservaFormValue.apellidos,
        tipoDocumento: reservaFormValue.tipoDocumento,
        numeroDocumento: reservaFormValue.numeroDocumento,
        email: reservaFormValue.email,
        telefono: reservaFormValue.telefono,
        genero: reservaFormValue.genero,
        fechaNacimiento: reservaFormValue.fechaNacimiento
      },
      fechaEntrada: reservaFormValue.fechaEntrada,
      fechaSalida: reservaFormValue.fechaSalida,
      cantidadPersonas: parseInt(reservaFormValue.cantidadPersonas, 10),
      nombreCompletoContacto: reservaFormValue.nombreCompletoContacto,
      telefonoContacto: reservaFormValue.telefonoContacto
    };

    // Cerrar el modal y pasar los datos de la reserva
    this.dialogRef.close(datosReserva);
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
