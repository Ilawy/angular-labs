import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { passwordConfirmValidator, passwordValidator } from "../../../lib/validators";

@Component({
  selector: "app-register-route",
  imports: [ReactiveFormsModule],
  templateUrl: "./register-route.component.html",
  styleUrl: "./register-route.component.css",
})
export class RegisterRouteComponent implements OnInit {
  errorHandler(name: string) {    
    if(!(name in this.formControls))throw new Error("Invalid name")
      const errors =this.formControls[name].errors 
      if(errors?.['required']){
        return `Field '${name}' is required`
      }else if(errors?.['pattern']){

      }else if(errors?.['minlength']){
        
        return `Field '${name}' must be at least ${errors['minlength'].requiredLength} characters`
      }else if(errors?.['custom_password']){
        return errors?.['custom_password']
      }
      console.log(errors);
      
      return "Error in this field"

    }
  form!: FormGroup;

  get formControls() {
    return this.form.controls;
  }

  submit() {
    this.form.markAllAsTouched()
    console.log(this.form.valid);
    console.log(this.formControls["password"].errors);
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]],
      username: ["", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z_0-9]{3,}$/),
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        passwordValidator(),
      ]],
      passwordConfirm: ["", [
        // Validators.required,
        //TODO: use parent
        passwordConfirmValidator("password")
      ]]
    });
  }
}
