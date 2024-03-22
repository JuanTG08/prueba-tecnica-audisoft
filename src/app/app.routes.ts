import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListadoNotasComponent } from './screens/notas/listado-notas/listado-notas.component';
import { ListadoEstudiantesComponent } from './screens/estudiantes/listado-estudiantes/listado-estudiantes.component';
import { CrearEstudiantesComponent } from './screens/estudiantes/crear-estudiantes/crear-estudiantes.component';
import { EditarEstudiantesComponent } from './screens/estudiantes/editar-estudiantes/editar-estudiantes.component';
import { ListadoProfesorComponent } from './screens/profesor/listado-profesor/listado-profesor.component';
import { CrearProfesorComponent } from './screens/profesor/crear-profesor/crear-profesor.component';
import { EditarProfesorComponent } from './screens/profesor/editar-profesor/editar-profesor.component';
import { CrearNotasComponent } from './screens/notas/crear-notas/crear-notas.component';
import { EditarNotasComponent } from './screens/notas/editar-notas/editar-notas.component';
import { HomeComponent } from './screens/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
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
    path: 'profesores',
    component: ListadoProfesorComponent,
  },
  {
    path: 'profesores/crear',
    component: CrearProfesorComponent,
  },
  {
    path: 'profesores/editar/:id_profesor',
    component: EditarProfesorComponent,
  },
  {
    path: 'notas',
    component: ListadoNotasComponent,
  },
  {
    path: 'notas/crear',
    component: CrearNotasComponent,
  },
  {
    path: 'notas/editar/:id_nota',
    component: EditarNotasComponent,
  },
];
