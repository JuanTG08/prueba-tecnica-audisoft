import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListadoNotasComponent } from './screens/notas/listado-notas/listado-notas.component';
import { ListadoEstudiantesComponent } from './screens/estudiantes/listado-estudiantes/listado-estudiantes.component';
import { CrearEstudiantesComponent } from './screens/estudiantes/crear-estudiantes/crear-estudiantes.component';
import { EditarEstudiantesComponent } from './screens/estudiantes/editar-estudiantes/editar-estudiantes.component';

export const routes: Routes = [
  {
    path: 'estudiantes',
    component: ListadoEstudiantesComponent,
  },
  {
    path: 'estudiantes/crear',
    component: CrearEstudiantesComponent,
  },
  {
    path: 'estudiantes/editar/:id_estudiante',
    component: EditarEstudiantesComponent,
  },
  {
    path: 'notas',
    component: ListadoNotasComponent,
  },
];
