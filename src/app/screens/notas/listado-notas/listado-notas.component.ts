import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotasService } from '../../../shared/services/notas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-notas',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './listado-notas.component.html',
  styleUrl: './listado-notas.component.css'
})
export class ListadoNotasComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['_', 'nombre', 'profesor', 'estudiante', 'valor', 'option'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: NotasService, private router: Router) {}

  async ngAfterViewInit() {
    await this.handlerListNotas();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async handlerListNotas() {
    try {
      const listNotas = await this.service.listAll();
      if (listNotas.error || listNotas.status != 200)
        throw new Error('No fue posible obtener los datos');
      this.dataSource = new MatTableDataSource(listNotas.payload);
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

  async deleteNota(id: number) {
    try {
      const deleteNota = await this.service.delete(id);
      if (deleteNota.error || deleteNota.status != 200)
        throw new Error('No fue posible eliminar el profesor');
      this.dataSource = new MatTableDataSource(
        this.dataSource.data.filter((est) => est.id_nota != id)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
