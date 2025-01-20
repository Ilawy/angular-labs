import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-login-route',
  imports: [RouterLink, FormsModule],
  templateUrl: './login-route.component.html',
  styleUrl: './login-route.component.css'
})
export class LoginRouteComponent {
  submit(val: NgForm){
    console.log(val);
    
  }
}
