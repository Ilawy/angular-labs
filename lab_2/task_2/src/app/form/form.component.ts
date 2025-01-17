import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output() createTodo = new EventEmitter<string>();

  createTodoHandler(event: SubmitEvent){
    event.preventDefault()
    const fd = new FormData(event.target! as HTMLFormElement)
    this.createTodo.emit(fd.get("task")! as string)
    
    // this.createTodo.emit(content)
  }
}
