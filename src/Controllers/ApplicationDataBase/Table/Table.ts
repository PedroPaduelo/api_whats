import connection from '../../../Database/connection_bd_corer';
import { Knex } from "knex";
import { connectionDataBase, hasTable } from '../../utils/utilsDB';


const table = "tbl_table"
const view = "view_table"
const view_schema = "view_schema"


export async function CreateTable(request, response) {

  const created_at = new Date();
  const updated_at = new Date();
  const user_owner = request.email 
  const user_created = request.email 
  const user_updated = request.email 


  const schema_id_fk = request.body.schema_id_fk
  const table_name = request.body.table_name
  

  const dados = {
    schema_id_fk,
    table_name,
    user_owner,
    user_created,
    created_at,
    user_updated,
    updated_at
  }

  try {
    const resulFidOnSchema = await connection.select("*").from(view_schema).where('id', schema_id_fk).first()
    if(!resulFidOnSchema) return false

    const bd = await connectionDataBase(resulFidOnSchema.datname)
    if(!bd) return false

    const resultCreate = await bd.schema.withSchema(resulFidOnSchema.schema_name).createTable(table_name, 
      function (table: Knex.CreateTableBuilder) {
      }
    )
    if(resultCreate.command !== "CREATE"){
      return response.json(resultCreate); 
    }

    await connection(table).insert(dados);
    const result =  await connection.select("*").from(table)
    return response.json(result); 

  } catch (error) {
    return response.json(error);
  }
}

export async function ListTable(request, response) {
  try {
    const result = await connection.select("*").from(view)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function UpdateTable(request, response) { 

  const updated_at = new Date();
  const user_updated = request.email 

  const id = request.body.id;
  const table_name_new = request.body.table_name_new
  
  const dados = {
    table_name: table_name_new,
    user_updated,
    updated_at
  }

  try {
    const resulFidOnTable = await connection.select("*").from(view).where('id', id).first()
    const bd = await connectionDataBase(resulFidOnTable.datname)
    if (await hasTable(resulFidOnTable.schema_name, resulFidOnTable.table_name, bd)) {
      const resultCreate = await bd.schema.withSchema(resulFidOnTable.schema_name).renameTable(resulFidOnTable.table_name, table_name_new )
      await connection(table).where('id', id).update(dados);
      const result = await connection.select("*").from(table)
      return response.json(result); 
    }
    else{
      return response.json(false);
    }
  } catch (error) {
    return response.json(error);
  }
}

export async function DeleteTable(request, response) { 
  const id = request.body.id;

  try {
    const row = await connection.select("*").from(view).where('id', id).first();
    if (!row) {
      return response.status(404).json({ error: 'Table not found' });
    }


    


    const bd = await connectionDataBase(row.datname);
    const resultDrop = await bd.schema.withSchema(row.schema_name).dropTableIfExists(row.table_name);
    if (!resultDrop) {
      return response.status(401).json({ error: 'Unauthorized to delete table' });
    }


    await connection("tbl_column").where('table_id_fk', row.id).del()
    await connection(table).where('id', id).del();
    const result = await connection.select("*").from(view);
    return response.json(result); 

  } catch (error) {
    console.log(error)
    return response.status(500).json({ error: 'An unexpected error occurred' });
  }
}



// export async function DeleteTable(request, response) { 
//   const id = request.body.id;

//   try {
//     const row = await connection.select("*").from(view).where('id', id).first();
//     if (!row) {
//       return response.status(404).json({ error: 'Table not found' });
//     }

//     const bd = await connectionDataBase(row.datname);
//     const resultDrop = await bd.schema.withSchema(row.schema_name).dropTableIfExists(row.table_name).onDelete('CASCADE');
//     if (!resultDrop) {
//       return response.status(401).json({ error: 'Unauthorized to delete table' });
//     }

//     await connection(table).where('id', id).onDelete("CASCADE")
//     const result = await connection.select("*").from(view);
//     return response.json(result); 

//   } catch (error) {
//     console.log(error)
//     return response.status(500).json({ error: 'An unexpected error occurred' });
//   }
// }
