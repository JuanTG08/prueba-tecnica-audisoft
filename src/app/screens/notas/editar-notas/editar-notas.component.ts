import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iEstudiante } from '../../../shared/interfaces/iEstudiante';
import { iProfesor } from '../../../shared/interfaces/iProfesor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotasService } from '../../../shared/services/notas.service';
import { EstudiantesService } from '../../../shared/services/estudiantes.service';
import { ProfesoresService } from '../../../shared/services/profesores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { iNota } from '../../../shared/interfaces/iNota';

@Component({
  selector: 'app-editar-notas',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './editar-notas.component.html',
  styleUrl: './editar-notas.component.css',
})
export class EditarNotasComponent {
  id!: number;
  formGroup!: FormGroup;
  estudiantes: iEstudiante[] = [];
  profesores: iProfesor[] = [];
  notas!: iNota;
  constructor(
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private service: NotasService,
    private serviceEstudiantes: EstudiantesService,
    private serviceProfesores: ProfesoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id_nota'];
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
      const [dataEstudiante, dataProfesor, dataNotas] = await Promise.all([
        this.serviceEstudiantes.listAll(),
        this.serviceProfesores.listAll(),
        this.service.get(this.id),
      ]);
      if (
        dataEstudiante.error ||
        dataEstudiante.status != 200 ||
        dataProfesor.error ||
        dataProfesor.status != 200 ||
        dataNotas.error ||
        dataNotas.status != 200
      )
        throw new Error('Error al obtener datos');
      this.estudiantes = dataEstudiante.payload;
      this.profesores = dataProfesor.payload;
      this.notas = dataNotas.payload;
      this.formGroup.patchValue(this.notas);
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

  async submit() {
    try {
      if (this.formGroup.invalid) throw new Error('Error en los datos');
      let dataSend = this.formGroup.value;
      dataSend.id_nota = this.id;
      dataSend.id_nota = parseInt(dataSend.id_nota);
      dataSend.status = this.notas.status;
      console.log(dataSend);
      const send = await this.service.update(dataSend);
      if (!send) throw new Error('Error al crear');
      this._snack.open('Se actualizó correctamente', 'Ok');
    } catch (error) {
      console.log(error);
      this._snack.open('No fue posible guardar los datos', 'Ok');
    }
  }
}
