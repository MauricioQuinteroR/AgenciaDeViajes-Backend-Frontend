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
  selector: 'app-control-usuarios',
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
  templateUrl: './control-usuarios.component.html',
  styleUrls: ['./control-usuarios.component.scss']
})
export class ControlUsuariosComponent  implements OnInit {
  usuarios: any[] = [];

  constructor(private authService: AuthService, private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.authService.getUsers().subscribe({
      next: (response) => {
        this.usuarios = response.data.users;
      },
      error: (error) => console.error(error)
    });
  }

  actualizarUsuario(usuario: any): void {
    Swal.fire({
      title: 'Activar o Inactivar Usuario',
      html:
        `<input id="email" class="swal2-input" placeholder="Email" value="${usuario.email}"  readonly>` +
        `<select id="active" class="custom-select-swal">
           <option value="true" ${usuario.active === true ? 'selected' : ''}>Activo</option>
           <option value="false" ${usuario.active === false ? 'selected' : ''}>Inactivo</option>
         </select>`,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const activeValue = (document.getElementById('active') as HTMLSelectElement).value === 'true';
        return {
          id: usuario.id,
          email: (document.getElementById('email') as HTMLInputElement).value,
          active: activeValue
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.updateUserActive(result.value.id, result.value.active).subscribe({
          next: () => {
            Swal.fire('Usuario Actualizado', '', 'success');
            this.cargarUsuarios(); // Recargar la lista de usuarios
          },
          error: (error) => {
            console.error(error);
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
          }
        });
      }
    });
  }


}
