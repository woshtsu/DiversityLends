import { typeuserSchema } from '../../src/Utils/Schemas.js'
import {require} from '../../src/Utils/Util.js'
const sql = require('mssql/msnodesqlv8')

type Configsql = {
    user?: string,
    password?: string,
    database: string,
    server: string,
    port?: number,
    options: {
        encrypt: boolean,
        trustServerCertificate: boolean,
    },
    authentication?: {
        type: string,
        options: {
            userName: string,
            password: string
        }
    }
}

const config : Configsql= {
    user: 'miusuario',
    password: 'mi_contraseña_segura',
    server: 'UHYXI40218', // Nombre de tu servidor
    database: 'DiverityLendsDB',
    options: {
        encrypt: false, // Si usas Azure, puede ser true
        trustServerCertificate: true
    }
};

async function conectar() {
    try {
        await sql.connect(config);
        console.log('✅ Conexión exitosa con usuario SQL');

        const result = await sql.query`SELECT * FROM Usuarios`;
        console.log(result.recordset);

    } catch (err:any) {
        console.error('❌ Error al conectar:', err.message);
    }
}

conectar();

export class ModelFA {
    static getAllspecies = async () => {
        const result = await sql.query`SELECT * FROM especies`;
        return result.recordset;
    }
    static getUsers = async () => {
        const result = await sql.query`SELECT * FROM Usuarios`;
        return result.recordset;
    }
    static updateTables = (): string => {
        return 'Update'
    }
    
    static getAllPosts = (): string => {
        return 'Get'
    }
    static postAvistamiento = (data: any): string => {
        return 'Post'
      }
    
    static createUser = ({ data }: { data: typeuserSchema }): string | undefined => {
        return 'Create'
    }
    static seedDB = (): string => {
        return 'Seed'
    }
}