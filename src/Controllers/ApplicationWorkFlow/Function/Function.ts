import connection from '../../../Database/connection_bd_corer';

const table = "tbl_fns"

export async function CreateFunction(request, response) {

  const created_at = new Date();
  const updated_at = new Date();
  const user_owner = request.email 
  const user_created = request.email 
  const user_updated = request.email 

  
  const dados = {
    ...request.body,
    user_owner,
    user_created,
    created_at,
    user_updated,
    updated_at
  }

  try {

    await connection(table).insert(dados);
    const result =  await connection.select("*").from(table)
    return response.json(result); 

  } catch (error) {
    return response.json(error);
  }
}

export async function ListFunction(request, response) {
  try {
    const result = await connection.select("*").from(table)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function UpdateFunction(request, response) { 

  const id = request.body.id;
  const updated_at = new Date();
  const user_updated = request.email 

  const dados = {
    ...request.body,
    user_updated,
    updated_at
  }

  try {
    await connection(table).where('id', id).update(dados);
    const result = await connection.select("*").from(table)

    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function DeleteFunction(request, response) { 
  
  const id = request.body.id;

  try {
    await connection(table).where('id', id).del()
    const result = await connection.select("*").from(table)

    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}


