import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  userId: string = '';
  password: string = '';
  errorMessage: string = '';

  private readonly validUserId = 'admin@gemteaminc.com';
  private readonly validPassword = 'Tru3C@r3';

  constructor(private router: Router,) {

  }
  onSubmit() {
    if (this.userId === this.validUserId && this.password === this.validPassword) {
    this.router.navigate(['/patient']);
    this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid User ID or Password';
    }
  }
}
