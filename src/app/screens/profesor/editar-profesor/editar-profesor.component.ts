import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iProfesor } from '../../../shared/interfaces/iProfesor';
import { ActivatedRoute } from '@angular/router';
import { ProfesoresService } from '../../../shared/services/profesores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-editar-profesor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './editar-profesor.component.html',
  styleUrl: './editar-profesor.component.css'
})
export class EditarProfesorComponent {
  idProfesor!: number;
  _formGroup!: FormGroup;
  profesor!: iProfesor;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProfesoresService,
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this._formGroup = this.formBuilder.group({
      nombre: ['', [Validators.minLength(1), Validators.maxLength(128)]],
    });
    try {
      this.idProfesor = this.activatedRoute.snapshot.params['id_profesor'];
      const getData = await this.service.getProfesor(this.idProfesor);
      if (getData.error || getData.status != 200)
        throw new Error('Error al obtener el profesor');
      this.profesor = getData.payload;
      this._formGroup.patchValue({ nombre: this.profesor.nombre });
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

  async submitUpdate(): Promise<any> {
    try {
      if (this._formGroup.invalid)
        return this._snack.open(
          'Error en los campos, por favor Verificar',
          'Ok'
        );
      let dataSend = this._formGroup.value;
      dataSend.id_profesor = this.idProfesor;
      dataSend.status = this.profesor.status;
      const send = await this.service.update(dataSend);
      if (!send) throw new Error('Error al actualizar');
      this._snack.open('Se actualizó correctamente', 'Ok');
    } catch (error) {
      console.log(error);
      this._snack.open('No fue posible actualizar los datos', 'Ok');
    }
  }
}
