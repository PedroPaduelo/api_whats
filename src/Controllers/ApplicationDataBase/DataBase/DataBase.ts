import connection from '../../../Database/connection_bd_corer';

const table = "tbl_data_base"

export async function CreateDataBase(request, response) {

  const created_at = new Date();
  const updated_at = new Date();
  const user_owner = request.email 
  const user_created = request.email 
  const user_updated = request.email 

  const datname = request.body.datname
  const datconnlimit = request.body.datconnlimit
  const app_id_fk = request.body.app_id_fk
   

  const dados = {
    app_id_fk,
    datname,
    datconnlimit: parseInt(datconnlimit),
    user_owner,
    user_created,
    created_at,
    user_updated,
    updated_at
  }





  try {

    const result = await connection.raw(
      `CREATE DATABASE ${datname}
              CONNECTION LIMIT ${datconnlimit}
      `
    )



    if(result.command !== "CREATE"){
      return response.json(result); 
    }

    await connection(table).insert(dados);
    const resultList =  await connection.select("*").from(table)
    return response.json(resultList); 


  } catch (error) {
    console.log(error)
    
    return response.json(error);
  }
}

export async function ListDataBase(request, response) {
  try {
    const result = await connection.select("*").from(table)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function UpdateDataBase(request, response) { 
  const user_updated = request.email 
  const updated_at = new Date();

  const id = request.body.id;
  const datname = request.body.datname;
  const new_datname = request.body.new_datname;
  
  
  
  const dados = {
    datname: new_datname,
    user_updated,
    updated_at
  }

  try {
   
    const result = await connection.raw(
      `ALTER DATABASE ${datname} RENAME TO ${new_datname}`
    )

    if(result.command !== "ALTER"){
      return response.json(result); 
    }

    else{

      await connection(table).where('id', id).update(dados);
      const result = await connection.select("*").from(table)
      return response.json(result); 

    }

    

    
  } catch (error) {
    return response.json(error);
  }
}

export async function DeleteDataBase(request, response) { 
  
  const id = request.body.id;

  try {
    
    
    const resultFidDataBase = await connection.select("*").from("view_data_base").where('data_base_id_fk', id)
    if(resultFidDataBase.length > 0){

      return response.json({
        name: "errorTable"
      });
    }


    const resultFidOnDataBase = await connection.select("*").from(table).where('id', id).first()
    if(!resultFidOnDataBase) return false


    const result = await connection.raw(
      `DROP DATABASE IF EXISTS ${resultFidOnDataBase.datname} WITH (FORCE)`
    )
    if(result.command !== "DROP"){
      return response.json(result); 
    }
    await connection(table).where('id', id).del()
    const resultList = await connection.select("*").from(table)

    return response.json(resultList); 
  } catch (error) {
    return response.json(error);
  }
}


