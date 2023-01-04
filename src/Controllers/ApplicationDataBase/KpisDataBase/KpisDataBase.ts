import connection from '../../../Database/connection_bd_corer';






export async function KpisDataBase(request, response) {
  try {

    const tbl_data_base = await connection("tbl_data_base").count('* as total');
    const tbl_schema = await connection("tbl_schema").count('* as total');
    const tbl_table = await connection("tbl_table").count('* as total');

    const result = {
      tbl_data_base: tbl_data_base[0].total,
      tbl_schema: tbl_schema[0].total,
      tbl_table: tbl_table[0].total
    }

    return response.json(result); 
  } catch (error) {
    return response.json(error);
  }
}