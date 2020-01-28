import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) =>
  res.json({
    message: 'Hellow garotada',
  })
);

export default routes;
