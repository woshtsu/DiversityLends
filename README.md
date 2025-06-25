# 🎯 Nombre del Proyecto

> Diversity Lens
Api RESTFUL creada para proveer de una interfaz al proyecto con el mismo nombre

---

## 📦 Índice

1. [Sobre el Proyecto](#sobre-el-proyecto)
2. [Características](#características)
3. [Tecnologías Usadas](#tecnologías-usadas)
4. [Instalación](#instalación)
5. [Endpoints](#endpoints)
6. [Ejemplos](#ejemplos)
7. [Créditos](#créditos)

---

## 1. 🧾 Sobre el Proyecto

Informacion rapida:
- API RESTFUL
- MONITOREO DE BIODIVERSIDAD JUNIN
- PERSONAS INTERESADAS, ESTUDIANTES Y PROFESIONALES

---

## 2. 🚀 Características

Funcionalidades principales:

- Registro de usuarios
- Publicación de avistamientos
- Mapa interactivo

---

## 3. ⚙️ Tecnologías Usadas

- Backend: Node.js + Express
- Base de datos: SQLite / PostgreSQL / MongoDB
- Autenticación: JWT / OAuth / Firebase
- Otros: TypeScript, Zod, REST Client, ...

---

## 4. 🛠️ Instalación

Instrucciones paso a paso para instalar el proyecto localmente:

```bash
# Clonar repositorio
git clone https://github.com/woshtsu/DiversityLends.git

# Entrar al directorio
cd DiversityLends; git checkout only-server

# Instalar dependencias
npm install

# Iniciar servidor
npm run dev

```
---

## 5. 💫 ENDPOINTS

```bash
GET http://localhost:1234/api/initializeSeed
```
```bash
// RUTA PARA PROBAR EL SERVIDOR
GET http://localhost:1234/api/
```
```bash
// Peticion para conseguir informacion de usuario
GET http://localhost:1234/api/getuserdata/admin@example.com
/// PETICION PARA OBTENER LAS ESPECIES
GET http://localhost:1234/api/getAllspecies
/// PETICION PARA OBTENER LOS POSTS
GET http://localhost:1234/api/getAllPosts
```
```bash
/// POST PARA VALIDAR USUARIO INICIO DE SESION
POST http://localhost:1234/api/validar
/// POST PARA HACER UN COMENTARIO
POST http://localhost:1234/api/post
```
---
## 6. 🎭 EJEMPLOS
```bash
http://localhost:1234/api/getuserdata/admin@example.com
Respuesta:
{
  "usuario_id": 1,
  "nombre": "Administrador",
  "correo": "admin@example.com",
  "titulo_biologico": null
}
```
```bash
http://localhost:1234/api/getAllspecies
Respuesta:
[
  {
    "especie_id": 1,
    "nombre_cientifico": "Vicugna vicugna",
    "nombre_comun": "Vicuña",
    "familia": "Bovidae"
  },
  {
    "especie_id": 2,
    "nombre_cientifico": "Rhea pennata tarapacensis",
    "nombre_comun": "Ñandú Andino",
    "familia": "Rheidae"
  }
]
```
```bash
http://localhost:1234/api/getAllPosts
Respuesta:
[
  {
    "id": "1",
    "content": "Avistamiento de Vicuña en Parque Grau",
    "userEmail": "admin@example.com",
    "userName": "Administrador",
    "location": {
      "latitude": -12.050451,
      "longitude": -75.196454
    },
    "species": "Vicugna vicugna",
    "createdAt": "2025-06-25 06:15:04",
    "likes": 5,
    "comments": 0
  }
]
```
```bash
http://localhost:1234/api/validar
Header:
Content-Type: application/json

    {
      "correo": "admin@example.com",
      "contraseña": "admin"
    }

Respuesta:
{
  "esUsuario": true
}
```
```bash
http://localhost:1234/api/post
Header:
Content-Type: application/json

{
  "usuario_id": 1,
  "especie_id": 1,
  "descripcion": "Avisté una vicuña cerca del lago",
  "latitude": -12.050451,
  "longitude": -75.196454
}
Respuesta:
{
  "isCreated": true
}
```
## 7. Créditos

Ricardo Porras Veli