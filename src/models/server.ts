import express, { Application } from 'express';
import cors from 'cors';
import pagosRouter from '../routes/pagos.routes'
import seguimientoRouter from '../routes/seguimiento.routes';
import db from '../db/conex';

class Server {

  private app: Application;
  private port: string; 
  private apiPaths = {
    pagos: `/v1/api/pagos`,
    seguimiento: `/v1/api/seguimiento`
  }

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '4400';

    //base de datos
    this.dbConnection();
    //middlewares
    this.middlewares();

    //definir rutas
    this.routes();
  }

  middlewares(){
    //cors
    this.app.use(cors());

    //lectura del Body
    this.app.use(express.json());

    //Carpeta del INDEX
    this.app.use(express.static('public'));
  }

 async dbConnection(){
  try {
    await db.authenticate();
    console.log('Data Base en linea PSQL');
  } catch (error) {
    console.info(error);
    process.exit();
  }
 }

  routes(){
    this.app.use( this.apiPaths.pagos, pagosRouter );
    this.app.use( this.apiPaths.seguimiento, seguimientoRouter );
  }

  listen(){
    this.app.listen( this.port, () => {
      console.log(`Servidor corriendo en ${this.port}`);
    });
  }

}

export default Server;