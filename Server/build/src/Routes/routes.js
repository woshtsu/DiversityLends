import { Router } from 'express';
const router = Router();
export function routesForoAcademico() {
    router.get('/', (req, res) => {
        res.send('Bienvenido al api');
    });
}
