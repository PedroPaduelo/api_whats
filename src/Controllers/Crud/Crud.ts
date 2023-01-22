import { connectionDataBase } from '../../server';



export async function Create(request, response) {

  const datname = request.body.datname
  const connection = await connectionDataBase(datname)

  const table = request.body.table

  const dados = {
    ...request.body.data
  }

  try {

    await connection(table).insert(dados);
    const result =  await connection.select("*").from(table)
    return response.json(result); 

  } catch (error) {
    // console.log(error);
    return response.json(error);
  }
}

export async function List(request, response) {
  const datname = request.body.datname
  const connection = await connectionDataBase(datname)
    if(!connection) return response.json("Base de dados não localizada!!!"); 

  const table = request.body.table
  try {
    const result = await connection.select("*").from(table)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function ListByCol(request, response) {
  const datname = request.body.datname
  const connection = await connectionDataBase(datname) 

  const table = request.body.table
  const colWhere = request.body.colWhere;  
  const colWhereValue = request.body.colWhereValue; 

  try {
    const result = await connection.select("*").from(table).where(colWhere, colWhereValue)
    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function Update(request, response) { 
  const datname = request.body.datname
  const connection = await connectionDataBase(datname) 

  const table = request.body.table
  const colWhere = request.body.colWhere;  
  const colWhereValue = request.body.colWhereValue; 


  const dados = {
    ...request.body.data
  }

  try {
    await connection(table).where(colWhere, colWhereValue).update(dados);
    const result = await connection.select("*").from(table)

    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}

export async function Delete(request, response) { 
  const datname = request.body.datname
  const connection = await connectionDataBase(datname) 

  const table = request.body.table
  const colWhere = request.body.colWhere;  
  const colWhereValue = request.body.colWhereValue; 

  try {
    await connection(table).where(colWhere, colWhereValue).del()
    const result = await connection.select("*").from(table)

    return response.json(result); 
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
}

