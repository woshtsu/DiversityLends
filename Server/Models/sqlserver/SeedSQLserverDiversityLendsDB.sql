IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'DiverityLendsDB')
BEGIN
    CREATE DATABASE DiverityLendsDB;
END;

USE DiverityLendsDB;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='usuarios' AND xtype='U')
BEGIN
    CREATE TABLE usuarios (
        usuario_id        INT            IDENTITY(1,1)   PRIMARY KEY,
        nombre            NVARCHAR(100)  NOT NULL,
        correo            NVARCHAR(150)  NOT NULL  UNIQUE,
        titulo_biologico  VARBINARY(MAX) NULL,
        contraseña        NVARCHAR(100)  NOT NULL
    );
END;


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ubicaciones' AND xtype='U')
BEGIN
    CREATE TABLE ubicaciones (
        ubicacion_id  INT            IDENTITY(1,1)  PRIMARY KEY,
        nombre        NVARCHAR(100)  NOT NULL,
        latitud       DECIMAL(9,6)   NOT NULL,
        longitud      DECIMAL(9,6)   NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='categorias' AND xtype='U')
BEGIN
    CREATE TABLE categorias (
        categoria_id  INT            IDENTITY(1,1)  PRIMARY KEY,
        nombre        NVARCHAR(50)   NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='especies' AND xtype='U')
BEGIN
    CREATE TABLE especies (
        especie_id         INT            IDENTITY(1,1)  PRIMARY KEY,
        nombre_cientifico  NVARCHAR(150)  NOT NULL,
        nombre_comun       NVARCHAR(100)  NOT NULL,
        familia            NVARCHAR(100)  NOT NULL,
        categoria_id       INT            NOT NULL,
        CONSTRAINT FK_especies_categorias
            FOREIGN KEY(categoria_id) REFERENCES categorias(categoria_id)
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='avistamientos' AND xtype='U')
BEGIN
    CREATE TABLE avistamientos (
        avistamiento_id   INT            IDENTITY(1,1)  PRIMARY KEY,
        usuario_id        INT            NOT NULL,
        ubicacion_id      INT            NOT NULL,
        especie_id        INT            NOT NULL,
        descripcion       NVARCHAR(500)  NULL,
        fecha_avistamiento DATETIME2     NOT NULL  DEFAULT (GETDATE()),
        CONSTRAINT FK_avistamientos_usuarios
            FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id),
        CONSTRAINT FK_avistamientos_ubicaciones
            FOREIGN KEY(ubicacion_id) REFERENCES ubicaciones(ubicacion_id),
        CONSTRAINT FK_avistamientos_especies
            FOREIGN KEY(especie_id) REFERENCES especies(especie_id)
    );
END;

-- Datos de ejemplo

IF NOT EXISTS (SELECT * FROM categorias WHERE nombre IN ('Animalia', 'Plantae'))
BEGIN
    INSERT INTO categorias (nombre) VALUES
        ('Animalia'),
        ('Plantae');
END;

IF NOT EXISTS (SELECT * FROM especies WHERE nombre_cientifico = 'Vicugna vicugna')
BEGIN
    INSERT INTO especies (nombre_cientifico, nombre_comun, familia, categoria_id) VALUES
    -- 🐑 FAUNA SILVESTRE - Categoría ID = 1
    ('Vicugna vicugna',              'Vicuña',                  'Bovidae',         1),
    ('Rhea pennata tarapacensis',    'Ñandú Andino',            'Rheidae',         1),
    ('Podiceps taczanowskii',        'Parina Juniana',          'Podicipedidae',   1),
    ('Oreotrochilus melanogaster',   'Colibrí de Pico Recto',   'Trochilidae',     1),
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
END;

IF NOT EXISTS (SELECT * FROM ubicaciones WHERE nombre IN (
    'Parque Grau', 'Palcamayo', 'Laguna Junín', 'Cerro de Pasco', 'Yanacocha', 'Huayre', 'Marcara'))
BEGIN
    INSERT INTO ubicaciones (nombre, latitud, longitud) VALUES
        ('Parque Grau',         -12.050451, -75.196454),
        ('Palcamayo',           -11.232055, -75.805103),
        ('Laguna Junín',        -10.966667, -76.166667),
        ('Cerro de Pasco',      -10.683333, -76.250000),
        ('Yanacocha',           -11.833333, -76.000000),
        ('Huayre',              -11.100000, -75.500000),
        ('Marcara',             -10.800000, -75.900000);
END;

IF NOT EXISTS (SELECT * FROM usuarios WHERE correo IN (
    'admin@example.com',
    'ana@example.com',
    'carlos@example.com',
    'luis@example.com',
    'maria@example.com',
    'jose@example.com',
    'sofia@example.com'))
BEGIN
    INSERT INTO usuarios (nombre, correo, titulo_biologico, contraseña) VALUES
        ('Administrador',       'admin@example.com',   NULL, HASHBYTES('SHA2_256', 'admin')),
        ('Ana Flores',          'ana@example.com',     NULL, HASHBYTES('SHA2_256', 'password')),
        ('Carlos Mendoza',      'carlos@example.com',  NULL, HASHBYTES('SHA2_256', 'password')),
        ('Luis Rojas',          'luis@example.com',    NULL, HASHBYTES('SHA2_256', 'password')),
        ('María Torres',        'maria@example.com',   NULL, HASHBYTES('SHA2_256', 'password')),
        ('José Huamán',         'jose@example.com',    NULL, HASHBYTES('SHA2_256', 'password')),
        ('Sofía Quispe',        'sofia@example.com',   NULL, HASHBYTES('SHA2_256', 'password'));
END;

IF NOT EXISTS (SELECT * FROM avistamientos WHERE descripcion LIKE '%Avistamiento de prueba%')
BEGIN
    INSERT INTO avistamientos (usuario_id, ubicacion_id, especie_id, descripcion, fecha_avistamiento) VALUES
        (1, 1, (SELECT TOP 1 especie_id FROM especies WHERE nombre_comun = 'Vicuña'), 'Avistamiento de Vicuña en Parque Grau', GETDATE()),
        (2, 3, (SELECT TOP 1 especie_id FROM especies WHERE nombre_comun = 'Parina Juniana'), 'Avistamiento de Parina Juniana en Laguna Junín', DATEADD(HOUR, -2, GETDATE())),
        (3, 4, (SELECT TOP 1 especie_id FROM especies WHERE nombre_comun = 'Tordo Sureño'), 'Avistamiento de Tordo Sureño cerca de Cerro de Pasco', DATEADD(DAY, -1, GETDATE())),
        (4, 5, (SELECT TOP 1 especie_id FROM especies WHERE nombre_comun = 'Puma'), 'Avistamiento de Puma observado al atardecer', DATEADD(DAY, -2, GETDATE())),
        (5, 2, (SELECT TOP 1 especie_id FROM especies WHERE nombre_comun = 'Colibrí de Pico Recto'), 'Avistamiento de Colibrí en zona boscosa', DATEADD(DAY, -3, GETDATE())),
        (6, 6, (SELECT TOP 1 especie_id FROM especies WHERE nombre_comun = 'Pato de Puna'), 'Avistamiento de grupo de patos en laguna', DATEADD(DAY, -4, GETDATE())),
        (7, 7, (SELECT TOP 1 especie_id FROM especies WHERE nombre_comun = 'Cóndor de Peñas'), 'Avistamiento de Cóndor sobrevolando montañas', DATEADD(DAY, -5, GETDATE()));
END;



IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'miusuario')
BEGIN
    CREATE LOGIN miusuario WITH PASSWORD = 'mi_contraseña_segura';
END;

USE DiverityLendsDB;

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'miusuario')
BEGIN
    CREATE USER miusuario FOR LOGIN miusuario;
    EXEC sp_addrolemember 'db_owner', 'miusuario';
END;

