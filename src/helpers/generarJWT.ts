import jwt from 'jsonwebtoken';

export const generarJWT = ( pid: number ) => {
  const skey = process.env.SECRETKEY || '';

  return new Promise( (resolve, reject) => {
    const payload = { pid };
    //token expira en 15 min
    jwt.sign( payload, skey, {expiresIn:900},
      ( err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');    
        }
        else{
          resolve( token );
        }
      }); 
  });

}