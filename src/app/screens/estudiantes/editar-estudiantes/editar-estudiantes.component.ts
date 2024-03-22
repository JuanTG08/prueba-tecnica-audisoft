import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../../../shared/services/estudiantes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iEstudiante } from '../../../shared/interfaces/iEstudiante';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-editar-estudiantes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './editar-estudiantes.component.html',
  styleUrl: './editar-estudiantes.component.css',
})
export class EditarEstudiantesComponent {
  idEstudiante!: number;
  _formGroup!: FormGroup;
  estudiante!: iEstudiante;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: EstudiantesService,
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this._formGroup = this.formBuilder.group({
      nombre: ['', [Validators.minLength(1), Validators.maxLength(128)]],
    });
    try {
      this.idEstudiante = this.activatedRoute.snapshot.params['id_estudiante'];
      const getData = await this.service.getEstudiante(this.idEstudiante);
      if (getData.error || getData.status != 200)
        throw new Error('Error al obtener el estudiante');
      this.estudiante = getData.payload;
      this._formGroup.patchValue({ nombre: this.estudiante.nombre });
    } catch (error) {
      console.log(error);
    }
  }

  getErrorMessage(nameInput: string) {
    const error = this._formGroup.get(nameInput)?.errors;
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

  async submitCreate(): Promise<any> {
    try {
      if (this._formGroup.invalid)
        return this._snack.open(
          'Error en los campos, por favor Verificar',
          'Ok'
        );
      let dataSend = this._formGroup.value;
      dataSend.id_estudiante = this.idEstudiante;
      dataSend.status = this.estudiante.status;
      const send = await this.service.update(dataSend);
      if (!send) throw new Error('Error al actualizar');
      this._snack.open('Se actualizó correctamente', 'Ok');
    } catch (error) {
      console.log(error);
      this._snack.open('No fue posible actualizar los datos', 'Ok');
    }
  }
}
