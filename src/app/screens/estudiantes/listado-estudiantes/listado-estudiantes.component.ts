import { Component, ViewChild } from '@angular/core';
import { EstudiantesService } from '../../../shared/services/estudiantes.service';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-estudiantes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './listado-estudiantes.component.html',
  styleUrl: './listado-estudiantes.component.css',
})
export class ListadoEstudiantesComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['_', 'nombre', 'option'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: EstudiantesService, private router: Router) {}

  async ngAfterViewInit() {
    await this.handlerListEstudiantes();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async handlerListEstudiantes() {
    try {
      const listClients = await this.service.listAll();
      if (listClients.error || listClients.status != 200)
        throw new Error('No fue posible obtener los datos');
      this.dataSource = new MatTableDataSource(listClients.payload);
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toRedirect(path: string) {
    this.router.navigate([path]);
  }

  async deleteEstudiante(id: number) {
    try {
      const deleteEstudiante = await this.service.delete(id);
      if (deleteEstudiante.error || deleteEstudiante.status != 200)
        throw new Error('No fue posible eliminar el estudiante');
      this.dataSource = new MatTableDataSource(
        this.dataSource.data.filter((est) => est.id_estudiante != id)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
