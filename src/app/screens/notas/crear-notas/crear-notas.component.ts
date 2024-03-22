import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotasService } from '../../../shared/services/notas.service';
import { EstudiantesService } from '../../../shared/services/estudiantes.service';
import { ProfesoresService } from '../../../shared/services/profesores.service';
import { iEstudiante } from '../../../shared/interfaces/iEstudiante';
import { iProfesor } from '../../../shared/interfaces/iProfesor';

@Component({
  selector: 'app-crear-notas',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './crear-notas.component.html',
  styleUrl: './crear-notas.component.css',
})
export class CrearNotasComponent {
  formGroup!: FormGroup;
  estudiantes: iEstudiante[] = [];
  profesores: iProfesor[] = [];
  constructor(
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private service: NotasService,
    private serviceEstudiantes: EstudiantesService,
    private serviceProfesores: ProfesoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.minLength(1), Validators.maxLength(128)]],
      id_profesor: ['', [Validators.required]],
      id_estudiante: ['', [Validators.required]],
      valor: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
    this.getDataToSelects();
  }

  async getDataToSelects() {
    try {
      const [dataEstudiante, dataProfesor] = await Promise.all([
        this.serviceEstudiantes.listAll(),
        this.serviceProfesores.listAll(),
      ]);
      if (
        dataEstudiante.error ||
        dataEstudiante.status != 200 ||
        dataProfesor.error ||
        dataProfesor.status != 200
      )
        throw new Error('Error al obtener datos');
      this.estudiantes = dataEstudiante.payload;
      this.profesores = dataProfesor.payload;
    } catch (error) {
      console.log(error);
    }
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
      this.router.navigate(['/notas']);
    } catch (error) {
      console.log(error);
      this._snack.open('No fue posible guardar los datos', 'Ok');
    }
  }
}
