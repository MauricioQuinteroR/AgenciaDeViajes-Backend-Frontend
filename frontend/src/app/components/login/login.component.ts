import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

export interface Ciudad {
  id: string;
  ciudad: string;
}

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  constructor(private authService: AuthService, private router: Router) {}

  login(loginData: { email: string, password: string }) {
    this.authService.loginUser(loginData.email, loginData.password).subscribe({
      next: (response:any) => {
        if (response.data.loginUser != 'Credenciales Erroneas') {
          // Manejar JWT
          localStorage.setItem('jwt', response.data.loginUser);
          this.router.navigate(['/admin-dashboard']);
        } else {
          // Mostrar mensaje de error
          Swal.fire('Error', 'Credenciales Erroneas.', 'error');
        }
      },
      error: () => {
        alert('Error en el inicio de sesión');
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
