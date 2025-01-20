import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

function validatorError(name: string, message: string) {
    return { [name]: message };
}


export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const strVal = control.value as string | null;
        console.log(strVal);
        
        if (!strVal) {
            return validatorError(
                "custom_password",
                `Password cannot be empty`,
            );
        }
        const constrains = {
            "special": /[*@%$#]/,
            "uppercase": /[A-Z]/,
            "lower": /[a-z]/,
            "digit": /[1-9]/,
        };
        for (const [name, pattern] of Object.entries(constrains)) {
            if (!pattern.test(strVal)) {
                return validatorError(
                    "custom_password",
                    `Password should contain: ${name} character`,
                );
            }
        }
        return null
    };
}


export function passwordConfirmValidator(sibling: string): ValidatorFn {
    
    return (control: AbstractControl): ValidationErrors | null =>{
        if(!control.parent)return validatorError("custom_password", "Cannot access controls")

        if(!control.value || control.value !== control.parent.get(sibling)?.value) return validatorError("custom_password", "Password and password confirmation must be the same");        
        return null
    }
}