import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfesoresService } from '../../../shared/services/profesores.service';

@Component({
  selector: 'app-crear-profesor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './crear-profesor.component.html',
  styleUrl: './crear-profesor.component.css'
})
export class CrearProfesorComponent {
  formGroup!: FormGroup;
  constructor(
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private service: ProfesoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.minLength(1), Validators.maxLength(128)]],
    });
  }

  getErrorMessage(nameInput: string) {
    const error = this.formGroup.get(nameInput)?.errors;
    if (error) {
      for (const err of Object.entries<any>(error)) {
        switch (err[0]) {
          case 'required':
            return 'Campo Requerido';
          case 'minlength':
            return 'Esa no es la longitud minima';
          case 'maxlength':
            return 'Longitud maxima superada';
          default:
            return 'Error en la validación';
        }
      }
    }
    return;
  }

  async submitCreate() {
    try {
      if (this.formGroup.invalid) throw new Error('Error en los datos');
      let dataSend = this.formGroup.value;
      dataSend.status = true;
      const send = await this.service.create(dataSend);
      if (!send) throw new Error('Error al crear');
      this.router.navigate(['/profesores']);
    } catch (error) {
      console.log(error);
      this._snack.open('No fue posible guardar los datos', 'Ok');
    }
  }
}
