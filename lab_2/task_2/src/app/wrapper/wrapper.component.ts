import { Component } from "@angular/core";
import { FormComponent } from "../form/form.component";
import { ListComponent } from "../list/list.component";
import { Task } from "../../lib/types";

const storage_tasks_key = "v1_tasks";

@Component({
  selector: "app-wrapper",
  imports: [FormComponent, ListComponent],
  templateUrl: "./wrapper.component.html",
  styleUrl: "./wrapper.component.css",
})
export class WrapperComponent {
  tasks: Task[] = [];

  ngOnInit(){
    this._loadState()
    
  }

  private _saveState() {
    window.localStorage.setItem(storage_tasks_key, JSON.stringify(this.tasks));
  }

  private _loadState() {
    const raw = window.localStorage.getItem(storage_tasks_key);
    try {
      if (raw) {
        this.tasks = JSON.parse(raw);
      }
    } catch (error) {
      window.localStorage.removeItem(storage_tasks_key);
    }
  }

  todoPush(content: string) {
    const task: Task = {
      content,
      id: Math.random().toString(36).slice(0, 9),
      done: false,
    };
    this.tasks.push(task);
    this._saveState()
  }

  todoDelete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this._saveState()
  }

  todoToggle(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks[index].done = !this.tasks[index].done;
    this._saveState()
  }
}
