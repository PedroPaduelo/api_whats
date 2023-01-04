import connection from '../../../Database/connection_bd_corer';
import { connectionDataBase } from '../../utils/utilsDB';

const table = "tbl_schema"
const view = "view_schema"
const tableDataBase = "tbl_data_base"

export async function CreateSchema(request, response) {

  const created_at = new Date();
  const updated_at = new Date();
  const user_owner = request.email 
  const user_created = request.email 
  const user_updated = request.email 

  const data_base_id_fk = request.body.data_base_id_fk
  const schema_name = request.body.schema_name

  const dados = {
    data_base_id_fk,
    schema_name,
    user_owner,
    user_created,
    created_at,
    user_updated,
    updated_at
  }

  try {
    const resulFidOnDataBase = await connection.select("*").from(tableDataBase).where('id', data_base_id_fk).first()
    if(!resulFidOnDataBase) {
      return response.json(false); 
    }

    const bd = await connectionDataBase(resulFidOnDataBase.datname)

    
    const result = await bd.schema.raw(`CREATE SCHEMA ${schema_name}`);
    if(result.command !== "CREATE"){
      return response.json(result); 
    }

  
    await connection(table).insert(dados);
    const resultList = await connection.select("*").from(table)
    return response.json(resultList); 
    
  } catch (error) {
    console.log(error)
    return response.json(error);
  }
}

export async function ListSchema(request, response) {
  try {
    const result = await connection.select("*").from(view)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function UpdateSchema(request, response) { 

  const updated_at = new Date()
  const user_updated = request.email

  const id = request.body.id
  const schema_name_new = request.body.schema_name_new

  const dados = {
    schema_name: schema_name_new,
    updated_at,
    user_updated
  }

  try {
    const resulFidOnSchema = await connection.select("*").from(view).where('id', id).first()
    if(!resulFidOnSchema) {
      return response.json(false); 
    }

    const bd = await connectionDataBase(resulFidOnSchema.datname)
    const resultRaw = await bd.raw(
      `ALTER SCHEMA ${resulFidOnSchema.schema_name} RENAME TO ${schema_name_new}`
    )
    if(resultRaw.command !== "ALTER"){
      return response.json(resultRaw); 
    }

    await connection(table).where('id', id).update(dados);
    const resultList = await connection.select("*").from(table)

    return response.json(resultList); 
  } catch (error) {
    return response.json(error);
  }
}

export async function DeleteSchema(request, response) { 
  
  const id = request.body.id

  try {

    const resultFidDataBase = await connection.select("*").from("tbl_table").where('schema_id_fk', id)
    if(resultFidDataBase.length > 0){
      return response.json({
        name: "errorTable"
      });
    }


    const resulFidOnSchema = await connection.select("*").from(view).where('id', id).first()
    if(!resulFidOnSchema) {
      return response.json(false); 
    }
    
    const bd = await connectionDataBase(resulFidOnSchema.datname)
    const resultRaw = await bd.raw(
      `DROP SCHEMA ${resulFidOnSchema.schema_name} CASCADE`
    )
    if(resultRaw.command !== "DROP"){
      return response.json(resultRaw); 
    }

    await connection(table).where('id', id).del()
    const result = await connection.select("*").from(table)

    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}
