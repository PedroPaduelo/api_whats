import connection from '../../../Database/connection_bd_corer';
const table = "tblr_type_user_and_routes"


export async function CreateRelationTypeUserAndRouts(request, response) {

  const user_type_id = request.body.user_type_id;

  try {

    await connection(table).insert(request.body);
    const result = await connection.select("*").from(table).where('user_type_id', user_type_id)

    return response.json(result); 
  } catch (error) {
    console.log(error)
    return response.json(error);
  }
}

export async function DeleteRelationTypeUserAndRouts(request, response) { 
  
  const route_id = request.body.route_id;
  const user_type_id = request.body.user_type_id;

  try {
    await connection(table).where('route_id', route_id).where('user_type_id', user_type_id).del()
    const result = await connection.select("*").from(table).where('user_type_id', user_type_id)

    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function ListRelationTypeUserAndRouts(request, response) {

  const user_type_id = request.body.user_type_id;

  try {
    const result = await connection.select("*").from(table).where('user_type_id', user_type_id)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

