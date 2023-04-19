import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  Route: any;
  goToLogin() {
    
    this.Route.navigate(['Login']);
    // Add the code to navigate to the login page
  }

  goToRegister() {
    this.Route.navigate(['Register']);

    // Add the code to navigate to the login page
  }
}
