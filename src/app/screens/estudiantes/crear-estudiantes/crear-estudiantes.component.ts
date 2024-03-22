import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstudiantesService } from '../../../shared/services/estudiantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-estudiantes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './crear-estudiantes.component.html',
  styleUrl: './crear-estudiantes.component.css',
})
export class CrearEstudiantesComponent {
  formGroup!: FormGroup;
  constructor(
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private service: EstudiantesService,
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
      this.router.navigate(['/estudiantes']);
    } catch (error) {
      console.log(error);
      this._snack.open('No fue posible guardar los datos', 'Ok');
    }
  }
}
