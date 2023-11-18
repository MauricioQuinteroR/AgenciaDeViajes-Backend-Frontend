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
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
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
    MatSelectModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './control-habitaciones.component.html',
  styleUrls: ['./control-habitaciones.component.scss']
})
export class ControlHabitacionesComponent  implements OnInit {

  habitaciones: any[] = [];
  hoteles: any[] = [];
  estadoFilter: string = '';
  hotelIdFilter: string = '';
  dataSource = new MatTableDataSource<any>();

  constructor(private authService: AuthService, private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
    this.cargarHoteles();
  }

  filterHabitaciones(): void {
    this.dataSource.data = this.habitaciones.filter((habitacion: any) => {
      return habitacion.estado.toLowerCase().includes(this.estadoFilter.toLowerCase()) &&
             (this.hotelIdFilter ? habitacion.hotelId === this.hotelIdFilter : true);
    });
  }

  cargarHabitaciones(): void {
    this.graphqlService.getHabitaciones().subscribe({
      next: (response) => {
        this.habitaciones = response.data.habitaciones;
        this.filterHabitaciones();
      },
      error: (error) => console.error(error)
    });
  }

  cargarHoteles(): void {
    this.graphqlService.getHoteles().subscribe({
      next: (response) => {
        this.hoteles = response.data.hotels;
      },
      error: (error) => console.error(error)
    });
  }

  actualizarHabitacion(habitacion: any): void {
    const hotelesOptions = this.hoteles.map(hotel => `<option value="${hotel.id}" ${hotel.id === habitacion.hotelId ? 'selected' : ''}>${hotel.nombre}</option>`).join('');

    const tipoOptions = `<option disabled selected>Tipo de Habitación</option>
                         <option value="sencilla" ${habitacion.tipo === 'sencilla' ? 'selected' : ''}>Sencilla</option>
                         <option value="doble" ${habitacion.tipo === 'doble' ? 'selected' : ''}>Doble</option>`;
    const fotoOptions = `<option disabled selected>Nombre De Foto</option>
                         <option value="sencilla.jpg" ${habitacion.nombrefoto === 'sencilla.jpg' ? 'selected' : ''}>sencilla.jpg</option>
                         <option value="doble.jpg" ${habitacion.nombrefoto === 'doble.jpg' ? 'selected' : ''}>doble.jpg</option>`;
    const estadoOptions = `<option disabled selected>Estado Actual De La Habitación</option>
                         <option value="disponible" ${habitacion.estado === 'disponible' ? 'selected' : ''}>disponible</option>
                         <option value="ocupada" ${habitacion.estado === 'ocupada' ? 'selected' : ''}>ocupada</option>`;
    const activeOptions = `<option disabled selected>Estado Activo/Inactivo</option>
                         <option value="true" ${habitacion.active === 'true' ? 'selected' : ''}>Activo</option>
                         <option value="false" ${habitacion.active === 'false' ? 'selected' : ''}>Inactivo</option>`;

    Swal.fire({
      title: 'Editar Habitación',
      html:

        `<label for="Name">ID</label><input id="id" class="swal2-input" placeholder="ID" value="${habitacion.id}" readonly>` +
        `<select id="tipo" class="custom-select-swal">${tipoOptions}</select>` +
        `<label for="Name">Costo Base</label><input id="costoBase" type="number" class="swal2-input" placeholder="Costo Base" value="${habitacion.costoBase}">` +
        `<label for="Name">Impuestos</label><input id="impuestos" type="number" class="swal2-input" placeholder="Impuestos" value="${habitacion.impuestos || ''}">` +
        `<select id="hotelId" class="custom-select-swal">${hotelesOptions}</select>` +
        `<select id="nombrefoto" class="custom-select-swal">${fotoOptions}</select>` +
        `<select id="estado"     class="custom-select-swal">${estadoOptions}</select>` +
        `<select id="active"     class="custom-select-swal">${activeOptions}</select>`,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          id: (document.getElementById('id') as HTMLInputElement).value, // Aunque es de solo lectura, aún recogemos el valor
          tipo: (document.getElementById('tipo') as HTMLSelectElement).value,
          costoBase: parseFloat((document.getElementById('costoBase') as HTMLInputElement).value),
          impuestos: parseFloat((document.getElementById('impuestos') as HTMLInputElement).value),
          hotelId: (document.getElementById('hotelId') as HTMLSelectElement).value,
          nombrefoto: (document.getElementById('nombrefoto') as HTMLSelectElement).value,
          estado: (document.getElementById('estado') as HTMLInputElement).value,
          active: (document.getElementById('active') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.updateHabitacion(result.value).subscribe({
          next: () => {
            Swal.fire('Habitación Actualizada', '', 'success');

          },
          error: (error) => {
            console.error(error);
            Swal.fire('Error', 'No se pudo actualizar la habitación', 'error');
          }
        });
      }
    });
  }


  crearHabitacion(): void {
    const hotelesOptions = this.hoteles.map(hotel => `<option value="${hotel.id}">${hotel.nombre}</option>`).join('');


    const tipoOptions = `<option disabled selected>Tipo de Habitación</option>
                       <option value="sencilla">Sencilla</option>
                       <option value="doble">Doble</option>`;
  const fotoOptions = `<option disabled selected>Nombre de la Foto</option>
                       <option value="sencilla.jpg">sencilla.jpg</option>
                       <option value="doble.jpg">doble.jpg</option>`;

    Swal.fire({
      title: 'Crear nueva habitacion',
      html:
        `<select id="tipo" class="custom-select-swal">${tipoOptions}</select>` +
        '<input id="costoBase" class="swal2-input" placeholder="Costo Base">' +
        `<select id="hotelId" class="custom-select-swal"><option disabled selected>Escoge Hotel</option>${hotelesOptions}</select>` +
        `<select id="nombrefoto" class="custom-select-swal">${fotoOptions}</select>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          tipo: (document.getElementById('tipo') as HTMLSelectElement).value,
          costoBase: parseFloat((document.getElementById('costoBase') as HTMLInputElement).value),
          estado: "disponible",
          hotelId: (document.getElementById('hotelId') as HTMLSelectElement).value,
          nombrefoto: (document.getElementById('nombrefoto') as HTMLSelectElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.createHabitacion(result.value).subscribe({
          next: () => {
            Swal.fire('Habitacion Creada', '', 'success')
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Error', 'No se pudo crear la habitacion', 'error');
          }
        });
      }
    });


    setTimeout(() => {
      const selectInputs = document.querySelectorAll('.custom-select-swal') as NodeListOf<HTMLSelectElement>;
      selectInputs.forEach(selectInput => {
        selectInput.style.width = '100%';
      });
    }, 0);
  }



}
