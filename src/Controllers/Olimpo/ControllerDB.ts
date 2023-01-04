
import { Knex } from "knex";
import connection from '../../Database/connection_bd_corer';
import { findColumns, findSchemas, findSchemasByDb, findTablesByDb, fullBD, hasColumn, hasTable, schemaColumn } from "../utils/utilsDB";



export async function CountIndexByDb(request, response) {
  const result =  await findSchemas();
  return response.json(result);
}
export async function ListSchemaByDb(request, response) {
  const result =  await findSchemasByDb();
  return response.json(result);
}
export async function ListTablesByDb(request, response) {
  const result =  await findTablesByDb();
  return response.json(result);
}


// Tables 
export async function CreatedTableByDbBySchema(request, response) {
  const schema_name = request.body.schema_name || "public";
  const table = request.body.table;

  try {
    const result = await connection.schema.withSchema(schema_name).createTable(table, 
      function (table: Knex.CreateTableBuilder) {
        table.increments();
        table.string('stages').notNullable().defaultTo('draft');
        table.string('user_created').notNullable();
        table.timestamp('created_at').notNullable();
        table.string('user_updated').notNullable();
        table.timestamp('updated_at').notNullable();
      })

    return response.json(result); 
  } 
  catch (error) {
    return response.json(error);
  }
}



export async function ListTablesByDbBySchema(request, response) {
  const schema_name = request.body.schema_name || "public";
  try {
    const result = await connection.raw(`
      SELECT 
        table_schema,
        table_name,
        table_type,
        pg_size_pretty(pg_total_relation_size(table_schema||'.'||table_name)) AS table_full_size
      FROM information_schema.tables
      where table_schema = ?
      order by table_name
    `, schema_name)
  
    return response.json(result.rows.map((row, i) => { 
      row.id = i + 1   
      return row   }
    )); 
  } catch (error) {
    return response.json(error);
  }
}
export async function UpdateTableByDbBySchema(request, response) {
  const schema_name = request.body.schema_name || "public";
  const table = request.body.table;
  const new_table = request.body.new_table;

  try {
    if (await hasTable(schema_name, table, "sdf")) {
      const result = await connection.schema.withSchema(schema_name).renameTable(table, new_table )
      return response.json(result); 
    }
    return response.json(false); 
  } catch (error) {
    return response.json(error);
  }
}
export async function DeletedTableByDbBySchema(request, response) {
  const schema_name = request.body.schema_name || "public";
  const table = request.body.table;

  try {
    const result = await connection.schema.withSchema(schema_name).dropTableIfExists(table)

    return response.json(result); 
  } 
  catch (error) {
    return response.json(error);
  }
}


// Columns 
export async function ListColumnsByTable(request, response) {
  const table = request.params.table;
  try {
    const result = await findColumns(table)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}
export async function CreatedColumnsByTable(request, response) {
  const schema_name = request.body.schema_name || "public";
  const table = request.body.table;
  const column = request.body.column;

  

  try {
    if (await hasTable(schema_name, table, "sdf")) {
      if (await hasColumn(schema_name, table, column.column_name, "sdf")) {
        return response.json("Column already exists");
      }else {
        const result = await connection.schema.withSchema(schema_name).table(table, function (table: Knex.CreateTableBuilder) {
          schemaColumn(table , column);
        })
        return response.json(result); 
      }
    }
    return response.json("Table not exists");
  } 
  catch (error) {
    console.log(error);
    return response.json(error);
  }
}
export async function RenameColumnsByTable(request, response) {
  const schema_name = request.body.schema_name || "public";
  const table = request.body.table;

  const column_name = request.body.column_name;
  const column_new_name = request.body.column_new_name;

  try {
    if (await hasTable( schema_name, table, "sdf")) {
      if (!await hasColumn(schema_name, table, column_name, "sdf")) {
        return response.json("Column not exists");
      }else {
        const result = await connection.schema.withSchema(schema_name).table(table, function (table: Knex.CreateTableBuilder) {
          table.renameColumn(column_name, column_new_name)
        })
        return response.json(result); 
      }
    }
    return response.json("Table not exists");
  } 
  catch (error) {
    return response.json(error);
  }
}
export async function DeletedColumnsByTable(request, response) {
  const schema_name = request.body.schema_name || "public";
  const table = request.body.table;
  const column_name = request.body.column_name;

  try {
    if (await hasTable( schema_name, table, "sdf")) {
      if (!await hasColumn(schema_name, table, column_name, "sdf")) {
        return response.json("Column not exists");
      }else {
        const result = await connection.schema.withSchema(schema_name).table(table, function (table: Knex.CreateTableBuilder) {
          table.dropColumn(column_name)
        })
        return response.json(result); 
      }
    }
    return response.json("Table not exists");
  } 
  catch (error) {
    return response.json(error);
  }
}




export async function actionFullBD(request, response){
  const table = request.body.table;
  const methods = request.body.methods;


  try {
    const result = await fullBD(methods, table)
    return response.json(result);
    
  } catch (error) {

    return ({
      status: "failed",
      data: error,
      message: "Erro ao executar Dados_Insert"
    });
  }
} 



































