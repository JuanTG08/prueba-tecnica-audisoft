import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListadoNotasComponent } from './screens/notas/listado-notas/listado-notas.component';
import { ListadoEstudiantesComponent } from './screens/estudiantes/listado-estudiantes/listado-estudiantes.component';

export const routes: Routes = [
  {
    path: 'estudiantes',
    component: ListadoEstudiantesComponent,
  },
  {
    path: 'notas',
    component: ListadoNotasComponent,
  },
];
