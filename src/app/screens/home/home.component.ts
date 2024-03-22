import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  modules = [
    {
      title: 'Estudiantes',
      urlImage:
        'https://png.pngtree.com/png-clipart/20230914/original/pngtree-student-engagement-clipart-four-college-students-standing-and-holding-books-cartoon-png-image_12151456.png',
      description:
        'El módulo de estudiantes te permite gestionar la información de los alumnos de tu institución. Puedes ver una lista completa de estudiantes, registrar nuevos alumnos con solo su nombre, editar la información de los estudiantes existentes y eliminarlos del sistema.',
      urlRef: '/estudiantes',
      tooltip: "Modulo de Estudiantes, da Click para visualizarlo."
    },
    {
      title: 'Profesores',
      urlImage:
        'https://png.pngtree.com/png-clipart/20221008/original/pngtree-hand-drawing-cartoon-teacher-png-image_8666300.png',
      description:
        'El módulo de profesores te permite gestionar la información del personal docente de tu institución. Puedes ver una lista completa de profesores, registrar nuevos profesores con solo su nombre, editar la información de los profesores existentes y eliminarlos del sistema.',
      urlRef: '/profesores',
      tooltip: "Modulo de Profesores, da Click para visualizarlo."
    },
    {
      title: 'Notas',
      urlImage: 'https://cdn-icons-png.flaticon.com/512/2618/2618026.png',
      description:
        'Puedes ver una lista completa de las calificaciones, registrar nuevas calificaciones seleccionando el nombre de la evaluación, el profesor, el estudiante y la calificación numérica, editar la información de las calificaciones existentes y eliminarlas del sistema.',
      urlRef: '/notas',
      tooltip: "Modulo de Notas, da Click para visualizarlo."
    },
  ];

  constructor(private router: Router) {}

  toRedirect(path: string) {
    this.router.navigate([path]);
  }
}
