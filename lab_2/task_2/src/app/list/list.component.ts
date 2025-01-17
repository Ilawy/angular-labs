import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../../lib/types";

const emptyQuotes = [
  {
    "quote": "What you do today can improve all your tomorrows.",
    "author": "Ralph Marston",
  },
  {
    "quote":
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "author": "Zig Ziglar",
  },
  {
    "quote": "Intelligence without ambition is a bird without wings.",
    "author": "Salvador Dali",
  },
  {
    "quote":
      "The key is to keep company only with people who uplift you, whose presence calls forth your best.",
    "author": "Epictetus",
  },
  {
    "quote": "We may encounter many defeats but we must not be defeated.",
    "author": "May Angelou",
  },
  {
    "quote": "Problems are not stop signs, they are guidelines.",
    "author": "Robert H. Schuller",
  },
];

@Component({
  selector: "app-list",
  imports: [],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css",
})
export class ListComponent {
  @Input()
  tasks: Task[] = [];
  @Output()
  deleteTodo = new EventEmitter<string>();
  @Output()
  toggleTodoState = new EventEmitter<string>();

  deleteTodoHandler(id: string) {
    this.deleteTodo.emit(id);
  }

  toggleTodoStateHandler(id: string) {
    this.toggleTodoState.emit(id);
  }


  getEmptyQuote(){
    return emptyQuotes[Math.floor(Math.random() * emptyQuotes.length - 1)]
  }
}
