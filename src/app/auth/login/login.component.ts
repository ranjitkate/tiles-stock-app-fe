import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  forgotPasswordMode = false;
  successMessage = '';
  submitted = false;
  errorMessage = false;
  showForgotPassword = false;
  resetMessage = "";

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleForgotPassword() {
    this.forgotPasswordMode = !this.forgotPasswordMode;
    this.successMessage = '';
    this.loginForm.reset();
    if (this.forgotPasswordMode) {
      this.showForgotPassword = !this.showForgotPassword;
      this.loginForm = this.fb.group({
        forgotEmail: ['', [Validators.required, Validators.email]],
      });
    } else {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    if (this.forgotPasswordMode) {
      // Handle forgot password logic here
      const email = this.loginForm.value.email;
      console.log('Password reset requested for:', email);
      this.successMessage = `Password reset link sent to ${email}`;
    } else {
     this.submitted = true;
    if (this.loginForm.invalid) return;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Registration error:', err);
        }
      });
    }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  sendResetLink(){
    console.log("resend url")
  }
}
