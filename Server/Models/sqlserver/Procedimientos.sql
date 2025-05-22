USE DiverityLendsDB;

-- 1. Mostrar categorías
PRINT '--- CATEGORÍAS ---';
SELECT * FROM categorias ORDER BY categoria_id;

-- 2. Mostrar especies
PRINT '--- ESPECIES ---';
SELECT * FROM especies ORDER BY especie_id;

-- 3. Mostrar usuarios
PRINT '--- USUARIOS ---';
SELECT * FROM usuarios ORDER BY usuario_id;

-- 4. Mostrar ubicaciones
PRINT '--- UBICACIONES ---';
SELECT * FROM ubicaciones ORDER BY ubicacion_id;

-- 5. Mostrar avistamientos
PRINT '--- AVISTAMIENTOS ---';
SELECT * FROM avistamientos ORDER BY avistamiento_id;


--CREATE PROCEDURE sp_ResetAllTables
--AS
--BEGIN
--    -- Prevenir mensajes innecesarios
--    SET NOCOUNT ON;
--
--    -- Eliminar avistamientos (depende de usuarios, ubicaciones y especies)
--    IF OBJECT_ID('avistamientos', 'U') IS NOT NULL
--        DROP TABLE avistamientos;
--
--    -- Eliminar usuarios, ubicaciones y especies (dependen de categorias)
--    IF OBJECT_ID('usuarios', 'U') IS NOT NULL
--        DROP TABLE usuarios;
--
--    IF OBJECT_ID('ubicaciones', 'U') IS NOT NULL
--        DROP TABLE ubicaciones;
--
--    IF OBJECT_ID('especies', 'U') IS NOT NULL
--        DROP TABLE especies;
--
--    -- Eliminar categorías (tabla principal)
--    IF OBJECT_ID('categorias', 'U') IS NOT NULL
--        DROP TABLE categorias;
--
--    PRINT '✅ Todas las tablas han sido eliminadas correctamente.';
--END;