import connection from '../../../Database/connection_bd_corer';
import { Knex } from "knex";
import { connectionDataBase, hasColumn, hasTable, schemaColumn } from '../../utils/utilsDB';

const table = "tbl_column"
const view = "view_column"
const view_table = "view_table"

export async function CreateColumn(request, response) {

  const created_at = new Date();
  const updated_at = new Date();

  const user_created = request.email 
  const user_updated = request.email 

  const table_id_fk = request.body.table_id_fk
  const column_name = request.body.column_name
  const data_type = request.body.data_type
  const column_default = request.body.column_default
  const is_nullable = request.body.is_nullable
  
  const dados = {
    ...request.body,
    user_created,
    created_at,
    user_updated,
    updated_at
  }



  try {
    const resulFidOnTable = await connection.select("*").from(view_table).where('id', table_id_fk).first()
    if(!resulFidOnTable) return false

    const bd = await connectionDataBase(resulFidOnTable.datname)
    if(!bd) return false

    if (await hasTable(resulFidOnTable.schema_name, resulFidOnTable.table_name, bd)) {
      if (await hasColumn(resulFidOnTable.schema_name, resulFidOnTable.table_name, column_name, bd)) {
        return response.json({
          name: "error",
          msg: "Column already exists"
        });
      }else {
        const resultCreate = await bd.schema.withSchema(resulFidOnTable.schema_name).table(resulFidOnTable.table_name, function (table: Knex.CreateTableBuilder) {
          schemaColumn(table , {
            column_name,
            data_type,
            column_default,
            is_nullable
          });
        })

        await connection(table).insert(dados);
        const result =  await connection.select("*").from(table).where("table_id_fk", table_id_fk)
        return response.json(result);
      }
    }

    return response.json(false);
  } catch (error) {
    console.log(error)
    return response.json(error);
  }
}

export async function ListColumn(request, response) {
  try {
    const result = await connection.select("*").from(table)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function ListColumnByTable(request, response) {
  const table_id_fk = request.params.id

  try {
    const result = await connection.select("*").from(table).where("table_id_fk", table_id_fk)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function UpdateColumn(request, response) { 

  
  const updated_at = new Date();
  const user_updated = request.email 

  const id = request.body.id;
  const column_name_new = request.body.column_name_new



  const dados = {
    column_name: column_name_new,
    updated_at,
    user_updated
  }

  
  try {
    const resulFidOnColumn = await connection.select("*").from(view).where('id', id).first()
    const bd = await connectionDataBase(resulFidOnColumn.datname)

    if (await hasTable( resulFidOnColumn.schema_name, resulFidOnColumn.table_name, bd)) {
      if (!await hasColumn(resulFidOnColumn.schema_name, resulFidOnColumn.table_name, resulFidOnColumn.column_name, bd)) {
        return response.json("Column not exists");
      }else {
        const resultAlter = await bd.schema.withSchema(resulFidOnColumn.schema_name).table(resulFidOnColumn.table_name, function (table: Knex.CreateTableBuilder) {
          table.renameColumn(resulFidOnColumn.column_name, column_name_new)
        })

        await connection(table).where('id', id).update(dados);
        const result = await connection.select("*").from(table)
        return response.json(result); 
      }
    }

    return response.json(false); 
  } catch (error) {
    console.log(error)
    return response.json(error);
  }
}

export async function DeleteColumn(request, response) { 
  
  const id = request.body.id;
  
  try {
    const resulFidOnColumn = await connection.select("*").from(view).where('id', id).first()
    const bd = await connectionDataBase(resulFidOnColumn.datname)

    if (await hasTable( resulFidOnColumn.schema_name, resulFidOnColumn.table_name, bd)) {
      if (!await hasColumn(resulFidOnColumn.schema_name, resulFidOnColumn.table_name, resulFidOnColumn.column_name, bd)) {
        return response.json("Column not exists");
      }else {
        const resultDrop = await bd.schema.withSchema(resulFidOnColumn.schema_name).table(resulFidOnColumn.table_name, function (table: Knex.CreateTableBuilder) {
          table.dropColumn(resulFidOnColumn.column_name)
        })

        await connection(table).where('id', id).del()
        const result = await connection.select("*").from(table).where("table_id_fk", resulFidOnColumn.table_id_fk)

        return response.json(result); 
      }
    }

    return response.json(false); 
  } catch (error) {
    return response.json(error);
  }
}


