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
  selector: 'app-control-contactos',
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
  templateUrl: './control-contactos.component.html',
  styleUrls: ['./control-contactos.component.scss']
})
export class ControlContactosComponent implements OnInit {
  contactos: any[] = [];

  constructor(private authService: AuthService, private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos(): void {
    this.authService.getContactos().subscribe({
      next: (response) => {
        this.contactos = response.data.contactos;
      },
      error: (error) => console.error(error)
    });
  }

  actualizarContacto(contacto: any): void {

  }


}
