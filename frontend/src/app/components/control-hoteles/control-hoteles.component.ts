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
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-hoteles',
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
  templateUrl: './control-hoteles.component.html',
  styleUrls: ['./control-hoteles.component.scss']
})
export class ControlHotelesComponent implements OnInit {
  hoteles: any[] = [];
  hotelNameFilter: string = '';
  filteredHotels: any[] = [];
  hotelLocationFilter: string = '';
  dataSource = new MatTableDataSource<any>();

  constructor(private authService: AuthService, private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.cargarHoteles();
  }

  filterHotels(): void {
    this.dataSource.data = this.hoteles.filter((hotel: any) => {
      return hotel.nombre.toLowerCase().includes(this.hotelNameFilter.toLowerCase()) &&
             hotel.ubicacion.toLowerCase().includes(this.hotelLocationFilter.toLowerCase());
    });
  }


  cargarHoteles(): void {
    this.graphqlService.getHoteles().subscribe({
      next: (response) => {
        this.hoteles = response.data.hotels;
        this.filterHotels();
      },
      error: (error) => console.error(error)
    });
  }

  actualizarHotel(hotel: any): void {
    const activeOptions = `
    <option value="true" ${hotel.active === 'true' ? 'selected' : ''}>Activo</option>
    <option value="false" ${hotel.active === 'false' ? 'selected' : ''}>Inactivo</option>`;

    Swal.fire({
      title: 'Editar Hotel',
      html:
      `<label for="Name">ID</label><br><input id="id" class="swal2-input" placeholder="ID" value="${hotel.id}" readonly><br>
      <label for="Name">Nombre</label><br><input id="nombre" class="swal2-input" placeholder="Nombre" value="${hotel.nombre}"><br>
      <label for="Name">Descripcion</label><input id="descripcion" class="swal2-input" placeholder="Descripción" value="${hotel.descripcion}"><br>
      <label for="Name">Ubicacion</label><br><input id="ubicacion" class="swal2-input" placeholder="Ubicación" value="${hotel.ubicacion}"><br>
      <label for="Name">Url Foto</label><br><input id="nombrefoto" class="swal2-input" placeholder="Nombre de la foto" value="${hotel.nombrefoto}"><br>
      <label for="Name">Estado</label><br><select id="active"     class="custom-select-swal">${activeOptions}</select>`,

      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          id: (document.getElementById('id') as HTMLInputElement).value, // Aunque es de solo lectura, aún recogemos el valor
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
          ubicacion: (document.getElementById('ubicacion') as HTMLInputElement).value,
          nombrefoto: (document.getElementById('nombrefoto') as HTMLInputElement).value,
          active: (document.getElementById('active') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.updateHotel(result.value).subscribe({
          next: (response) =>{
            console.log(response);
            Swal.fire('Hotel Actualizado', '', 'success')
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo actualizar el hotel', 'error')
          }
        });
      }
    });
  }


  crearHotel(): void {
    // Lista de ciudades colombianas
    const ciudadesColombia: string[] = [
        "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
        "Soacha", "Cúcuta", "Soledad", "Bucaramanga", "Bello",
        "Villavicencio", "Ibagué", "Santa Marta", "Valledupar", "Manizales",
        "Pereira", "Montería", "Neiva", "Pasto", "Armenia",
        "Popayán", "Sincelejo", "Itagüí", "Buenaventura", "Floridablanca",
        "Palmira", "Envigado", "Tuluá", "Dosquebradas", "San Andrés de Tumaco",
        "Tunja", "Girón", "Apartadó", "Florencia", "Uribia",
        "Rionegro", "Turbo", "Zipaquirá", "Fusagasugá", "Pitalito"
      ];
    const opcionesCiudades = ciudadesColombia.map(ciudad => `<option value="${ciudad}">${ciudad}</option>`).join('');

    Swal.fire({
      title: 'Crear Nuevo Hotel',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre Hotel">' +
        '<input id="descripcion" class="swal2-input" placeholder="Descripción">' +
        `<select id="ubicacion" class="custom-select-swal">${opcionesCiudades}</select>` +
        '<input id="nombrefoto" class="swal2-input" placeholder="Nombre De La Foto"><br><label>Puede usar hotel1.jpg a hotel10 .jpg para test</label>',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
          ubicacion: (document.getElementById('ubicacion') as HTMLSelectElement).value,
          nombrefoto: (document.getElementById('nombrefoto') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.createHotel(result.value).subscribe({
          next: (response) => {
            this.hoteles.push(response.data);
            Swal.fire('Hotel Creado', '', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo crear el hotel', 'error')
          }
        });
      }
    });
  }



}
