import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '../lib/types';
import { UsersListComponent } from "./users-list/users-list.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UsersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {  
}
