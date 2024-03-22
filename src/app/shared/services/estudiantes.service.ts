import { Injectable } from '@angular/core';
import { iEstudiante } from '../interfaces/iEstudiante';
import { const_api } from '../../../constant/api.constant';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../../utils/Message';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private url_api_estudiantes = const_api.url + '/Estudiantes';
  constructor(private http: HttpClient) {}

  async listAll() {
    try {
      const getData = await fetch(`${this.url_api_estudiantes}`);
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async create(estudiante: iEstudiante) {
    try {
      const getData = await fetch(
        `${this.url_api_estudiantes}`,
        {
          body: JSON.stringify(estudiante),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async getEstudiante(id: number) {
    try {
      const getData = await fetch(`${this.url_api_estudiantes}/${id}`);
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async update(estudiante: iEstudiante) {
    try {
      const getData = await fetch(
        `${this.url_api_estudiantes}/${estudiante.id_estudiante}`,
        {
          body: JSON.stringify(estudiante),
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async delete(id_estudiante: number) {
    try {
      const getData = await fetch(
        `${this.url_api_estudiantes}/${id_estudiante}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }
}
