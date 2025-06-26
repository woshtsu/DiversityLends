import Database from 'better-sqlite3'
import type { Post, typepostSchema, TypeResponseGetUsuario, TypeSpecies, typeuserSchema } from '../../src/Utils/Schemas.js'


const db = new Database('app.db')



export class ModelFA {

  // obtener informacion de usuario por correo
  static getInfoUser = async ({ data }: { data: string }): Promise<TypeResponseGetUsuario> => {
    const query = `
      select * from usuarios where correo = ?
    `
    return db.prepare(query).get(data) as TypeResponseGetUsuario
  }


  static getAllspecies = async () => {
    const query = `
    SELECT * FROM especies;
    `;
    const result = db.prepare(query).all();
    return result as TypeSpecies[]
  }

  static validateLogin = async ({ data }: { data: typeuserSchema }) => {
    const query = `
    Select * from usuarios where correo = ? and contraseña = ?
    `
    const result = db.prepare(query).get(data.correo, data.contraseña)
    return result
  }


  static getAllPosts = () => {
    const query = `
    SELECT 
      u.usuario_id as id,
      u.correo as userEmail,
      u.nombre as userName,
      e.nombre_cientifico AS species,
      ub.latitud as latitude,
      ub.longitud as longitude,
      a.descripcion as content,
      a.fecha_avistamiento as createdAt,
      a.likes,
      a.comments
    FROM avistamientos AS a
    JOIN usuarios AS u ON u.usuario_id = a.usuario_id
    JOIN especies AS e ON e.especie_id = a.especie_id
    JOIN ubicaciones AS ub ON ub.ubicacion_id = a.ubicacion_id
    `
    const result = db.prepare(query).all();
    return result as Post[]
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

  static postAvistamiento = async ({ input }: { input: typepostSchema }) => {
    try {
      const insertUbicacion = db.prepare(
        `INSERT INTO ubicaciones (latitud, longitud) VALUES (?, ?)`
      );

      const resultUbicacion = insertUbicacion.run(input.latitude, input.longitude)
      const ubicacion_id = resultUbicacion.lastInsertRowid

      const insertAvistamiento = db.prepare(`
      INSERT INTO avistamientos (
        usuario_id, ubicacion_id, especie_id, descripcion, likes, comments
      ) VALUES (?, ?, ?, ?, 0, 0)
      `)

      const resultAvistamiento = insertAvistamiento.run(
        input.usuario_id,
        ubicacion_id,
        input.especie_id,
        input.descripcion
      )

      return {
        success: true,
        message: 'Avistamiento creado correctamente',
        data: {
          avistamiento_id: resultAvistamiento.lastInsertRowid,
          ubicacion_id
        }
      }

    } catch (error) {
      if (!db.inTransaction) throw error
      return { errorMensaje: "Ocurrio un error al insertar los datos de ubicacion" }
    }
  }

  static seedDB = (): string => {
    const query = `
    PRAGMA foreign_keys = ON;

    -- 1. Categorias
    CREATE TABLE IF NOT EXISTS categorias (
        categoria_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
    );

    -- 2. Especies
    CREATE TABLE IF NOT EXISTS especies (
        especie_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_cientifico TEXT NOT NULL,
        nombre_comun TEXT NOT NULL,
        familia TEXT NOT NULL,
        categoria_id INTEGER NOT NULL,
        FOREIGN KEY(categoria_id) REFERENCES categorias(categoria_id)
    );

    -- 3. Usuarios
    CREATE TABLE IF NOT EXISTS usuarios (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        titulo_biologico BLOB,
        contraseña TEXT NOT NULL
    );

    -- 4. Ubicaciones
    CREATE TABLE IF NOT EXISTS ubicaciones (
        ubicacion_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        latitud REAL NOT NULL,
        longitud REAL NOT NULL
    );

    -- 5. Avistamientos
    CREATE TABLE IF NOT EXISTS avistamientos (
        avistamiento_id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        ubicacion_id INTEGER NOT NULL,
        especie_id INTEGER NOT NULL,
        descripcion TEXT,
        likes integer,
        comments integer,
        fecha_avistamiento TEXT NOT NULL DEFAULT (DATETIME('now')),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id),
        FOREIGN KEY(ubicacion_id) REFERENCES ubicaciones(ubicacion_id),
        FOREIGN KEY(especie_id) REFERENCES especies(especie_id)
    );

    -- Datos iniciales

    -- Categorias
    INSERT OR IGNORE INTO categorias (nombre) VALUES
        ('Animalia'),
        ('Plantae');

    -- Especies
    INSERT OR IGNORE INTO especies (nombre_cientifico, nombre_comun, familia, categoria_id) VALUES
        -- 🐑 FAUNA SILVESTRE - Categoría ID = 1
        ('Vicugna vicugna',              'Vicuña',                  'Bovidae',         1),
        ('Rhea pennata tarapacensis',    'Ñandú Andino',            'Rheidae',         1),
        ('Podiceps taczanowskii',        'Parina Juniana',          'Podicipedidae',   1),
        ('Oreotrochilus melanogaster',   'Colibrí de Pico Recto',  'Trochilidae',     1),
        ('Pteronura brasiliensis',       'Nutria Gigante',          'Mustelidae',      1),
        ('Leopardus jacobita',           'Yaguar Pichpa',           'Felidae',         1),
        ('Chionomys minimus',            'Ratón de Altura',         'Muridae',         1),
        ('Tinamotis pentlandii',         'Tinamo Andino',           'Tinamidae',       1),
        ('Anas puna',                    'Pato de Puna',            'Anatidae',        1),
        ('Phalcoboenus albogularis',     'Cóndor de Peñas',         'Falconidae',      1),
        ('Upupa indica',                 'Abubilla',                'Upupidae',        1),
        ('Myrmecophaga tridactyla',      'Oso Hormiguero',          'Myrmecophagidae', 1),
        ('Puma concolor',                'Puma',                    'Felidae',         1),
        ('Lagothrix lagotricha',         'Mono Choro',              'Atelidae',        1),
        ('Tapirus terrestris',           'Danta Andina',            'Tapiridae',       1),
        ('Cervus elaphus canadensis',    'Ciervo de Virginia',      'Cervidae',        1),
        ('Zyzomys pedunculatus',         'Ratón de Cola Grande',    'Muridae',         1),
        ('Dasypus novemcinctus',         'Armadillo de Nueve Franjas', 'Dasypodidae',  1),
        ('Sturnella loyca',              'Tordo Sureño',            'Icteridae',       1),
        ('Carduelis carduelis',          'Jilguero Europeo',        'Fringillidae',    1),

        -- 🌿 FLORA NATIVA - Categoría ID = 2
        ('Parastrephia lucida',          'Yareta',                  'Asteraceae',      2),
        ('Polylepis sericea',            'Queñua',                  'Rosaceae',        2),
        ('Tessaria integrifolia',        'Molle Andino',            'Asteraceae',      2),
        ('Fabiana densa',                'Pichi',                   'Solanaceae',      2),
        ('Baccharis odorata',            'Retama',                  'Asteraceae',      2),
        ('Escallonia resinosa',          'Chancaquiro',             'Escalloniaceae',  2),
        ('Berberis empetrifolia',        'Michur',                  'Berberidaceae',   2),
        ('Adesmia pinifolia',            'Retamilla',               'Fabaceae',        2),
        ('Valeriana carnosa',            'Hierba Maestra',          'Valerianaceae',   2),
        ('Grindelia caroli',             'Matacaballo',             'Asteraceae',      2),
        ('Senecio nutans',               'Flor de San Juan',        'Asteraceae',      2),
        ('Hibiscus rosa-sinensis',       'Flor de Jamaica',         'Malvaceae',       2),
        ('Gentianella alborosea',        'Herma',                   'Gentianaceae',    2),
        ('Calceolaria fothergillii',     'Zapatito de Judas',       'Calceolariaceae', 2),
        ('Hordeum comosum',              'Cebada Silvestre',        'Poaceae',         2),
        ('Ageratina glabrata',           'Mata Negra',              'Asteraceae',      2),
        ('Nassauvia fritschii',          'Rompepiedra',             'Asteraceae',      2),
        ('Osmorhiza chilensis',          'Hierbabuena Andina',      'Apiaceae',        2),
        ('Cynara cardunculus',           'Alcachofa Silvestre',     'Asteraceae',      2),
        ('Verbena litoralis',            'Verbena Común',           'Verbenaceae',     2);

    -- Ubicaciones
    INSERT OR IGNORE INTO ubicaciones (nombre, latitud, longitud) VALUES
        ('Parque Grau',         -12.050451, -75.196454),
        ('Palcamayo',           -11.232055, -75.805103),
        ('Laguna Junín',        -10.966667, -76.166667),
        ('Cerro de Pasco',      -10.683333, -76.250000),
        ('Yanacocha',           -11.833333, -76.000000),
        ('Huayre',              -11.100000, -75.500000),
        ('Marcara',             -10.800000, -75.900000);

    -- Usuarios
    INSERT OR IGNORE INTO usuarios (nombre, correo, titulo_biologico, contraseña) VALUES
        ('Administrador',       'admin@example.com',   NULL, 'admin'),
        ('Ana Flores',          'ana@example.com',     NULL, 'password'),
        ('Carlos Mendoza',      'carlos@example.com',  NULL, 'password'),
        ('Luis Rojas',          'luis@example.com',    NULL, 'password'),
        ('María Torres',        'maria@example.com',   NULL, 'password'),
        ('José Huamán',         'jose@example.com',    NULL, 'password'),
        ('Sofía Quispe',       'sofia@example.com',  NULL, 'password');

    -- Avistamientos
    INSERT OR IGNORE INTO avistamientos (usuario_id, ubicacion_id, especie_id, descripcion, fecha_avistamiento, likes, comments) VALUES
        (1, 1, (SELECT especie_id FROM especies WHERE nombre_comun = 'Vicuña' ORDER BY especie_id LIMIT 1), 'Avistamiento de Vicuña en Parque Grau', datetime('now'),5,0),
        (2, 3, (SELECT especie_id FROM especies WHERE nombre_comun = 'Parina Juniana' ORDER BY especie_id LIMIT 1), 'Avistamiento de Parina Juniana en Laguna Junín', datetime('now', '-2 hours'),10,0),
        (3, 4, (SELECT especie_id FROM especies WHERE nombre_comun = 'Tordo Sureño' ORDER BY especie_id LIMIT 1), 'Avistamiento de Tordo Sureño cerca de Cerro de Pasco', datetime('now', '-1 day'),11,0),
        (4, 5, (SELECT especie_id FROM especies WHERE nombre_comun = 'Puma' ORDER BY especie_id LIMIT 1), 'Avistamiento de Puma observado al atardecer', datetime('now', '-2 days'),11,0),
        (5, 2, (SELECT especie_id FROM especies WHERE nombre_comun = 'Colibrí de Pico Recto' ORDER BY especie_id LIMIT 1), 'Avistamiento de Colibrí en zona boscosa', datetime('now', '-3 days'),55,1),
        (6, 6, (SELECT especie_id FROM especies WHERE nombre_comun = 'Pato de Puna' ORDER BY especie_id LIMIT 1), 'Avistamiento de grupo de patos en laguna', datetime('now', '-4 days'),1,1),
        (7, 7, (SELECT especie_id FROM especies WHERE nombre_comun = 'Cóndor de Peñas' ORDER BY especie_id LIMIT 1), 'Avistamiento de Cóndor sobrevolando montañas', datetime('now', '-5 days'),3,0);
        `;

    const runTransaction = db.transaction((query) => {
      db.exec(query)
    })
    try {
      runTransaction(query)
    } catch (error: any) {
      console.error('Error al ejecutar la query de seed:', error)
      return error.toString()
    }
    return 'Se ejecuto la query de seed'
  }
}