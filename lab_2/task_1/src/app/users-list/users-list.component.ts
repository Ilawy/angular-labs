import { Component } from "@angular/core";
import { User } from "../../lib/types";
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: "app-users-list",
  imports: [UserCardComponent],
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.css",
})
export class UsersListComponent {
  loading = true;
  error: Error | null = null;
  allUsers: User[] = [];
  users: User[] = [];
  searchTerm: string | null = null;

  async ngOnInit() {
    const result = await fetch("./users.json")
      .then((resp) => resp.json())
      .then((data) => {
        this.users = data;
        this.allUsers = data;
      })
      .catch((error) => this.error = error)
      .finally(() => this.loading = false);
  }

  search(rawEvent: Event) {
    const ev = rawEvent as InputEvent & { target: HTMLInputElement };
    if (ev.target.value) {
      this.searchTerm = ev.target.value;
    } else {
      this.searchTerm = null;
    }
  }

  applySearch() {
    if (this.searchTerm) {
      this.users = this.allUsers.filter((u) =>
        u.email.toLowerCase().includes(this.searchTerm!.toLowerCase())
      );
    } else this.users = this.allUsers;
  }
}
