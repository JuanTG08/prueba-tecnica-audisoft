import { Component } from '@angular/core';
import { iEstudiante } from '../../../shared/interfaces/iEstudiante';
import { EstudiantesService } from '../../../shared/services/estudiantes.service';

@Component({
  selector: 'app-listado-estudiantes',
  standalone: true,
  imports: [],
  templateUrl: './listado-estudiantes.component.html',
  styleUrl: './listado-estudiantes.component.css',
})
export class ListadoEstudiantesComponent {
  listEstudiantes!: iEstudiante[];
  displayedColumns: string[] = ['name'];
  constructor(private service: EstudiantesService) {}

  ngOnInit(): void {
    this.handlerListEstudiantes();
  }

  async handlerListEstudiantes() {
    try {
      this.listEstudiantes = await this.service.listAll();
      console.log(this.listEstudiantes);
    } catch (error) {
      console.log(error);
    }
  }
}
