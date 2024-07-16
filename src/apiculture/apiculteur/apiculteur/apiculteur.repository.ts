import { Injectable } from '@nestjs/common';
import { ApiculteurDto } from './dto/apiculteur.dto';
import { pool } from '../../../database/mysql.config';
import { Apiculteur } from './interfaces/apiculteur.interface';

@Injectable()
export class ApiculteurRepository {
  SQL_INSERT = `INSERT INTO apiculteur set firstname = ?, lastname = ?, siret = ?, napi = ?, email = ?, phone = ?`;
  SQL_FIND_ALL = `SELECT * from apiculteur`;
  SQL_FIND_ONE = `SELECT * from apiculteur WHERE id = ?`;
  SQL_UPDATE = `UPDATE apiculteur SET firstname = ?, lastname = ?, siret = ?, napi = ?, email = ?, phone = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM apiculteur WHERE id = ?`;

  async create(apiculteurDto: ApiculteurDto) {
    return pool.execute(this.SQL_INSERT, [
      apiculteurDto.firstname,
      apiculteurDto.lastname,
      apiculteurDto.siret,
      apiculteurDto.napi,
      apiculteurDto.email,
      apiculteurDto.phone,
    ]);
  }

  async findAll() {
    return pool.execute(this.SQL_FIND_ALL);
  }

  async findOne(id: number) {
    return pool.execute(this.SQL_FIND_ONE, [id]);
  }

  async update(apiculteur: Apiculteur) {
    return pool.execute(this.SQL_UPDATE, [
      apiculteur.firstname,
      apiculteur.lastname,
      apiculteur.siret,
      apiculteur.napi,
      apiculteur.email,
      apiculteur.phone,
      apiculteur.id,
    ]);
  }

  async delete(id: number){
    return pool.execute(this.SQL_DELETE, [id]);
  }
}
