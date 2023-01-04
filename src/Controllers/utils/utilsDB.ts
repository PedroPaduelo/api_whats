import connection from '../../Database/connection_bd_corer';
import knex from 'knex';



let listConnectionsDatabase = []


export async function connectionDataBase( datname ){

  const connectionDatabase = listConnectionsDatabase.find( (e)=> e.datname === datname )

  if(!connectionDatabase){
    const connection = knex({
      client: 'pg',
      connection: {
        host :    process.env.PGHOST,
        port:     5800,
        database: datname,
        user:     process.env.PGUSER,
        password: process.env.PGPASSWORD
      },
      pool: { 
        min: 0,
        max: 50 
      },
      useNullAsDefault: true
    })

    listConnectionsDatabase.push({
      datname: datname,
      connection: connection
    })

    return connection
  }

  return connectionDatabase.connection
}









// Utility functions
export async function hasTable( schema_name: string, table_name: string, db): Promise<boolean>{
  return await db.schema.withSchema(schema_name).hasTable(table_name).then(function(exists) {
    if (exists) {
      return true
    }else{
      return false
    }
  });
}



export async function hasColumn(schema_name: string, table_name: string, column_name: string, db): Promise<boolean>{
  return  await db.schema.withSchema(schema_name).hasColumn(table_name, column_name).then(function(exists) {
    if (exists) {
      return true
    }else{
      return false
    }
  });
}
export function schemaColumn(table, column) {
  switch (column.data_type) {
    case 'string':
      table.string(column.column_name).defaultTo(column.column_default)
      break;
    case 'varchar':
      table.string(column.column_name)
      break;
    case 'integer':
      table.integer(column.column_name);
      break;
    case 'float':
      table.float(column.column_name, column.column_precision, column.column_scale)
      break;
    case 'boolean':
      table.boolean(column.column_name);
      break;
    case 'date':
      table.date(column.column_name);
      break;
    case 'timestamp':
      table.timestamp(column.column_name);
      break;
    case 'time':
      table.time(column.column_name);
      break;
    case 'text':
      table.text(column.column_name);
      break;
    case 'binary':
      table.binary(column.column_name);
      break;
    case 'json':
      table.json(column.column_name);
      break;
    case 'jsonb':
      table.jsonb(column.column_name);
      break;
    case 'uuid':
      table.uuid(column.column_name);
      break;
    default: 
      table.string(column.column_name);
      break;
  }

return "ok";
}



// Utility functions db.js file
export async function findSchemas() {
  const result = await connection.raw(
    ` select 
        *
      from (SELECT 
        1 as id,
        'BASE TABLE' as type,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size,
        count(*) as qtd
      FROM information_schema.tables WHERE table_type = 'BASE TABLE'
      
      union
      
      SELECT 
        2 as id,
        'VIEW' as type,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size,
        count(*) as qtd
      FROM information_schema.tables WHERE  table_type = 'VIEW'
      
      union
      
      SELECT 
        3 as id,
        'TOTAL' as type,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size,
        count(*) as qtd
      FROM information_schema.tables) as temp_index
      order by 1 
    `
  )
  return result.rows;
}
export async function findSchemasByDb() {
  try {
    const result = await connection.raw(`
      SELECT 
        table_schema,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = a.table_schema and table_type = 'BASE TABLE') as qtd_tables,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = a.table_schema and table_type = 'VIEW') as qtd_views,
        pg_size_pretty(sum(pg_total_relation_size(table_schema||'.'||table_name))) AS table_full_size
      FROM information_schema.tables a
        left join pg_catalog.pg_namespace on table_schema = nspname
        where table_schema not in ('pg_catalog', '_timescaledb_catalog', '_timescaledb_internal', 'timescaledb_information', 'information_schema', '_timescaledb_cache', '_timescaledb_config')
      group by 1,2;
    `)  
    return result.rows
  } catch (error) {
    return error
  }
}
export async function findTablesByDb() {

  try {
    const result = await connection.raw(`
      SELECT 
        table_schema,
        table_name,
        table_type,
        pg_size_pretty(pg_total_relation_size(table_schema||'.'||table_name)) AS table_full_size
      FROM information_schema.tables
      where table_schema <> 'information_schema' and table_schema <> 'pg_catalog'
      order by table_type, table_schema, table_name
    `) 
    return result.rows
  } catch (error) {
    return error
  }
}
export async function findColumns(table_name: string) {
  const result = await connection.raw(
    `select 
      table_catalog,
      table_schema,
      table_name,
      column_name,
      ordinal_position,
      column_default,
      is_nullable,
      data_type,
      character_maximum_length
    from information_schema.columns 
    where table_name = '${table_name}' and table_schema <> 'information_schema' and table_schema <> 'pg_catalog'
    order by ordinal_position;
    `
  )
  return result.rows;
}



















export async function insert(datname: string, table: string, dados){
  const bd = await connectionDataBase(datname)
    if(!bd) return false

  try {
    const [id] = await bd(table).insert(dados, ['id']);

    const result = {
      ...id, 
      ...dados
    }

    return {
      result,
      status: "success"
    }
  } catch (error) {
    console.log(error)
    return {
      
      error: error,
      status: "failed"
    }
  }
}
export async function upData(table: string, col: string, col_value: string, dados: object) {
  try {
    const result = await connection(table).where(col, col_value).update(dados);
    return {
      result,
      status: "success"
    }
  } catch (error) {
    return {
      error: error,
      status: "failed"
    }
  }
}
export async function indexFull( datname: string, table: string, cols: string[]){
  const bd = await connectionDataBase(datname)
    if(!bd) return false

    

  try {
    const result = await bd.select(cols).from(table)
    return {
      result,
      status: "success"
    }
  } catch (error) {
    return {
      error: error,
      status: "failed"
    }
  }
}
export async function findOnByCol(table: string, col: string, col_value: string,  cols: string[]){
  try {
  const result = await connection.select(cols).from(table).where(col, col_value).first()
    return {
      result,
      status: "success"
    }
  } catch (error) {
    return {
      error: error,
      status: "failed"
    }
  }
}
export async function deleteByCol(table: string,  col: string, col_value: string,) {
  try {
    const result = await connection(table).where(col, col_value).del()
    return {
      result,
      status: "success"
    }
  } catch (error) {
    return {
      error: error,
      status: "failed"
    }
  }

}
export async function fullBD(methods: any, table: string) {

  try {

    let result = connection(table)

    methods.forEach((method) => {

      switch (method.method) {

        case "insert":
          result = result[method.method](method.argumentos)
          break;

        case "del":
          result = result[method.method]()
          break;

        case "selectRaw":
          result = result['select'](connection.raw(method.argumentos[0]))
          break;

        default:
          result = result[method.method](...method.argumentos)
          break;

      }
    });


    const teste =  Promise.resolve(result).then((values) => {
      return values
    });
    
    return teste

  } catch (error) {
    return {
      error: error,
      status: "failed"
    }
  }
}




























export async function fullBD_T(methods: any, table: string) {

  try {
    let result 
  

 

    // result =  await connection.raw(`
    //   select *

    //   from(
    //     select *,
    //     (select json_agg(itens)
    //     from tbl_ad_itens_venda as  itens
    //     where itens.id_venda = a.id
    //   ) as itenss

    //   from tbl_ad_vendas as a) vendas

    // `)





  //   result = await pool.query(`
  //   select *

  //   from(
  //     select *,
  //     (select json_agg(itens)
  //     from tbl_ad_itens_venda as  itens
  //     where itens.id_venda = a.id
  //   ) as itenss

  //   from tbl_ad_vendas as a) vendas
  //  -- where created_at > '2022-06-01'

  // `,[]);









  //  result =  await connection("tbl_ad_vendas")
  // .selectRaw("row_to_json(art)")
  // .whereRaw('?? = ??', ['a.id', 'b.id_venda'])
  // .jsonSet('aTitle', "$.name", 'newName', 'newNameCol')




  //  result =  await connection.select('*')
  // .from('tbl_ad_vendas')

  // .on('query', function(data) {
  //   // console.log(data);
  // })
  // .on('query-response', function(response, obj, builder) {
  //   // console.log(response);
  //   // console.log(obj);
  //   console.log(builder);
  // })

  // .then(function(data) {
  //   return data
  // });

  // return Promise.resolve(result).then((values) => {
  //   return values
  // });





    // let result = await connection(table)



    // const ttt =  result.map( async(i )=>{
    //   console.log(i)
    //   const item = await connection.select('*')
    //                 .from('tbl_ad_itens_venda')
    //                 .where('id_venda', i.id)

    //   console.log(item)     
    //   i["item"] = item

    //   return i
    // })
      

    // const tt =  await connection.withRecursive('tbl_ad_vendas', (qb) => {
     

    //   qb.select('*')
    //     .from('tbl_ad_vendas')
    //     .union((qb) => {
    //       console.log(qb)
          // qb.select('*')
          //   .from('tbl_ad_itens_venda')
    //     })
    // })
    // .select('*')
    // .from('tbl_ad_vendas')





    // const tt =  await connection.withRecursive('tbl_ad_vendas', (qb) => {
    //   qb.select('*')
    //     .from('tbl_ad_itens_venda')
    // })
    // .select('*')
    // .from('tbl_ad_vendas')
    

    // return Promise.resolve(ttt).then((values) => {
    //   return values
    // });


    
    return result


  } catch (error) {
    console.log(error);
    return error
  }
}
export async function List_Full_By_Col(table: string, col: string, col_value: number) {
  try {
    const result = await connection.select("*")
      .from(table)
      .where(col, col_value)
      .orderBy(col);

    return ({
      status: "success",
      result: result,
      message: "success ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
export async function List_Full_By_Col_on(table: string, col: string, col_value: number) {
  try {
    const result = await connection.select("*")
      .from(table)
      .where(col, col_value)
      .orderBy(col)

    return ({
      status: "success",
      result: result[0],
      message: "success ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
export async function Get_By_Id(table: string, id: number) {

  try {
    const result = await connection(table).where('id', id).first();

    if (result) {
      return ({
        status: "success",
        result: result,
        message: "Informação localizada!!!"
      }); 
    }
    else{
      return({
        status: "failed",
        result: {},
        message: "Informação não localizado!!!"
      }); 
    } 

  } catch (error) {

    return ({
      status: "failed",
      result: error,
      message: "Erro ao localizar informação"
    });
  }
}
export async function List_Full(table: string) {

  try {
    const result = await connection.select("*").from(table)

    return ({
      status: "success",
      result: result,
      message: "success ao listar!!!"
    }); 
  } catch (error) {
    console.log(error);
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
export async function List_Full_By_User_Creating(table: string, user_created: string) {

  try {
    const result = await connection.select("*")
      .from(table)
      .where('user_created', user_created)
      .orderBy('id');

    return ({
      status: "success",
      result: result,
      message: "success ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
export async function List_Full_raw(table: string) {

  try {
  const result = await connection.raw(`select * from ${table}`)
    return ({
            status: "success",
            result: result,
            message: "success ao listar!!!"
    }); 
  } catch (error) {
    console.log(error);
    return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
    });
  }
}







