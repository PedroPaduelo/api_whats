import { Request, Response,  NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
const key_hash = process.env.KEY_HASH || "olympo_code_123_098_567_1234560987"


export interface ExtendedRequest extends Request {
  email: string,
  tokenGmail: string
}



async function validate(request: ExtendedRequest, response: Response, next: NextFunction) {

  const { authorization } = request.headers;
  
  
  if(!authorization){
    return response.status(401).send({erro: "Erro authorization"})
  }


  const partes = authorization.split(' ');
  
  
  if(partes.length !== 2){
    return response.status(401).send({erro: "Erro token"});
  }


  const [scheme, token ] = partes;

  if(!/^Bearer$/i.test(scheme)){
    return response.status(401).send({erro: "O token esta no formato errado"});
  }

  verify(token, key_hash, function (err, decoded) {
    
    if(err){
      return response.status(401).send({erro: "O token invalido"});
    }

    request.email = decoded["email"]
    request.tokenGmail = decoded["tokenGmail"]

    
    return next();
  })

}

export default validate;
