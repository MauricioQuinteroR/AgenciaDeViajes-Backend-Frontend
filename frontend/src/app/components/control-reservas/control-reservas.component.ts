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
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-control-reservas',
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
    MatInputModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './control-reservas.component.html',
  styleUrls: ['./control-reservas.component.scss']
})
export class ControlReservasComponent implements OnInit {
  reservas: any[] = [];
  habitaciones: any[] = [];
  huespedes: any[] = [];
  dataSource = new MatTableDataSource<any>();
  cantidadPersonasFilter: number | null = null;
  habitacionIdFilter: string = '';
  huespedIdFilter: string = '';


  constructor(private authService: AuthService, private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.cargarReservas();

    this.cargarHuespedes();
  }

  cargarHuespedes(): void {
    this.authService.getHuespedes().subscribe({
      next: (response) => {
        this.huespedes = response.data.huespedes;
      },
      error: (error) => console.error(error)
    });
  }


  cargarReservas(): void {
    this.authService.getReservas().subscribe({
      next: (response) => {
        this.reservas = response.data.reservas;
        this.filterReservas();
      },
      error: (error) => console.error(error)
    });
  }

  filterReservas(): void {
    this.dataSource.data = this.reservas.filter((reserva: any) => {
      return (this.cantidadPersonasFilter == null || reserva.cantidadPersonas === this.cantidadPersonasFilter) &&

             (this.huespedIdFilter === '' || reserva.huespedId === this.huespedIdFilter);
    });
  }


  actualizarReserva(reserva: any): void {

  }
}
