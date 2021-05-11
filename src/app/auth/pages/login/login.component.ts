import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email:    ['jose@gmail.com', [Validators.required, Validators.email]],
    password: ['quince15', [Validators.required, Validators.minLength(6)]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private AuthService: AuthService ) { }

  login() {
    const { email, password } = this.loginForm.value;

    this.AuthService.login( email, password )
      .subscribe(res => {
        if (res === true) {
          this.router.navigateByUrl('/home');
        } else {
          Swal.fire('Error', res, 'error');
        }
      });
  }

}
