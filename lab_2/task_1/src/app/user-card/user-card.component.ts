import { Component, Input } from '@angular/core';
import { User } from '../../lib/types';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: User | null = null;

  getClassByRole(role: string) {
    switch (role) {
      case "admin":
        return "bg-danger";
      case "moderator":
        return "bg-warning";
      default:
        return "bg-success";
    }
  }

  getFormattedDate(date: string){
    return new Date(date).toLocaleDateString()
  }
}
