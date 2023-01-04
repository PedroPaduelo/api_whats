import connection from '../../../Database/connection_bd_corer';
import { hash, compare,  } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { setUser, ValidaGmail } from './Utils';

const table = "tbl_user"
const key_hash = process.env.KEY_HASH || "olympo_code_123_098_567_1234560987"






// Gmail
export async function CreateUserGmail(request, response) {
  const id_token = request.body.id_token
  const user_type_id = request.body.user_type_id

  const user = await ValidaGmail(id_token, user_type_id)
  if(user.msg){
    return response.json(user.msg);
  }
  const user_set = await setUser(user, "tbl_user") 
  return response.json(user_set);
}

export async function LoginUserGmail(request, response) {
  const id_token = request.body.id_token

  const userGmail = await ValidaGmail(id_token)
  if(userGmail.msg){
    return response.json(false);
  }

  const user = await connection(table).where('email', userGmail.email).first();
  if (!user){
    return response.json(false);
  }

  const result = await connection('tbl_user').where('email', userGmail.email).update(userGmail);
  if (!result){
    return response.json(false);
  }

  const token = sign({ email: user.email, tokenGmail: id_token }, key_hash , {  expiresIn: 8640000000000 });
  if (!token) {
    return response.json(false);
  }

  user.token = token
  delete user.password
  
  const acessos = await connection.select('tbl_routs.*')
  .from('tblr_type_user_and_routes')
  .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
  .where('user_type_id', user.user_type_id);

  const user_final = {
    ...user,
    accesses: acessos
  }
    return response.json(user_final);
}

export async function RefreshUserGmail(request, response) {

  const userGmail = await ValidaGmail(request.tokenGmail)
  if(userGmail.msg){
    return response.json(false);
  }

  const user = await connection(table).where('email', request.email).first();
  if (!user){
    return response.json(false);
  }


  const token = sign({ email: user.email, tokenGmail: request.tokenGmail }, key_hash , {  expiresIn: 8640000000000 });
  if (!token) {
    return response.json(false);
  }
  user.token = token


  
  const acessos = await connection.select('tbl_routs.*')
                                  .from('tblr_type_user_and_routes')
                                  .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
                                  .where('user_type_id', user.user_type_id);

  user.acessos = acessos;
  delete user.password
  return response.json(user);

}






// Password
export async function CreateUserPassword(request, response) {

  const created_at = new Date();
  const updated_at = new Date();

  const email = request.body.email.toLowerCase()
  const password = await hash(request.body.password, 10)
  const full_name = request.body.full_name
  const fist_name = request.body.fist_name
  const last_name = request.body.last_name
  const user_type_id = request.body.user_type_id
  const photo_file = request.body.photo_file
  
  const dados = {
    email,
    password,
    photo_file,
    full_name,
    fist_name,
    last_name,
    user_type_id,
    created_at,
    updated_at
  }

  const user_set = await setUser(dados, "tbl_user") 
  return response.json(user_set);
  
}

export async function LoginUserPassword(request, response) {

  // Token de Acesso do G-mail enviado via body post
  const password = request.body.password;
  const email = request.body.email;

  // Busca email para validar se o user ja ta na base
  const user = await connection(table).where('email', email).first();

  if (!user){
    return response.json(user);
  }

  if (!await compare(password, user.password)) {
    return response.json({
      data: 0,
      message: "Erro ao logar usuário, procure o administrador do sistema!!!"
    });
  }else{
    const token = sign({ email: user.email }, key_hash , {  expiresIn: 8640000000000 });

    if (!token) {
      return response.json(false);
    }

    const acessos = await connection.select('tbl_routs.*')
                                    .from('tblr_type_user_and_routes')
                                    .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
                                    .where('user_type_id', user.user_type_id);



    user.acessos = acessos;
    user.token = token;
    

    if(user.fisrt_access === 1){
      user.message = `Olá ${user.full_name} seja bem vindo!`;
    }else{
      user.message = `Olá ${user.full_name} seja bem vindo de volta!`;
    }

    return response.json(user);
  }

}

export async function RefreshUserPassword(request, response) {
  const user = await connection(table).where('email', request.email).first();
  if (user) {
    const acessos = await connection.select('tbl_routs.*')
                                    .from('tblr_type_user_and_routes')
                                    .leftJoin('tbl_routs', 'tbl_routs.id', 'tblr_type_user_and_routes.route_id')
                                    .where('user_type_id', user.user_type_id);
    user.acessos = acessos;
    delete user.password
    return response.json(user);
  }
  return response.json(false);
}






// Geral
export async function ListUser(request, response) {
  const users = await connection.select().from(table)

  return response.json(users);
}

export async function UpdateUser(request, response) { 
  const email = request.body.email.toLowerCase();

  // Dados enviados
  const fist_name = request.body.fist_name;
  const last_name = request.body.last_name;
  const photo_file = request.body.photo_file;
  const biography = request.body.biography;

  const updated_at = new Date();

  const dados = {
    email,
    fist_name,
    last_name,
    photo_file,
    biography,
    updated_at
  }

  // Busca email para validar se o user ja ta na base
  const user = await connection(table).where('email', email).first();

  if (user){
    const result = await connection('tbl_user').where('email', email).update(dados);

    if (result) {
      return response.json({
        result: result,
        message: "Usuario atualizado com sucesso!!!"
      });

    }
    else {
      return response.json({
        result: result,
        message: "Erro ao atualizar usuario!!!"
      });

    }
  }else{
    return response.json({
      result: 0,
      message: "Erro ao atualizar usuario!!!"
    });
  }
}






