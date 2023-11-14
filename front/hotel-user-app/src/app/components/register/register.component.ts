import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
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
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor(private authService: AuthService, private router: Router) {}

  register(registerData: { email: string; password: string }) {
    this.authService.registerUser(registerData.email, registerData.password).subscribe({
      next: (response: any) => {
        Swal.fire('Registro Exitoso', 'Tu cuenta ha sido creada.', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        Swal.fire('Error', 'No se pudo completar el registro.', 'error');
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
