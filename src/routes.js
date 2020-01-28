import  { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({message: 'Hellow garotada'})
})

export default routes;