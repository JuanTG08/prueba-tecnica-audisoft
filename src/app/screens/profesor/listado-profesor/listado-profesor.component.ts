import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfesoresService } from '../../../shared/services/profesores.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-listado-profesor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './listado-profesor.component.html',
  styleUrl: './listado-profesor.component.css'
})
export class ListadoProfesorComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['_', 'nombre', 'option'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ProfesoresService, private router: Router) {}

  async ngAfterViewInit() {
    await this.handlerListProfesores();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async handlerListProfesores() {
    try {
      const listProfesores = await this.service.listAll();
      if (listProfesores.error || listProfesores.status != 200)
        throw new Error('No fue posible obtener los datos');
      this.dataSource = new MatTableDataSource(listProfesores.payload);
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

  async deleteProfesor(id: number) {
    try {
      const deleteProfesor = await this.service.delete(id);
      if (deleteProfesor.error || deleteProfesor.status != 200)
        throw new Error('No fue posible eliminar el profesor');
      this.dataSource = new MatTableDataSource(
        this.dataSource.data.filter((est) => est.id_profesor != id)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
