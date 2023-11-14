import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { GraphqlService } from 'src/app/graphql.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-habitaciones',
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
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatSidenavModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './control-habitaciones.component.html',
  styleUrls: ['./control-habitaciones.component.scss']
})
export class ControlHabitacionesComponent  implements OnInit {

  habitaciones: any[] = [];

  constructor(private authService: AuthService, private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.graphqlService.getHabitaciones().subscribe({
      next: (response) => {
        this.habitaciones = response.data.habitaciones;
      },
      error: (error) => console.error(error)
    });
  }

  actualizarHabitacion(habitacion: any): void {
    // Lógica para actualizar
  }

  crearHabitacion(): void {
    Swal.fire({
      title: 'Crear nueva habitacion',
      html:
        '<input id="tipo" class="swal2-input" placeholder="Tipo">' +
        '<input id="costoBase" class="swal2-input" placeholder="Costo Base">' +
        '<input id="estado" class="swal2-input" placeholder="Estado">' +
        '<input id="hotelId" class="swal2-input" placeholder="Hotel Id">' +
        '<input id="nombrefoto" class="swal2-input" placeholder="Nombre de la foto">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          tipo: (document.getElementById('tipo') as HTMLInputElement).value,
          costoBase: (document.getElementById('costoBase') as HTMLInputElement).value,
          estado: (document.getElementById('estado') as HTMLInputElement).value,
          hotelId: (document.getElementById('hotelId') as HTMLInputElement).value,
          nombrefoto: (document.getElementById('nombrefoto') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.createHabitacion(result.value).subscribe({
          next: () =>{
            Swal.fire('Habitacion Creada', '', 'success')
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Error', 'No se pudo crear la habitacion', 'error');
          }
        });
      }
    });
  }


}
