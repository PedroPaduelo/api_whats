import connection from '../../../Database/connection_bd_corer';

const table = "tbl_routs"

export async function CreateRoute(request, response) {

  const created_at = new Date();
  const updated_at = new Date();

  const dados = {
    ...request.body,
    created_at,
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

export async function ListRoute(request, response) {
  try {
    const result = await connection.select("*").from(table)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function UpdateRoute(request, response) { 

  const id = request.body.id;
  const updated_at = new Date();


  const dados = {
    ...request.body,
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

export async function DeleteRoute(request, response) { 
  
  const id = request.body.id;

  try {
    await connection(table).where('id', id).del()
    const result = await connection.select("*").from(table)

    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}


