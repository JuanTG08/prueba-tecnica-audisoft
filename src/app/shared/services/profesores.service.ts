import { Injectable } from '@angular/core';
import { const_api } from '../../../constant/api.constant';
import { Message } from '../../../utils/Message';
import { iProfesor } from '../interfaces/iProfesor';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  private url_api_profesores = const_api.url + '/Profesor';
  constructor() {}

  async listAll() {
    try {
      const getData = await fetch(`${this.url_api_profesores}`);
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async create(profesor: iProfesor) {
    try {
      const getData = await fetch(
        `${this.url_api_profesores}`,
        {
          body: JSON.stringify(profesor),
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

  async getProfesor(id: number) {
    try {
      const getData = await fetch(`${this.url_api_profesores}/${id}`);
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async update(profesor: iProfesor) {
    try {
      const getData = await fetch(
        `${this.url_api_profesores}/${profesor.id_profesor}`,
        {
          body: JSON.stringify(profesor),
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

  async delete(id_profesor: number) {
    try {
      const getData = await fetch(
        `${this.url_api_profesores}/${id_profesor}`,
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
