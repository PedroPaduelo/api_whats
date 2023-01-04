import { executes, mapCtxOutput, mapCtxVars  } from "../utils/utilsWork";
import { fn_full } from "../Function_Json/fn_adega"



export async function WorkFlow(request, response) {


  // Insecto data out off
  const email = request.email 
  const body =  request.body

  const controller =  request.params.controller
  const route =  request.params.route


  // find func 
  const fn = fn_full[controller]
  if(!fn){
    return response.json("Rota não localizada!")
  }
  // find func 
  const fnc = fn.find(element => element.fn_slug == route)
  if(!fnc){
    return response.json("Rota não localizada!")
  }





  // Context geral da função
  let ctx = {
    fn_user: email,
    fn_body_api: body,
    fn_vars: {},
    fn_result_process: {},
    fn_outputs: {}
  }






  //map initial state of the context
  mapCtxVars(fnc.fn_static_data, ctx)


  let count = 0
  let result = {}
  while(fnc.fn_process.length > count){   

    const fn_process = fnc.fn_process[count]

    result = await executes(
      ctx,
      fn_process.process_slug, 
      fn_process.process_type_action, 
      fn_process.process,
      fn_process.process_is_have_condition,
      fn_process.process_conditions
    )

    ctx.fn_result_process[fn_process.process_slug] = result
   
    count++

  }


  //map output state of the context
  mapCtxOutput(fnc.fn_outputs, ctx)


  return response.json(ctx.fn_outputs);
}








