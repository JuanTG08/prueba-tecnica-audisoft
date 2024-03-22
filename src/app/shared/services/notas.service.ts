import { Injectable } from '@angular/core';
import { const_api } from '../../../constant/api.constant';
import { Message } from '../../../utils/Message';
import { iProfesor } from '../interfaces/iProfesor';
import { iNota } from '../interfaces/iNota';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private url_api_notas = const_api.url + '/Notas';
  constructor() {}

  async listAll() {
    try {
      const getData = await fetch(`${this.url_api_notas}`);
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async create(nota: iNota) {
    try {
      const getData = await fetch(`${this.url_api_notas}`, {
        body: JSON.stringify(nota),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async get(id: number) {
    try {
      const getData = await fetch(`${this.url_api_notas}/${id}`);
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }

  async update(nota: iNota) {
    try {
      const getData = await fetch(
        `${this.url_api_notas}/${nota.id_nota}`,
        {
          body: JSON.stringify(nota),
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

  async delete(id_nota: number) {
    try {
      const getData = await fetch(`${this.url_api_notas}/${id_nota}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await getData.json();
      return Message(false, 200, 'Ok', data);
    } catch (error) {
      console.log(error);
      return Message(true, 500, 'Error');
    }
  }
}
