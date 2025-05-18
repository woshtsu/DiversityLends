import Database from 'better-sqlite3'
import type { typeuserSchema } from '../../src/Utils/Schemas.js'

const db = new Database('app.db')

export class ModelFA {
  static updateTables = (): string => {
    const query = `
    BEGIN TRANSACTION;
    ALTER TABLE usuarios ADD UNIQUE (correo);
    COMMIT;
    `;
    try {
      db.exec(query)
      return 'Se actualizaron las tablas'
    } catch (error: any) {
      console.error('Error al actualizar tablas:', error.message)
      db.exec('ROLLBACK;')
      return `Error al actualizar tablas: ${error.message}`
    }
  }

  static getAllPosts = (): string => {
    const query = `
    SELECT * FROM avistamientos;
    `;
    const result = db.prepare(query).all();
    return JSON.stringify(result);
  }

  static createUser = ({ data }: { data: typeuserSchema }): string | undefined => {
    const insertStmt = db.prepare(`
      INSERT INTO usuarios (nombre, correo, titulo_biologico, contraseña)
      VALUES (?,?,?,?);
    `);

    const runTransaction = db.transaction((userData) => {
      return insertStmt.run(userData.nombre, userData.correo, userData.titulo_biologico, userData.contraseña);
    });

    try {
      runTransaction(data)
    } catch (error: any) {
      console.error('Error al crear usuario:', error);
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' && error.message.includes('usuarios.correo')) {
        return 'El correo electrónico ya está registrado.'
      }
      return error.toString()
    }
    return 'Usuario creado exitosamente.'
  }

  static postAvistamiento = (data: any): string => {
    const query = `
    INSERT INTO avistamientos (usuario_id, ubicacion_id, especie_id, descripcion)
    VALUES (?, ?, ?, ?);
    `;
    const result = db.prepare(query).run(data.usuario_id, data.ubicacion_id, data.especie_id, data.descripcion);
    return JSON.stringify(result)
  }
  static seedDB = (): string => {
    const query = `
      BEGIN TRANSACTION;
      CREATE TABLE IF NOT EXISTS usuarios (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        correo TEXT unique,
        titulo_biologico BLOB,
        contraseña TEXT
      );

      Create table if not exists ubicaciones (
        ubicacion_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        latitud TEXT,
        longitud TEXT
      );
      Create table if not exists categorias (
        categoria_id integer primary key autoincrement,
        nombre text
      );
      Create table if not exists especies (
        especie_id integer primary key autoincrement,
        nombre_cientifico text,
        nombre_comun text,
        familia text,
        categoria_id integer,
        foreign key (categoria_id) references categorias (categoria_id)
      );

      Create table if not exists avistamientos (
        avistamiento_id integer primary key autoincrement,
        usuario_id integer,
        ubicacion_id integer,
        especie_id integer,
        descripcion text,
        fecha_avistamiento text default (srtftime('%Y-%m-%d %H:%M:%S', 'now')),
        foreign key (usuario_id) references usuarios (usuario_id),
        foreign key (ubicacion_id) references ubicaciones (ubicacion_id),
        foreign key (especie_id) references especies (especie_id)
      );
      COMMIT;
    `;
    db.exec(query);
    return 'Se ejecuto la query de seed'
  }
}