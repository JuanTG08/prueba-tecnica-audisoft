import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  constructor() {}

  listAll() {
    return [
      {
        id: 1,
        name: 'Juan',
      },
      {
        id: 2,
        name: 'Pedro',
      },
      {
        id: 3,
        name: 'Paul',
      },
    ];
  }
}
