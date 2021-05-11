import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormValidatorService } from '../../../guards/formValidator/form-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup = this.fb.group({
    name:      ['joseph', Validators.required],
    email:     ['joseph@gmail.com', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password:  ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [this.vs.equalFields('password', 'password2')]
  });

  constructor( private fb: FormBuilder,
               private vs: FormValidatorService,
               private router: Router,
               private AuthService: AuthService ) { }
  
  register() {
    const { name, email, password } = this.registerForm.value;

    this.AuthService.register( name, email, password )
      .subscribe(res => {
        if (res === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          console.log(res);
          
          alert(res);
        }
      });
  };

  invalidField(field: string) {
    return this.registerForm.get(field)?.invalid
      && this.registerForm.get(field)?.touched;
  }

  formSubmit() {
    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();
    
  }

}
