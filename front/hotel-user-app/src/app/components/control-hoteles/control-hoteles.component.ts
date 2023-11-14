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

  constructor(private authService: AuthService, private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.cargarHoteles();
  }

  cargarHoteles(): void {
    this.graphqlService.getHoteles().subscribe({
      next: (response) => {
        this.hoteles = response.data.hotels;
      },
      error: (error) => console.error(error)
    });
  }

  actualizarHotel(hotel: any): void {

  }


  crearHotel(): void {
    Swal.fire({
      title: 'Crear nuevo hotel',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
        '<input id="descripcion" class="swal2-input" placeholder="Descripción">' +
        '<input id="ubicacion" class="swal2-input" placeholder="Ubicación">' +
        '<input id="nombrefoto" class="swal2-input" placeholder="Nombre de la foto">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
          ubicacion: (document.getElementById('ubicacion') as HTMLInputElement).value,
          nombrefoto: (document.getElementById('nombrefoto') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.createHotel(result.value).subscribe({
          next: () => Swal.fire('Hotel Creado', '', 'success'),
          error: () => Swal.fire('Error', 'No se pudo crear el hotel', 'error')
        });
      }
    });
  }



}
