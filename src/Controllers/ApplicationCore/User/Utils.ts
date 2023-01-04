import axios from 'axios'
import { hash } from 'bcrypt';

import connection from '../../../Database/connection_bd_corer';


export interface UserGmailErro {
  msg: string
}
export interface UserGmail {
  email: string;
  password: string;
  photo_file?: string;
  full_name: string;
  fist_name: string;
  last_name: string;
  user_type_id: number;
  token?: string,
  created_at: Date;
  updated_at: Date;
  msg?: string
}


export async function setUser(dados: UserGmail, table: string){
  // Busca email para validar se o user ja ta na base
  const user = await connection(table).where('email', dados.email).first();

  // Chek de se o user ja foi criado
  if (!user) {
    const result = await connection(table).insert(dados);

    if (result) {
      const user = await connection(table).where('email', dados.email).first();
      return user

    }else{
      return false
    }  
  }
  else {
    return user
  }
}

export async function ValidaGmail(token: string, user_type_id?: number): Promise<UserGmail>{
  const created_at = new Date();
  const updated_at = new Date();
  const password = await hash(token, 10);

  try {
    const res = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    const user = res.data

    return {
      email: user.email,
      password,
      photo_file: user.picture,
      full_name: user.name,
      fist_name: user.given_name,
      last_name: user.family_name,
      user_type_id,
      created_at,
      updated_at
    }

  } catch (error) {
      return {
        msg: 'Erro de token G-mail.' ,
        email:"",
        password: "",
        photo_file: "",
        full_name: "",
        fist_name: "",
        last_name: "",
        user_type_id: 0,
        created_at,
        updated_at
          
      }  
  }
}





