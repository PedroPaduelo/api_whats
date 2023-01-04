

export const criar_tbl_ad_dp_marcas_de_produtos = {
  id: 1,
  fn_name: "Criar marcas de produtos",
  fn_slug: "criar_tbl_ad_dp_marcas_de_produtos",
  fn_type: "DB-INSERT",

  fn_static_data: [
    {
      nameVar: "id",
      type: "static",
      path: "",
      value: "Teste static values"
    }
  ],

  fn_process: [

    {
      process_is_have_condition: false,
      process_conditions: [
      ],

      process_title: "Criar marcas de produtos",
      process_slug: "criar_tbl_ad_dp_marcas_de_produtos",

      process_type_action: "actionInsert",

      process: {
        dataBase: "adega",
        table: "adega_core.tbl_ad_dp_marcas_de_produtos",

        data: [

          {
            nameVar: "descri_marca",
            type: "dynamic",
            path: "fn_body_api.descri_marca",
            value: ""
          },
          {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        ]

      }
  
    },

    {
      process_is_have_condition: false,
      process_conditions: [
        {
          primeiro: {
            nameVar: "status",
            type: "dynamic",
            type_var: "string",
            path: "fn_result_process.criar_tbl_ad_dp_marcas_de_produtos.status",
            value: ""
          },
          sinal: "!==",
          segundo: {
            nameVar: "validador_status",
            type: "static",
            type_var: "string",
            path: "",
            value: "error"
          }
        },
      ],

      process_title: "Lista marcas de produtos",
      process_slug: "list_dp_marcas_de_produtos",

      process_type_action: "actionListFull",

      process: {
        dataBase: "adega",
        table: "adega_core.tbl_ad_dp_marcas_de_produtos",

        cols: [
          "id",
          "descri_marca"
        ]

      }
    } 

  ],

  fn_outputs: [

    {
      nameVar: "list_dp_marcas_de_produtos",
      type: "dynamic",
      path: "fn_result_process.criar_tbl_ad_dp_marcas_de_produtos",
      value: ""
    }

  ]
}





















export const fn_marcas_de_produtos = [

  // Cria
  {
    id: 1,
    fn_name: "Criar marcas de produtos",
    fn_slug: "criar_tbl_ad_dp_marcas_de_produtos",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [


      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar marcas de produtos",
        process_slug: "criar_tbl_ad_dp_marcas_de_produtos",

        process_type_action: "actionInsert",

        process: {
          dataBase: "adega",
          table: "adega_core.tbl_ad_dp_marcas_de_produtos",

          data: [

            {
              nameVar: "descri_marca",
              type: "dynamic",
              path: "fn_body_api.descri_marca",
              value: ""
            },
            {
              nameVar: "id",
              type: "dynamic",
              path: "fn_body_api.id",
              value: ""
            }

          ]

        }
    
      },

      {
        process_is_have_condition: false,
        process_conditions: [
          {
            primeiro: {
              nameVar: "status",
              type: "dynamic",
              type_var: "string",
              path: "fn_result_process.criar_tbl_ad_dp_marcas_de_produtos.status",
              value: ""
            },
            sinal: "!==",
            segundo: {
              nameVar: "validador_status",
              type: "static",
              type_var: "string",
              path: "",
              value: "error"
            }
          },
        ],

        process_title: "Lista marcas de produtos",
        process_slug: "list_dp_marcas_de_produtos",

        process_type_action: "actionListFull",

        process: {
          dataBase: "adega",
          table: "adega_core.tbl_ad_dp_marcas_de_produtos",

          cols: [
            "id",
            "descri_marca"
          ]

        }
      } 

    ],

    fn_outputs: [

      {
        nameVar: "list_dp_marcas_de_produtos",
        type: "dynamic",
        path: "fn_result_process.criar_tbl_ad_dp_marcas_de_produtos",
        value: ""
      }

    ]
  },
  
  // Lista
  {
    id: 3,
    fn_name: "Lista fornecedor de produtos",
    fn_slug: "list_dp_marcas_de_produtos",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista marcas de produtos",
        process_slug: "list_dp_marcas_de_produtos",

        process_type_action: "actionListFull",

        process: {
          dataBase: "adega",
          table: "adega_core.tbl_ad_dp_marcas_de_produtos",

          cols: [
            "id",
            "descri_marca"
          ]

        }
      }
      
    ],


    fn_outputs: [

      {
        nameVar: "list_dp_marcas_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_marcas_de_produtos.process_result",
        value: ""
      }

    ]
  },


  // Encontra um
  {
    id: 4,
    fn_name: "Busca um marcas de produtos",
    fn_slug: "find_on_dp_marcas_de_produtos",
    fn_type: "DB-LIST-ON",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Busca um marcas de produtos",
        process_slug: "find_on_dp_marcas_de_produtos",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_dp_marcas_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

          cols: [
            "id",
            "descri_marca"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_marcas_de_produtos",
        type: "dynamic",
        path: "fn_result_process.find_on_dp_marcas_de_produtos",
        value: ""
      }

    ]
  },

  // deleta venda cascaded
  {
    id: 5,
    fn_name: "Deleta marcas de produtos",
    fn_slug: "delete_dp_marcas_de_produtos",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      // deleta venda
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta marcas de produtos",
        process_slug: "delete_dp_marcas_de_produtos",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_dp_marcas_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      // Lista vendas
      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista marcas de produtos",
        process_slug: "list_dp_marcas_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_marcas_de_produtos",

          cols: [
            "id",
            "descri_marca"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_marcas_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_marcas_de_produtos",
        value: ""
      }

    ]
  }

]

export const fn_fornecedor_de_produtos = [

  // Cria
  {
    id: 1,
    fn_name: "Criar fornecedor de produtos",
    fn_slug: "criar_tbl_ad_dp_fornecedor_de_produtos",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar fornecedor de produtos",
        process_slug: "criar_tbl_ad_dp_fornecedor_de_produtos",

        process_type_action: "actionInsert",

        process: {
          table: "tbl_ad_dp_fornecedor_de_produtos",

          data: [

            {
              nameVar: "descri_fornecedor",
              type: "dynamic",
              path: "fn_body_api.descri_fornecedor",
              value: ""
            }

          ]

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista categorias do produtos",
        process_slug: "list_dp_fornecedor_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_fornecedor_de_produtos",

          cols: [
            "id",
            "descri_fornecedor"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_fornecedor_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_fornecedor_de_produtos",
        value: ""
      }

    ]
  },

  // Lista
  {
    id: 3,
    fn_name: "Lista fornecedor de produtos",
    fn_slug: "list_dp_fornecedor_de_produtos",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista fornecedor de produtos",
        process_slug: "list_dp_fornecedor_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_fornecedor_de_produtos",

          cols: [
            "id",
            "descri_fornecedor"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_fornecedor_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_fornecedor_de_produtos",
        value: ""
      }

    ]
  },

  // Encontra um
  {
    id: 4,
    fn_name: "Busca um fornecedor de produtos",
    fn_slug: "find_on_dp_fornecedor_de_produtos",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Busca um fornecedor de produtos",
        process_slug: "find_on_dp_fornecedor_de_produtos",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_dp_fornecedor_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

          cols: [
            "id",
            "descri_fornecedor"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_fornecedor_de_produtos",
        type: "dynamic",
        path: "fn_result_process.find_on_dp_fornecedor_de_produtos",
        value: ""
      }

    ]
  },

  // deleta venda cascaded
  {
    id: 5,
    fn_name: "Deleta fornecedor de produtos",
    fn_slug: "delete_dp_fornecedor_de_produtos",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      // deleta venda
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta fornecedor de produtos",
        process_slug: "delete_dp_fornecedor_de_produtos",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_dp_fornecedor_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      // Lista vendas
      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista dp_categorias_de_produtos",
        process_slug: "list_dp_categorias_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_fornecedor_de_produtos",

          cols: [
            "id",
            "descri_fornecedor"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_fornecedor_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_categorias_de_produtos",
        value: ""
      }

    ]
  }
]

export const fn_categorias_de_produtos = [

  // Cria
  {
    id: 1,
    fn_name: "Criar categorias do produtos",
    fn_slug: "criar_categorias_de_produtos",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar venda",
        process_slug: "criar_categorias_de_produtos",

        process_type_action: "actionInsert",

        process: {
          table: "tbl_ad_dp_categorias_de_produtos",

          data: [

            {
              nameVar: "descri_categoria",
              type: "dynamic",
              path: "fn_body_api.descri_categoria",
              value: ""
            }

          ]

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista categorias do produtos",
        process_slug: "list_dp_categorias_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_categorias_de_produtos",

          cols: [
            "id",
            "descri_categoria"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_categorias_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_categorias_de_produtos",
        value: ""
      }

    ]
  },

  // Lista
  {
    id: 3,
    fn_name: "Lista categorias do produtos",
    fn_slug: "list_dp_categorias_de_produtos",
    fn_type: "DB-LIST",

    fn_static_data: [

      // {
      //   nameVar: "id",
      //   type: "static",
      //   path: "",
      //   value: "Teste static values"
      // }

    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista categorias do produtos",
        process_slug: "list_dp_categorias_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_categorias_de_produtos",

          cols: [
            "id",
            "descri_categoria"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_categorias_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_categorias_de_produtos",
        value: ""
      }

    ]
  },

  // Encontra um
  {
    id: 4,
    fn_name: "Busca uma categoria do produtos",
    fn_slug: "find_on_dp_categorias_de_produtos",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Busca uma categoria do produtos",
        process_slug: "find_on_dp_categorias_de_produtos",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_dp_categorias_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

          cols: [
            "id",
            "descri_categoria"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_categorias_de_produtos",
        type: "dynamic",
        path: "fn_result_process.find_on_dp_categorias_de_produtos",
        value: ""
      }

    ]
  },

  // deleta venda cascaded
  {
    id: 5,
    fn_name: "Deleta categoria do produtos",
    fn_slug: "delete_dp_categorias_de_produtos",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      // deleta venda
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta categoria do produtos",
        process_slug: "delete_dp_categorias_de_produtos",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_dp_categorias_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      // Lista vendas
      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista dp_categorias_de_produtos",
        process_slug: "list_dp_categorias_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_categorias_de_produtos",

          cols: [
            "id",
            "descri_categoria"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_categorias_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_categorias_de_produtos",
        value: ""
      }

    ]
  }
]

export const fn_vendas = [

  // Cria
  {
    id: 1,
    fn_name: "Criar venda",
    fn_slug: "criar_venda",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar venda",
        process_slug: "criar_venda",

        process_type_action: "actionInsert",

        process: {
          table: "tbl_ad_vendas",

          data: [
            {
              nameVar: "tipo",
              type: "dynamic",
              path: "fn_body_api.tipo",
              value: ""
            },

            {
              nameVar: "preco_final",
              type: "dynamic",
              path: "fn_body_api.preco_final",
              value: ""
            },

            {
              nameVar: "id_cliente",
              type: "dynamic",
              path: "fn_body_api.id_cliente",
              value: ""
            },

            {
              nameVar: "status_caixa",
              type: "dynamic",
              path: "fn_body_api.status_caixa",
              value: ""
            },

            {
              nameVar: "referencia_externa",
              type: "dynamic",
              path: "fn_body_api.referencia_externa",
              value: ""
            },

            {
              nameVar: "desconto",
              type: "dynamic",
              path: "fn_body_api.desconto",
              value: ""
            },

            {
              nameVar: "preco_de_custo",
              type: "dynamic",
              path: "fn_body_api.preco_de_custo",
              value: ""
            },

            {
              nameVar: "markup_medio",
              type: "dynamic",
              path: "fn_body_api.markup_medio",
              value: ""
            },

            {
              nameVar: "qtd_itens",
              type: "dynamic",
              path: "fn_body_api.qtd_itens",
              value: ""
            }

          ]

        }

      },

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista venda",
        process_slug: "list_venda",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_vendas",

          cols: [
            "id",
            "tipo",
            "preco_final",
            "id_cliente",
            "status_caixa",
            "referencia_externa",
            "desconto",
            "preco_de_custo",
            "markup_medio",
            "qtd_itens"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_vendas",
        type: "dynamic",
        path: "fn_result_process.list_venda",
        value: ""
      }

    ]
  },

  // Lista
  {
    id: 3,
    fn_name: "Lista venda",
    fn_slug: "list_venda",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista venda",
        process_slug: "list_venda",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_vendas",

          cols: [
            "id",
            "tipo",
            "preco_final",
            "id_cliente",
            "status_caixa",
            "referencia_externa",
            "desconto",
            "preco_de_custo",
            "markup_medio",
            "qtd_itens"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_vendas",
        type: "dynamic",
        path: "fn_result_process.list_venda",
        value: ""
      }

    ]
  },

  // Encontra um
  {
    id: 4,
    fn_name: "Busca uma venda",
    fn_slug: "find_on_venda",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Encontrar um caixa",
        process_slug: "find_on_venda",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_vendas",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

           cols: [
            "id",
            "tipo",
            "preco_final",
            "id_cliente",
            "status_caixa",
            "referencia_externa",
            "desconto",
            "preco_de_custo",
            "markup_medio",
            "qtd_itens"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_vendas",
        type: "dynamic",
        path: "fn_result_process.find_on_venda",
        value: ""
      }

    ]
  },

  // deleta venda cascaded
  {
    id: 5,
    fn_name: "Deleta venda",
    fn_slug: "delete_registro_venda",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      // deleta meio de pagamento
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta meio de pagamento venda",
        process_slug: "delete_meio_de_pagamento",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_meios_de_pagamentos",

          col: "id_venda", 

          col_value: {
            nameVar: "id_venda",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      // deleta itens da venda
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta itens da venda",
        process_slug: "delete_itens_venda",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_itens_venda",

          col: "id_venda", 

          col_value: {
            nameVar: "id_venda",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      // deleta venda
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta uma venda",
        process_slug: "delete_registro_venda",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_vendas",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      // Lista vendas
      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista venda",
        process_slug: "list_venda",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_vendas",

          cols: [
            "id",
            "tipo",
            "preco_final",
            "id_cliente",
            "status_caixa",
            "referencia_externa",
            "desconto",
            "preco_de_custo",
            "markup_medio",
            "qtd_itens"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_vendas",
        type: "dynamic",
        path: "fn_result_process.list_venda",
        value: ""
      }

    ]
  }
]

export const fn_caixa = [

  // Cria
  {
    id: 1,
    fn_name: "Criar caixa",
    fn_slug: "criar_caixa",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar caixa",
        process_slug: "criar_caixa",

        process_type_action: "actionInsert",

        process: {
          table: "tbl_ad_caixa",

          data: [
            {
              nameVar: "referencia_externa",
              type: "dynamic",
              path: "fn_body_api.referencia_externa",
              value: ""
            },

            {
              nameVar: "tipo",
              type: "dynamic",
              path: "fn_body_api.tipo",
              value: ""
            },

            {
              nameVar: "valor",
              type: "dynamic",
              path: "fn_body_api.valor",
              value: ""
            },

            {
              nameVar: "obs",
              type: "dynamic",
              path: "fn_body_api.obs",
              value: ""
            }

          ]

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Caixa",
        process_slug: "list_caixa",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_caixa",

          cols: [
            "id",
            "referencia_externa",
            "tipo",
            "valor",
            "obs"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_caixa",
        type: "dynamic",
        path: "fn_result_process.list_caixa",
        value: ""
      }

    ]
  },

  // Lista
  {
    id: 3,
    fn_name: "Lista Caixa",
    fn_slug: "list_caixa",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Caixa",
        process_slug: "list_caixa",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_caixa",

          cols: [
            "id",
            "referencia_externa",
            "tipo",
            "valor",
            "obs"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_caixa",
        type: "dynamic",
        path: "fn_result_process.list_caixa",
        value: ""
      }

    ]
  },

  // Encontra um
  {
    id: 4,
    fn_name: "Busca um caixa",
    fn_slug: "find_on_caixa",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Encontrar um caixa",
        process_slug: "find_on_caixa",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_caixa",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

           cols: [
            "id",
            "referencia_externa",
            "tipo",
            "valor",
            "obs"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_caixa",
        type: "dynamic",
        path: "fn_result_process.find_on_caixa",
        value: ""
      }

    ]
  },

  // deleta por uma coluna
  {
    id: 5,
    fn_name: "Deleta",
    fn_slug: "delete_registro_caixa",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta um Cliente",
        process_slug: "delete_registro_caixa",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_caixa",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Caixa",
        process_slug: "list_caixa",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_caixa",

          cols: [
            "id",
            "referencia_externa",
            "tipo",
            "valor",
            "obs"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_caixa",
        type: "dynamic",
        path: "fn_result_process.list_caixa",
        value: ""
      }

    ]
  }
]

export const fn_crediarios = [
  // Cria
  {
    id: 1,
    fn_name: "Criar Pagamento de Crediario",
    fn_slug: "criar_pg_crediario",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar Pagamento de Crediario",
        process_slug: "criar_pg_crediario",

        process_type_action: "actionInsert",

        process: {
          table: "tbl_ad_crediarios_pagos",

          data: [
            {
              nameVar: "id_cliente",
              type: "dynamic",
              path: "fn_body_api.id_cliente",
              value: ""
            },

            {
              nameVar: "valor_pago",
              type: "dynamic",
              path: "fn_body_api.valor_pago",
              value: ""
            },

            {
              nameVar: "meio_pagto",
              type: "dynamic",
              path: "fn_body_api.meio_pagto",
              value: ""
            },

            {
              nameVar: "referencia_externa",
              type: "dynamic",
              path: "fn_body_api.referencia_externa",
              value: ""
            },

            {
              nameVar: "tipo_de_lancamento",
              type: "dynamic",
              path: "fn_body_api.tipo_de_lancamento",
              value: ""
            }

          ]

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Crediarios",
        process_slug: "list_crediarios",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_crediarios_pagos",

          cols: [
            "id",
            "id_cliente",
            "valor_pago",
            "meio_pagto",
            "referencia_externa",
            "tipo_de_lancamento"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_crediarios_pagos",
        type: "dynamic",
        path: "fn_result_process.list_crediarios",
        value: ""
      }

    ]
  },

  // Lista
  {
    id: 3,
    fn_name: "Lista Crediarios",
    fn_slug: "list_crediarios",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Crediarios",
        process_slug: "list_crediarios",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_crediarios_pagos",

          cols: [
            "id",
            "id_cliente",
            "valor_pago",
            "meio_pagto",
            "referencia_externa",
            "tipo_de_lancamento"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_crediarios_pagos",
        type: "dynamic",
        path: "fn_result_process.list_crediarios",
        value: ""
      }

    ]
  },

  // Encontra um
  {
    id: 4,
    fn_name: "Busca um Crediarios",
    fn_slug: "find_on_crediarios",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Encontrar um crediarios",
        process_slug: "find_on_crediarios",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_crediarios_pagos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

          cols: [
            "id",
            "id_cliente",
            "valor_pago",
            "meio_pagto",
            "referencia_externa",
            "tipo_de_lancamento"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_clientes",
        type: "dynamic",
        path: "fn_result_process.find_on_crediarios",
        value: ""
      }

    ]
  },

  // deleta por uma coluna
  {
    id: 5,
    fn_name: "Deleta",
    fn_slug: "delete_registro_crediario",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta um Cliente",
        process_slug: "delete_registro_crediario",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_crediarios_pagos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Crediarios",
        process_slug: "list_crediarios",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_crediarios_pagos",

          cols: [
            "id",
            "id_cliente",
            "valor_pago",
            "meio_pagto",
            "referencia_externa",
            "tipo_de_lancamento"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_crediarios_pagos",
        type: "dynamic",
        path: "fn_result_process.list_crediarios",
        value: ""
      }

    ]
  }
]

export const fn_clientes = [
  // Cria
  {
    id: 1,
    fn_name: "Criar Cliente",
    fn_slug: "criar_cliente",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar Cliente",
        process_slug: "criar_cliente",

        process_type_action: "actionInsert",

        process: {
          table: "tbl_ad_clientes",

          data: [
            {
              nameVar: "nome",
              type: "dynamic",
              path: "fn_body_api.nome",
              value: ""
            },

            {
              nameVar: "telefone_whats",
              type: "dynamic",
              path: "fn_body_api.telefone_whats",
              value: ""
            },

            {
              nameVar: "cep",
              type: "dynamic",
              path: "fn_body_api.cep",
              value: ""
            },

            {
              nameVar: "rua",
              type: "dynamic",
              path: "fn_body_api.rua",
              value: ""
            },

            {
              nameVar: "bairro",
              type: "dynamic",
              path: "fn_body_api.bairro",
              value: ""
            },

            {
              nameVar: "cidade",
              type: "dynamic",
              path: "fn_body_api.cidade",
              value: ""
            },

            {
              nameVar: "numero",
              type: "dynamic",
              path: "fn_body_api.numero",
              value: ""
            },

            {
              nameVar: "uf",
              type: "dynamic",
              path: "fn_body_api.uf",
              value: ""
            },

            {
              nameVar: "avatar",
              type: "dynamic",
              path: "fn_body_api.avatar",
              value: ""
            }

          ]

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Clientes",
        process_slug: "list_clientes",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_clientes",

          cols: [
            "id",
            "nome",
            "telefone_whats",
            "cep",
            "rua",
            "bairro",
            "cidade",
            "numero",
            "uf",
            "avatar"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_clientes",
        type: "dynamic",
        path: "fn_result_process.list_clientes",
        value: ""
      }

    ]
  },

  // Atualiza
  {
    id: 2,
    fn_name: "Atualizar Cliente",
    fn_slug: "up_data_cliente",
    fn_type: "DB-UPDATA",

    fn_static_data: [
    ],

    fn_process: [
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Atualizar Cliente",
        process_slug: "up_data_cliente",

        process_type_action: "actionUpData",

        process: {
          table: "tbl_ad_clientes",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

          data: [
            {
              nameVar: "nome",
              type: "dynamic",
              path: "fn_body_api.nome",
              value: ""
            },

            {
              nameVar: "telefone_whats",
              type: "dynamic",
              path: "fn_body_api.telefone_whats",
              value: ""
            },

            {
              nameVar: "cep",
              type: "dynamic",
              path: "fn_body_api.cep",
              value: ""
            },

            {
              nameVar: "rua",
              type: "dynamic",
              path: "fn_body_api.rua",
              value: ""
            },

            {
              nameVar: "bairro",
              type: "dynamic",
              path: "fn_body_api.bairro",
              value: ""
            },

            {
              nameVar: "cidade",
              type: "dynamic",
              path: "fn_body_api.cidade",
              value: ""
            },

            {
              nameVar: "numero",
              type: "dynamic",
              path: "fn_body_api.numero",
              value: ""
            },

            {
              nameVar: "uf",
              type: "dynamic",
              path: "fn_body_api.uf",
              value: ""
            },

            {
              nameVar: "avatar",
              type: "dynamic",
              path: "fn_body_api.avatar",
              value: ""
            }

          ]

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Clientes",
        process_slug: "list_clientes",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_clientes",

          cols: [
            "id",
            "nome",
            "telefone_whats",
            "cep",
            "rua",
            "bairro",
            "cidade",
            "numero",
            "uf",
            "avatar"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_produtos",
        type: "dynamic",
        path: "fn_result_process.list_clientes",
        value: ""
      }

    ]
  },

  // Lista
  {
    id: 3,
    fn_name: "Lista Clientes",
    fn_slug: "list_clientes",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Clientes",
        process_slug: "list_clientes",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_clientes",

          cols: [
            "id",
            "nome",
            "telefone_whats",
            "cep",
            "rua",
            "bairro",
            "cidade",
            "numero",
            "uf",
            "avatar"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_clientes",
        type: "dynamic",
        path: "fn_result_process.list_clientes",
        value: ""
      }

    ]
  },

  // Encontra um
  {
    id: 4,
    fn_name: "Busca um cliente",
    fn_slug: "find_on_cliente",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Encontrar um Registro",
        process_slug: "find_on_cliente",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_clientes",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

          cols: [
            "id",
            "nome",
            "telefone_whats",
            "cep",
            "rua",
            "bairro",
            "cidade",
            "numero",
            "uf",
            "avatar"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_clientes",
        type: "dynamic",
        path: "fn_result_process.find_on_cliente",
        value: ""
      }

    ]
  },

  // deleta por uma coluna
  {
    id: 5,
    fn_name: "Deleta",
    fn_slug: "delete_registro_cliente",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta um Cliente",
        process_slug: "delete_registro",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_clientes",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Lista Clientes",
        process_slug: "list_clientes",

        process_type_action: "actionListFull",

        process: {
          table: "tbl_ad_clientes",

          cols: [
            "id",
            "nome",
            "telefone_whats",
            "cep",
            "rua",
            "bairro",
            "cidade",
            "numero",
            "uf",
            "avatar"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_clientes",
        type: "dynamic",
        path: "fn_result_process.list_clientes",
        value: ""
      }

    ]
  }
]

export const fn_produtos = [
    // Cria
    {
      id: 1,
      fn_name: "Criar Produto",
      fn_slug: "criar_produto",
      fn_type: "DB-INSERT",

      fn_static_data: [
      ],

      fn_process: [

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Criar Produto",
          process_slug: "criar_produto",

          process_type_action: "actionInsert",

          process: {
            table: "tbl_ad_produtos",

            data: [
              {
                nameVar: "descricao_prod",
                type: "dynamic",
                path: "fn_body_api.descricao_prod",
                value: ""
              },

              {
                nameVar: "descricao_prod_lowercase",
                type: "dynamic",
                path: "fn_body_api.descricao_prod_lowercase",
                value: ""
              },

              {
                nameVar: "codigo_de_barras",
                type: "dynamic",
                path: "fn_body_api.codigo_de_barras",
                value: ""
              },

              {
                nameVar: "categorias",
                type: "dynamic",
                path: "fn_body_api.categorias",
                value: ""
              },

              {
                nameVar: "marca",
                type: "dynamic",
                path: "fn_body_api.marca",
                value: ""
              },

              {
                nameVar: "preco_de_custo",
                type: "dynamic",
                path: "fn_body_api.preco_de_custo",
                value: ""
              },

              {
                nameVar: "preco_de_venda",
                type: "dynamic",
                path: "fn_body_api.preco_de_venda",
                value: ""
              },

              {
                nameVar: "unidade",
                type: "dynamic",
                path: "fn_body_api.unidade",
                value: ""
              },

              {
                nameVar: "fornecedor",
                type: "dynamic",
                path: "fn_body_api.fornecedor",
                value: ""
              },

              {
                nameVar: "qtd_em_estoque",
                type: "dynamic",
                path: "fn_body_api.qtd_em_estoque",
                value: ""
              },

              {
                nameVar: "qtd_estoque_min",
                type: "dynamic",
                path: "fn_body_api.qtd_estoque_min",
                value: ""
              },

              {
                nameVar: "qtd_estoque_max",
                type: "dynamic",
                path: "fn_body_api.qtd_estoque_max",
                value: ""
              },

              {
                nameVar: "status",
                type: "dynamic",
                path: "fn_body_api.status",
                value: ""
              },

              {
                nameVar: "promocao",
                type: "dynamic",
                path: "fn_body_api.promocao",
                value: ""
              },

              {
                nameVar: "midia",
                type: "dynamic",
                path: "fn_body_api.midia",
                value: ""
              },

              {
                nameVar: "markup",
                type: "dynamic",
                path: "fn_body_api.markup",
                value: ""
              }

            ]

          }
        }
        
      ],

      fn_outputs: [

        {
          nameVar: "tbl_ad_produto",
          type: "dynamic",
          path: "fn_result_process.criar_produto",
          value: ""
        }

      ]
    },

    // Atualiza
    {
      id: 2,
      fn_name: "Atualizar Produto",
      fn_slug: "up_data_produtos",
      fn_type: "DB-UPDATA",

      fn_static_data: [
      ],

      fn_process: [
        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Atualizar Produto",
          process_slug: "up_data_produtos",

          process_type_action: "actionUpData",

          process: {
            table: "tbl_ad_produtos",

            col: "id", 

            col_value: {
              nameVar: "id",
              type: "dynamic",
              path: "fn_body_api.id",
              value: ""
            },

            data: [
              {
                nameVar: "descricao_prod",
                type: "dynamic",
                path: "fn_body_api.descricao_prod",
                value: ""
              },

              {
                nameVar: "descricao_prod_lowercase",
                type: "dynamic",
                path: "fn_body_api.descricao_prod_lowercase",
                value: ""
              },

              {
                nameVar: "codigo_de_barras",
                type: "dynamic",
                path: "fn_body_api.codigo_de_barras",
                value: ""
              },

              {
                nameVar: "categorias",
                type: "dynamic",
                path: "fn_body_api.categorias",
                value: ""
              },

              {
                nameVar: "marca",
                type: "dynamic",
                path: "fn_body_api.marca",
                value: ""
              },

              {
                nameVar: "preco_de_custo",
                type: "dynamic",
                path: "fn_body_api.preco_de_custo",
                value: ""
              },

              {
                nameVar: "preco_de_venda",
                type: "dynamic",
                path: "fn_body_api.preco_de_venda",
                value: ""
              },

              {
                nameVar: "unidade",
                type: "dynamic",
                path: "fn_body_api.unidade",
                value: ""
              },

              {
                nameVar: "fornecedor",
                type: "dynamic",
                path: "fn_body_api.fornecedor",
                value: ""
              },

              {
                nameVar: "qtd_em_estoque",
                type: "dynamic",
                path: "fn_body_api.qtd_em_estoque",
                value: ""
              },

              {
                nameVar: "qtd_estoque_min",
                type: "dynamic",
                path: "fn_body_api.qtd_estoque_min",
                value: ""
              },

              {
                nameVar: "qtd_estoque_max",
                type: "dynamic",
                path: "fn_body_api.qtd_estoque_max",
                value: ""
              },

              {
                nameVar: "status",
                type: "dynamic",
                path: "fn_body_api.status",
                value: ""
              },

              {
                nameVar: "promocao",
                type: "dynamic",
                path: "fn_body_api.promocao",
                value: ""
              },

              {
                nameVar: "midia",
                type: "dynamic",
                path: "fn_body_api.midia",
                value: ""
              },

              {
                nameVar: "markup",
                type: "dynamic",
                path: "fn_body_api.markup",
                value: ""
              }

            ]

          }
        },

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Lista dos Produtos",
          process_slug: "list_produtos",

          process_type_action: "actionListFull",

          process: {
            table: "tbl_ad_produtos",

            cols: [
              "id",
              "descricao_prod",
              "descricao_prod_lowercase",
              "codigo_de_barras",
              "categorias",
              "marca",
              "preco_de_venda",
              "qtd_em_estoque",
              "status",
              "midia"
            ]

          }
        }
        
      ],

      fn_outputs: [

        {
          nameVar: "tbl_ad_produtos",
          type: "dynamic",
          path: "fn_result_process.list_produtos",
          value: ""
        }

      ]
    },

    // Lista
    {
      id: 3,
      fn_name: "Listar Produto",
      fn_slug: "list_produtos",
      fn_type: "DB-LIST",

      fn_static_data: [
      ],

      fn_process: [

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Lista dos Produtos",
          process_slug: "list_produtos",

          process_type_action: "actionListFull",

          process: {
            table: "tbl_ad_produtos",

            cols: [
              "id",
              "descricao_prod",
              "descricao_prod_lowercase",
              "codigo_de_barras",
              "categorias",
              "marca",
              "preco_de_venda",
              "qtd_em_estoque",
              "qtd_estoque_min",
              "status",
              "midia"
            ]

          }
        }
        
      ],

      fn_outputs: [

        {
          nameVar: "tbl_ad_produtos",
          type: "dynamic",
          path: "fn_result_process.list_produtos",
          value: ""
        }

      ]
    },

    // Encontra um
    {
      id: 4,
      fn_name: "Encontrar um Registro",
      fn_slug: "find_on_produto",
      fn_type: "DB-LIST",

      fn_static_data: [
      ],

      fn_process: [

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Encontrar um Registro",
          process_slug: "find_on_produto",

          process_type_action: "actionFindOn",

          process: {
            table: "tbl_ad_produtos",

            col: "id", 

            col_value: {
              nameVar: "id",
              type: "dynamic",
              path: "fn_body_api.id",
              value: ""
            },

            cols: ["*"]

          }
        }
        
      ],

      fn_outputs: [

        {
          nameVar: "tbl_ad_produtos",
          type: "dynamic",
          path: "fn_result_process.find_on_produto",
          value: ""
        }

      ]
    },

    // deleta por uma coluna
    {
      id: 5,
      fn_name: "Deleta",
      fn_slug: "delete_registro_produto",
      fn_type: "DB-DELETE",

      fn_static_data: [
      ],

      fn_process: [

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Encontrar um Registro",
          process_slug: "delete_registro",

          process_type_action: "actionDeleteByCol",

          process: {
            table: "tbl_ad_produtos",

            col: "id", 

            col_value: {
              nameVar: "id",
              type: "dynamic",
              path: "fn_body_api.id",
              value: ""
            }

          }
        },

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Lista dos Produtos",
          process_slug: "list_produtos",

          process_type_action: "actionListFull",

          process: {
            table: "tbl_ad_produtos",

            cols: [
              "id",
              "descricao_prod",
              "descricao_prod_lowercase",
              "codigo_de_barras",
              "categorias",
              "marca",
              "preco_de_venda",
              "qtd_em_estoque",
              "status",
              "midia"
            ]
          }
        }
        
      ],

      fn_outputs: [

        {
          nameVar: "tbl_ad_produtos",
          type: "dynamic",
          path: "fn_result_process.list_produtos",
          value: ""
        }

      ]
    },

    // KPIS
    {
      id: 1,
      fn_name: "Busca Grandes números",
      fn_slug: "busca_grandes_numeros",
      fn_type: "DB-CUSTOM",

      fn_static_data: [
      ],

      fn_process: [

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Busca total de produtos",
          process_slug: "busca_total_de_produtos",

          process_type_action: "actionDbCustom",

          process: {
            table: "tbl_ad_produtos",
            methods: [
              {
                method: "count",
                argumentos: []
              },
              {
                method: "first",
                argumentos: []
              }
            ]
          }
        },

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Soma valor de custo",
          process_slug: "soma_valor_de_custo",

          process_type_action: "actionDbCustom",

          process: {
            table: "tbl_ad_produtos",
            methods: [
              {
                method: "selectRaw",
                argumentos: ["sum(preco_de_custo*qtd_em_estoque)"]
              },
              {
                method: "first",
                argumentos: []
              }
            ]
          }
        },

        {
          process_is_have_condition: false,
          process_conditions: [
          ],

          process_title: "Soma valor de venda",
          process_slug: "soma_valor_de_venda",

          process_type_action: "actionDbCustom",

          process: {
            table: "tbl_ad_produtos",
            methods: [
              {
                method: "selectRaw",
                argumentos: ["sum(preco_de_venda*qtd_em_estoque)"]
              },
              {
                method: "first",
                argumentos: []
              }
            ]
          }
        }

      ],

      fn_outputs: [

        {
          nameVar: "total_de_produtos",
          type: "dynamic",
          path: "fn_result_process.busca_total_de_produtos.count",
          value: ""
        },

        {
          nameVar: "soma_valor_de_custo",
          type: "dynamic",
          path: "fn_result_process.soma_valor_de_custo.sum",
          value: ""
        },

        {
          nameVar: "soma_valor_de_venda",
          type: "dynamic",
          path: "fn_result_process.soma_valor_de_venda.sum",
          value: ""
        }

      ]
    },

]

export const fn_teste_produtos = [

  // Cria
  {
    id: 1,
    fn_name: "Criar marcas de produtos",
    fn_slug: "criar_tbl_ad_dp_marcas_de_produtos_teste",
    fn_type: "DB-INSERT",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Criar marcas de produtos",
        process_slug: "criar_tbl_ad_dp_marcas_de_produtos_teste",

        process_type_action: "actionInsert",

        process: {
          table: "tbl_prod_teste",

          data: [

            {
              nameVar: "id",
              type: "dynamic",
              path: "fn_body_api.id",
              value: ""
            },

            {
              nameVar: "nome",
              type: "dynamic",
              path: "fn_body_api.nome",
              value: ""
            },
            {
              nameVar: "valor",
              type: "dynamic",
              path: "fn_body_api.valor",
              value: ""
            }

          ]

        }
      },

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista marcas de produtos",
        process_slug: "list_dp_marcas_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_prod_teste",

          cols: [
            "id",
            "nome",
            "valor"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_prod_teste",
        type: "dynamic",
        path: "fn_result_process.list_dp_marcas_de_produtos",
        value: ""
      }

    ]
  },

  // Lista
  {
    id: 3,
    fn_name: "Lista fornecedor de produtos",
    fn_slug: "list_dp_marcas_de_produtos",
    fn_type: "DB-LIST",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista marcas de produtos",
        process_slug: "list_dp_marcas_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_marcas_de_produtos",

          cols: [
            "id",
            "descri_marca"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_marcas_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_marcas_de_produtos",
        value: ""
      }

    ]
  },

  // Encontra um
  {
    id: 4,
    fn_name: "Busca um marcas de produtos",
    fn_slug: "find_on_dp_marcas_de_produtos",
    fn_type: "DB-LIST-ON",

    fn_static_data: [
    ],

    fn_process: [

      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Busca um marcas de produtos",
        process_slug: "find_on_dp_marcas_de_produtos",

        process_type_action: "actionFindOn",

        process: {
          table: "tbl_ad_dp_marcas_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          },

          cols: [
            "id",
            "descri_marca"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_marcas_de_produtos",
        type: "dynamic",
        path: "fn_result_process.find_on_dp_marcas_de_produtos",
        value: ""
      }

    ]
  },

  // deleta venda cascaded
  {
    id: 5,
    fn_name: "Deleta marcas de produtos",
    fn_slug: "delete_dp_marcas_de_produtos",
    fn_type: "DB-DELETE",

    fn_static_data: [
    ],

    fn_process: [

      // deleta venda
      {
        process_is_have_condition: false,
        process_conditions: [
        ],

        process_title: "Deleta marcas de produtos",
        process_slug: "delete_dp_marcas_de_produtos",

        process_type_action: "actionDeleteByCol",

        process: {
          table: "tbl_ad_dp_marcas_de_produtos",

          col: "id", 

          col_value: {
            nameVar: "id",
            type: "dynamic",
            path: "fn_body_api.id",
            value: ""
          }

        }
      },

      // Lista vendas
      {
        process_is_have_condition: false,
        process_conditions: [

        ],

        process_title: "Lista marcas de produtos",
        process_slug: "list_dp_marcas_de_produtos",

        process_type_action: "actionListFull",

        process: {

          table: "tbl_ad_dp_marcas_de_produtos",

          cols: [
            "id",
            "descri_marca"
          ]

        }
      }
      
    ],

    fn_outputs: [

      {
        nameVar: "tbl_ad_dp_marcas_de_produtos",
        type: "dynamic",
        path: "fn_result_process.list_dp_marcas_de_produtos",
        value: ""
      }

    ]
  }

]







export const fn_full = {
  criar_tbl_ad_dp_marcas_de_produtos,
  fn_produtos,
  fn_clientes,
  fn_crediarios,
  fn_caixa,
  fn_vendas,
  fn_categorias_de_produtos,
  fn_fornecedor_de_produtos,
  fn_marcas_de_produtos,
  fn_teste_produtos
}








// {
//   process_is_have_condition: false,
//   process_conditions: [
//   ],

//   process_title: "cria_array_map",
//   process_slug: "cria_array_map",

//   process_type_action: "mapActionInsert",

//   process_true: {
    

//     array_map: {
//       nameVar: "list_marcas",
//       type: "dynamic",
//       path: "fn_result_process.list_dp_marcas_de_produtos",
//       value: ""
//     },

//     table: "tbl_ad_dp_marcas_de_produtos",

//     data: [

//       {
//         nameVar: "descri_marca",
//         type: "dynamic",
//         path: "fn_temp_array_data.descri_marca",
//         value: ""
//       }

//     ]



//   }

// },