import { Response } from "express";
import { ExtendedRequest } from "../../Middleware/auth";

import { executes, mapCtxOutput } from "../utils/utilsWork";
import { fn_full } from "../Function_Json/fn_adega"


type SchemaType = {
  nameVar: string;
  type: "static" | "dynamic";
  path: string;
  value: string;
}[];

function mapCtxVars(obj: any, schema: SchemaType) {
  const newObj = {};
  for (const s of schema) {
    let value = s.value;
    if (s.type === "dynamic") {
      value = obj;
      const pathParts = s.path.split(".");
      for (const part of pathParts) {
        value = value[part];
      }
    }
    newObj[s.nameVar] = value;
  }
  return newObj;
}

function addProperty(obj: any, property: string, value: any) {
  const properties = property.split('.');
  let currentObject = obj;
  for (let i = 0; i < properties.length - 1; i++) {
    if (!currentObject.hasOwnProperty(properties[i])) {
      currentObject[properties[i]] = {};
    }
    currentObject = currentObject[properties[i]];
  }
  currentObject[properties[properties.length - 1]] = value;
}






export async function WorkFlow(request: ExtendedRequest, response: Response) {


  // Insecto data out off
  const email = request.email 
  const body =  request.body
  const func =  request.params.func




  // Valida se a função exista
  const fn = fn_full[func]
  if(!fn){
    return response.json("Rota não localizada!")
  }




  // Context geral da função
  let ctx = {
    user: email,
    body: body,
    vars: mapCtxVars( {}, fn.fn_static_data ),
    process: {},
    outputs: {}
  }





  






  let count = 0
  let result = {}


  while(fn.fn_process.length > count){   

    const fn_process = fn.fn_process[count]

    // result = await executes(
    //   ctx,
    //   fn_process.process_slug, 
    //   fn_process.process_type_action, 
    //   fn_process.process,
    //   fn_process.process_is_have_condition,
    //   fn_process.process_conditions
    // )

    // ctx.fn_result_process[fn_process.process_slug] = result
   
    console.log(fn_process)

    count++

  }


  //map output state of the context
  // mapCtxOutput(fnc.fn_outputs, ctx)


  return response.json(ctx);
}








