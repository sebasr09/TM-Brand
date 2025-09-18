const objects = [
    {
        name: "Razón esencial",
        location: "razon_social"
    },
    {
        name: "Representacion legal",
        location: "representacion_legal",
    },
    {
        name: "Representantes legales y vinculados",
        location: "representacion_legal_y_vinculos",
        details: [{
            name: "Información de la persona",
            location: [],
            nameInObject: "no identificación",
            type: "object",
            elements: [
                { name: "Número de identificación", location: ["no identificación"] },
                { name: "Nombre", location: ["nombre"] },
                { name: "Tipo de vinculo", location: ["tipodevinculo"] }
            ]
        },
        ]
    },
    // {
    //     name: "Actividades económicas",
    //     location: "actividades_economicas",
    // },
    {
        name: "Matricula",
        location: "matricula",
    },
    {
        name: "Categoría de la matricula",
        location: "categoria_matricula",
    },
    {
        name: "Clase de identificación",
        location: "clase_de_identificación",
    },
    {
        name: "Grupo empresarial",
        location: "grupo_empresarial",
        details: [{
            name: "Información del grupo empresarial",
            location: ["domicilio"],
            nameInObject: "domicilio",
            type: "object",
            elements: [
                { name: "Domicilio", location: ["domicilio"] },
                { name: "GE", location: ["ge"] },
                { name: "Identificación", location: ["Identificacion"] },
                { name: "Nombre", location: ["nombre"] },
                { name: "SC", location: ["sc"] },
            ]
        },
        ]
    },
    {
        name: "Propietario o establecimientos",
        location: "propietario_o_establecimientos",
        details: [{
            name: "Información",
            location: ["categoria_matricula"],
            nameInObject: "categoria_matricula",
            type: "object",
            elements: [
                { name: "Categoria Matricula", location: ["categorria_matricula"] },
                { name: "Clase identificación", location: ["clase_identificacion"] },
                { name: "Código Camara", location: ["codigo_camara"] },
                { name: "Código estado", location: ["codigo_estado"] },
                { name: "Desc estado matricula", location: ["desc_estado_matricula"] },
                { name: "Estado", location: ["estado"] },
                { name: "Identificación", location: ["identificacion"] },
                { name: "Matricula", location: ["matricula"] },
                { name: "Nombre cámara", location: ["nombre_camara"] },
                { name: "Organización jurídica", location: ["organizacion_juridica"] },
                { name: "Razón social", location: ["razon_social"] },
                { name: "Sigla", location: ["sigla"] },
                { name: "tipo", location: ["tipo"] },
            ]
        },
        ]
    },
    {
        name: "Registro mercantil",
        location: "registro_mercantil",
        details: [
            {
                location: [],
                nameInObject: "afiliado",
                type: "object",
                elements: [
                    { name: "afiliado", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "categoria_de_la_matricula",
                type: "object",
                elements: [
                    { name: "Categoría de la matricula", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "correo_electrónico_comercial",
                type: "object",
                elements: [
                    { name: "Correo electrónico comercial", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "correo_electrónico_fiscal",
                type: "object",
                elements: [
                    { name: "Correo electrónico fiscal", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "dirección_comercial",
                type: "object",
                elements: [
                    { name: "Dirección comercial", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "dirección_fiscal",
                type: "object",
                elements: [
                    { name: "Dirección fiscal", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "estado_de_la_matricula",
                type: "object",
                elements: [
                    { name: "Estado de la matricula", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "fecha_de_cancelación",
                type: "object",
                elements: [
                    { name: "Fecha de cancelación", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "fecha_de_matricula",
                type: "object",
                elements: [
                    { name: "Fecha de matricula", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "fecha_de_renovacion",
                type: "object",
                elements: [
                    { name: "Fecha de renovacion", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "fecha_de_vigencia",
                type: "object",
                elements: [
                    { name: "Fecha de vigencia", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "municipio_comercial",
                type: "object",
                elements: [
                    { name: "Municipio comercial", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "municipio_fiscal",
                type: "object",
                elements: [
                    { name: "Municipio fiscal", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "numero_de_matricula",
                type: "object",
                elements: [
                    { name: "Número de matricula", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "teléfono_comercial",
                type: "object",
                elements: [
                    { name: "Teléfono comercial", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "teléfono_fiscal",
                type: "object",
                elements: [
                    { name: "Teléfono fiscal", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "tipo_de_organización",
                type: "object",
                elements: [
                    { name: "Tipo de organización", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "tipo_de_sociedad",
                type: "object",
                elements: [
                    { name: "Tipo de sociedad", location: [] }
                ]
            },
            {
                location: [],
                nameInObject: "último_año_renovado",
                type: "object",
                elements: [
                    { name: "Último año renovado", location: [] }
                ]
            },
        ]
    },
    {
        name: "Nombre de la cámara",
        location: "nombre_camara",
    },
    {
        name: "Organización jurídica",
        location: "organizacion_juridica",
    },
    {
        name: "Código postal",
        location: "codigo_postal",
        details: [
            {
                name: "Información del código postal",
                location: [],
                nameInObject: "codigo_postal",
                type: "object",
                elements: [
                    { name: "Código postal", location: ["codigo_postal"] },
                    { name: "Departamento", location: ["departamento"] },
                    { name: "Dirección", location: ["direccion"] },
                    { name: "Municipio", location: ["municipio"] },
                    { name: "ubicacion", location: ["ubicacion"] },
                    { name: "Latitud", location: ["lat"] },
                    { name: "Longitud", location: ["lon"] }
                ]
            }
        ]
    },
    {
        name: "Antecedentes disciplinarios Procuraduría",
        location: "procuraduria",
        important: true,
        details: [
            {
                name: "Delito",
                location: [],
                nameInObject: "delito",
                type: "object",
                elements: [
                    { name: "Delito", location: ["delito"] }
                ]
            },
            {
                name: "Delitos",
                location: ["datos"],
                nameInObject: "datos",
                type: "double array",
                elements: {
                    location: ["Delitos"],
                    elements: [
                        { name: "Descripción del delito", location: ["Descripción del Delito"] }
                    ]
                }
            },
            {
                name: "Eventos",
                location: ["datos"],
                nameInObject: "datos",
                type: "double array",
                elements: {
                    location: ["Eventos"],
                    elements: [
                        { name: "Entidad", location: ["Entidad"] },
                        { name: "Fecha acto", location: ["Fecha acto"] },
                        { name: "Nombre causa", location: ["Nombre causa"] },
                        { name: "Tipo de acto", location: ["Tipo acto"] }
                    ]
                }
            },
            {
                name: "Instancias",
                location: ["datos"],
                type: "double array",
                nameInObject: "datos",
                elements: {
                    location: ["Instancias"],
                    elements: [
                        { name: "Autoridad", location: ["Autoridad"] },
                        { name: "Fecha providencia", location: ["Fecha providencia"] },
                        { name: "Nombre", location: ["Nombre"] },
                        { name: "Fecha efecto juridicos", location: ["Fecha efecto Juridicos"] }
                    ]
                }
            },
            {
                name: "SIRI",
                location: ["datos"],
                nameInObject: "datos",
                type: "array",
                elements: [
                    { name: "SIRI", location: ["SIRI"] }
                ]
            },
            {
                name: "Sanciones",
                location: ["datos"],
                nameInObject: "datos",
                type: "double array",
                elements: {
                    location: ["Sanciones"],
                    elements: [
                        { name: "Clase", location: ["Clase"] },
                        { name: "Sanción", location: ["Sanción"] },
                        { name: "Suspendida", location: ["Suspendida"] },
                        { name: "Término", location: ["Término"] }
                    ]
                }
            },
            {
                name: "Inhabilidades",
                location: ["inhabilidades"],
                nameInObject: "inhabilidades",
                type: "array",
                elements: [
                    { name: "Fecha de inicio", location: ["Fecha de inicio"] },
                    { name: "Fecha fin", location: ["Fecha fin"] },
                    { name: "Inhabilidad legal", location: ["Inhabilidad legal"] },
                    { name: "Módulo", location: ["Módulo"] },
                    { name: "SIRI", location: ["SIRI"] }
                ]
            },
        ]
    },
    {
        name: "Contraloría",
        location: "contraloria",
        important: true,
    },
    {
        name: "Rama Judicial sistema TYBA",
        location: "juzgados_tyba",
        important: true,
        details: [
            {
                name: "Información del proceso",
                location: [],
                nameInObject: "CODIGO PROCESO",
                type: "object",
                elements: [
                    { name: "Código del proceso", location: ["CODIGO PROCESO"] },
                    { name: "Despacho", location: ["DESPACHO"] },
                ]
            },
            {
                name: "Detalle del proceso",
                location: ["INFO PROCES0"],
                nameInObject: "INFO PROCES0",
                type: "object",
                elements: [
                    { name: "Tipo proceso", location: ["Tipo Proceso"] },
                    { name: "Clase proceso", location: ["Clase Proceso"] },
                    { name: "Subclase Proceso", location: ["Subclase Proceso"] },
                    { name: "Departamento", location: ["Departamento"] },
                    { name: "Ciudad", location: ["Ciudad"] },
                    { name: "Corporación", location: ["Corporación"] },
                    { name: "Especialidad", location: ["Especialidad"] },
                    { name: "Distrito/Circuito", location: ["Distrito\\Circuito"] },
                    { name: "Número Despacho", location: ["Número despacho"] },
                    { name: "Despacho", location: ["Despacho"] },
                    { name: "Fecha Publicación", location: ["Fecha Publicación"] },
                    { name: "Fecha Providencia", location: ["Fecha Providencia"] },
                    { name: "Fecha Finalización", location: ["Fecha Finalización"] },
                    { name: "Tipo decisión", location: ["Tipo Decisión"] },
                    { name: "Observaciones Finalización", location: ["Observaciones Finalización"] }
                ]
            }, {
                name: "Sujetos",
                location: ["INFO PROCES0", "sujetos"],
                nameInObject: "INFO PROCES0",
                type: "array",
                elements: [
                    { name: "Nombre(s) y apellido(s)/Razón social", location: ["NOMBRE(S) Y APELLIDO(S) / RAZÓN SOCIAL"], type: "title" },
                    { name: "Tipo de identificación", location: ["TIPO DOCUMENTO"] },
                    { name: "Número de identificación", location: ["NÚMERO DE IDENTIFICACIÓN"] },
                    { name: "Fecha registro", location: ["FECHA REGISTRO"] }
                ]
            }, {
                name: "Ciclos",
                location: ["INFO PROCES0", "actuaciones"],
                nameInObject: "INFO PROCES0",
                type: "array",
                elements: [
                    { name: "Ciclo", location: ["CICLO"], type: "title" },
                    { name: "Tipo de actuación", location: ["TIPO ACTUACIÓN"] },
                    { name: "Fecha de actuación", location: ["FECHA ACTUACIÓN"] },
                    { name: "Fecha de registro", location: ["FECHA DE REGISTRO"] }
                ]
            }
        ]
    },
    {
        name: "LISTAS y PEPS (Personas expuestas política y socialmente)",
        location: "peps",
        important: true,
        details: [
            {
                location: [],
                type: "object",
                nameInObject: "TIPO_LISTA",
                elements: [
                    { name: "Tipo lista", location: ["TIPO_LISTA"], type: "title" },
                    { name: "Origen lista", location: ["ORIGEN_LISTA"] },
                    { name: "Código", location: ["CODIGO"] },
                    { name: "Nombre completo", location: ["NOMBRECOMPLETO"] },
                    { name: "Primer nombre", location: ["PRIMER_NOMBRE"] },
                    { name: "Segundo nombre", location: ["SEGUNDO_NOMBRE"] },
                    { name: "Primer apellido", location: ["PRIMER_APELLIDO"] },
                    { name: "Segundo apellido", location: ["SEGUNDO_APELLIDO"] },
                    { name: "Tipo persona", location: ["TIPO_PERSONA"] },
                    { name: "Tipo identificación", location: ["TIPO_ID"] },
                    { name: "Identificación", location: ["ID"] },
                    { name: "Relacionado con", location: ["RELACIONADO_CON"] },
                    { name: "Rol o descripción 1", location: ["ROL_O_DESCRIPCION1"] },
                    { name: "Rol o descripción 2", location: ["ROL_O_DESCRIPCION2"] },
                    { name: "AKA", location: ["AKA"] },
                    { name: "Fuente", location: ["FUENTE"] },
                    { name: "Fecha update", location: ["FECHA_UPDATE"] },
                    { name: "Fecha final rol", location: ["FECHA_FINAL_ROL"] },
                    { name: "Nacionalidad/País de origen", location: ["NACIONALIDAD_PAISORIGEN"] },
                    { name: "Dirección", location: ["DIRECCION"] },
                    { name: "Estado", location: ["ESTADO"] },
                    { name: "Llave imagen", location: ["LLAVEIMAGEN"] }
                ]
            }
        ]
    },
    {
        name: "OFAC (Lista Clinton)",
        location: "ofac",
        important: true,
        details: [
            {
                name: "Nombre",
                location: [],
                nameInObject: "nombre",
                type: "object",
                elements: [
                    { name: "Nombre", location: [] }
                ]
            },
            {
                name: "Tipo",
                location: [],
                nameInObject: "tipo",
                type: "object",
                elements: [
                    { name: "Tipo", location: [] }
                ]
            },
            {
                name: "Puntaje",
                location: [],
                nameInObject: "puntaje",
                type: "object",
                elements: [
                    { name: "Puntaje", location: [] }
                ]
            },
            {
                name: "Programa",
                location: [],
                nameInObject: "programa",
                type: "object",
                elements: [
                    { name: "Programa", location: [] }
                ]
            },
            {
                name: "Lista",
                location: [],
                nameInObject: "lista",
                type: "object",
                elements: [
                    { name: "Lista", location: [] }
                ]
            },
            {
                name: "Dirección",
                location: [],
                nameInObject: "direccion",
                type: "object",
                elements: [
                    { name: "Dirección", location: [] }
                ]
            }
        ]
    },
    {
        name: "Consejo de Seguridad de la ONU",
        location: "lista_onu",
        important: true,
    },
    {
        name: "SECOP 2",
        location: "secop2",
        important: true,
        details: [
            {
                name: "Información del proceso",
                location: [],
                nameInObject: "departamento",
                type: "object",
                elements: [
                    { name: "Departamento", location: ["departamento"] },
                    { name: "Descripcion del contrato", location: ["descripcion_contrato"] },
                    { name: "Entidad compradora", location: ["entidad_compradora"] },
                    { name: "Entidad proveedora", location: ["entidad_proveedora"] },
                    { name: "Estado contrato", location: ["estado_contrato"] },
                    { name: "Fecha inicio contrato", location: ["fecha_inicio_contrato"] },
                    { name: "Fecha fin contrato", location: ["fecha_fin_contrato"] },
                    { name: "Modalidad contratación", location: ["modalidad_contratacion"] },
                    { name: "Municipio", location: ["municipio"] },
                    { name: "Tipo de contrato", location: ["tipo_de_contrato"] },
                    { name: "Url del contrato", location: ["urlcontrato"] },
                    { name: "Valor del contrato", location: ["valor_contrato"] }
                ]
            }
        ]
    },
    {
        name: "Sancionados del SECOP",
        location: "secop_s",
        important: true,
        details: [
            {
                name: "Información del proceso",
                location: [],
                nameInObject: "documento_contratista",
                type: "object",
                elements: [
                    { name: "Documento contratista", location: ["documento_contratista"] },
                    { name: "Fecha de publicación", location: ["fecha_de_publicacion"] },
                    { name: "Municipio", location: ["municipio"] },
                    { name: "Nombre contratista", location: ["nombre_contratista"] },
                    { name: "Nombre entidad", location: ["nombre_entidad"] },
                    { name: "Número de contrato", location: ["numero_de_contrato"] },
                    { name: "Número de resolución", location: ["numero_de_resolucion"] },
                    { name: "Orden", location: ["orden"] },
                    { name: "Ruta de proceso", location: ["ruta_de_proceso"] },
                    { name: "Valor sanción", location: ["valor_sancion"] }
                ]
            }]
    },
    {
        name: "SIMUR (Histórico de multas en Bogotá)",
        location: "simur",
        important: true,
        details: [
            {
                name: "Información del proceso",
                location: [],
                nameInObject: "Placa",
                type: "object",
                elements: [
                    { name: "Placa", location: ["Placa"] },
                    { name: "Número", location: ["No"] },
                    { name: "Fecha infracción", location: ["Fecha Infracción"] },
                    { name: "Número comparendo", location: ["No Comparendo"] },
                    { name: "Número documento", location: ["No Documento"] }
                ]
            }
        ]
    },
    {
        name: "FOPEP (Fondo de Pensiones Públicas del Nivel Nacional)",
        location: "fopep",
        important: false,
    },
    {
        name: "RUES (Registro único empresarial y social)",
        location: "rues",
        important: false,
        details: [
            {
                name: "Clase",
                location: [],
                nameInObject: "clase_identificacion",
                type: "object",
                elements: [
                    { name: "Clase", location: [], type: "title" },
                ]
            },
            {
                name: "NIT",
                location: [],
                nameInObject: "nit",
                type: "object",
                elements: [
                    { name: "NIT", location: [], type: "title" },
                ]
            },
            {
                name: "Estado",
                location: [],
                nameInObject: "estado",
                type: "object",
                elements: [
                    { name: "Estado", location: [], type: "title" },
                ]
            },
            {
                name: "Cámara",
                location: [],
                nameInObject: "codigo_camara",
                type: "object",
                elements: [
                    { name: "Cámara", location: [], type: "title" },
                ]
            },
            {
                name: "Ciudad",
                location: [],
                nameInObject: "nombre_camara",
                type: "object",
                elements: [
                    { name: "Ciudad", location: [], type: "title" },
                ]
            },
            {
                name: "Matricula",
                location: [],
                nameInObject: "matricula",
                type: "object",
                elements: [
                    { name: "Matricula", location: [], type: "title" },
                ]
            },
            {
                name: "Categoría",
                location: [],
                nameInObject: "categoria_matricula",
                type: "object",
                elements: [
                    { name: "Categoría", location: [], type: "title" },
                ]
            },
            {
                name: "Registro mercantil",
                location: [],
                type: "object",
                nameInObject: "registro_mercantil",
                elements: [
                    { name: "Número de matrícula", location: ["numero_de_matricula"] },
                    { name: "Último año de renovado", location: ["ultimo_año_renovado"] },
                    { name: "Fecha de renovación", location: ["fecha_de_renovacion"] },
                    { name: "Fecha de matrícula", location: ["fecha_de_matricula"] },
                    { name: "Fecha de vigencia", location: ["fecha_de_vigencia"] },
                    { name: "Estado de la matrícula", location: ["estado_de_la_matricula"] },
                    { name: "Fecha de cancelación", location: ["fecha_de_cancelación"] },
                    { name: "Tipo de organización", location: ["tipo_de_organizacion"] },
                    { name: "Categoría de la matrícula", location: ["categoria_de_la_matricula"] },
                    { name: "Empleados", location: ["empleados"] },
                    { name: "Afiliado", location: ["afiliado"] },
                    { name: "Beneficiario ley 1780", location: ["beneficiario_ley_1780?"] },
                    { name: "Municipio comercial", location: ["municipio_comercial"] },
                    { name: "Dirección comercial", location: ["dirección_comercial"] },
                    { name: "Teléfono comercial", location: ["teléfono_comercial"] },
                    { name: "Municipio fiscal", location: ["municipio_fiscal"] },
                    { name: "Teléfono fiscal", location: ["teléfono_fiscal"] },
                    { name: "Correo electrónico comercial", location: ["correo_electrónico_comercial"] },
                    { name: "Correo electrónico fiscal", location: ["correo_electrónico_fiscal"] }
                ]
            },
            {
                name: "Actividades económicas",
                location: [],
                nameInObject: "actividades_economicas",
                type: "array",
                elements: [
                    { name: "Detalle", location: [], type: "title" },
                ]
            }
        ]
    },
    {
        name: "Noticias reputacionales español",
        location: "google",
        important: true,
        type: "Array",
        details: [
            {
                location: [],
                type: "object",
                nameInObject: "title",
                elements: [
                    { name: "Palabra clave", location: ["keyword"], type: "title" },
                    { name: "Titulo", location: ["title"] },
                    { name: "Descipción", location: ["description"] },
                    { name: "Link", location: ["link"] },
                    { name: "Error", location: ["Error"] }
                ]
            },
            {
                location: [],
                type: "object",
                nameInObject: "Error",
                elements: [
                    { name: "Error", location: ["Error"] }
                ]
            }
        ]
    },
    {
        name: "Noticias reputacionales Inglés",
        location: "ddg",
        important: true,
        type: "Array",
        details: [
            {
                location: [],
                type: "object",
                nameInObject: "title",
                elements: [
                    { name: "Titulo", location: ["title"], type: "title" },
                    { name: "Palabra clave", location: ["keyword"] },
                    { name: "Descipción", location: ["description"] },
                    { name: "Link", location: ["link"] },
                    { name: "Error", location: ["Error"] }
                ]
            }
        ]
    },
    {
        name: "Registro único tributario (RUT)",
        location: "rut",
        important: false,
    },
    {
        name: "Registro único tributario (RUT) - estado",
        location: "rut_estado",
        important: false,
    },
    {
        name: "Multas de tránsito Bogotá",
        location: "transitobog",
        important: true,
    },
    {
        name: "Sistema integrado de información sobre multas y sanciones por infracciones de tránsito - SIMIT",
        location: "simit",
        important: true,
    },
    {
        name: "Registro proponentes de RUES",
        location: "registro_proponentes",
        details: [
            {
                name: "Actividades RUP",
                location: ["actividades_rup"],
                nameInObject: "actividades_rup",
                type: "object",
                elements: [
                    { name: "Código", location: ["codigo"] },
                    { name: "Descripción", location: ["descripción"] }
                ]
            },
            {
                name: "Contratos",
                location: ["contratos"],
                nameInObject: "contratos",
                type: "object",
                elements: [
                    { name: "Clasificaciones ley 1464", location: ["clasificaciones_ley_1464"] },
                    { name: "Clasificación CIIU", location: ["clasificación_ciiu"] },
                    { name: "Estado contrato", location: ["estado_contrato"] },
                    { name: "Fecha adjudicación", location: ["fecha_adjudicación"] },
                    { name: "Fecha de terminación anticipada", location: ["fecha_de_terminación_anticipada"] },
                    { name: "Fecha inicio", location: ["fecha_inicio"] },
                    { name: "Fecha liquidación", location: ["fecha_liquidación"] },
                    { name: "Fecha perfeccionamiento", location: ["fecha_perfeccionamiento"] },
                    { name: "Fecha terminacion", location: ["fecha_terminacion"] },
                    { name: "Motivo terminación anticipada", location: ["motivo_terminación_anticipada"] },
                    { name: "Municipio entidad", location: ["municipio_entidad"] },
                    { name: "NIT entidad", location: ["nit_entidad"] },
                    { name: "Nombre entidad", location: ["nombre_entidad"] },
                    { name: "Número de contrato", location: ["número_de_contrato"] },
                    { name: "Seccional entidad", location: ["seccional_entidad"] },
                    { name: "Tipo contratista", location: ["tipo_contratista"] },
                    { name: "Valor contrato", location: ["valor_contrato"] },
                    { name: "Valor pagado", location: ["valor_pagado"] },
                ]
            },
            {
                location: [],
                type: "object",
                nameInObject: "cámara_de_comercio_proponente_rup",
                elements: [
                    { name: "Cámara de comercio proponente rup", location: ["cámara_de_comercio_proponente_rup"] }
                ]
            },
            {
                location: [],
                type: "object",
                nameInObject: "estado_del_proponente",
                elements: [
                    { name: "Estado del proponente", location: ["estado_del_proponente"] }
                ]
            },
            {
                location: [],
                type: "object",
                nameInObject: "fecha_de_cancelación",
                elements: [
                    { name: "Fecha de cancelación", location: ["fecha_de_cancelación"] }
                ]
            },
            {
                location: [],
                type: "object",
                nameInObject: "fecha_de_inscripción",
                elements: [
                    { name: "Fecha de inscripción", location: ["fecha_de_inscripción"] }
                ]
            },
            {
                location: [],
                type: "object",
                nameInObject: "fecha_de_renovación",
                elements: [
                    { name: "Fecha de renovación", location: ["fecha_de_renovación"] }
                ]
            },
        ]
    },
    {
        name: "Renovaciones anteriores de RUES",
        location: "renovaciones_anteriores",
        type: "Array",
        details: [
            {
                location: [],
                type: "object",
                nameInObject: "años",
                elements: [
                    { name: "Años", location: ["años"], type: "Años" },
                ]
            },
            {
                location: [],
                type: "object",
                nameInObject: "fecha_renovación",
                elements: [
                    { name: "Fecha renovación", location: ["fecha_renovación"], type: "Fecha renovación" },
                ]
            },
        ]
    },
    {
        name: "Garantias mobiliarias",
        location: "garantias_mobiliarias",
        important: true,
        details: [
            {
                name: "Registro de garantías mobiliarias",
                location: [],
                nameInObject: "Detalles",
                type: "object",
                elements: [
                    { name: "Acreedor(es)", location: ["acreedor(es)"] },
                    { name: "Fecha de inscripción inicial", location: ["Fechadeinscripcióninicial(dd/mm/aaaahh: mm: ss)"] },
                    { name: "Folio electrónico", location: ["FolioElectrónico"] },
                    { name: "Garante deudor", location: ["Garante-Deudor"] },
                    { name: "Numero de identificación", location: ["NumerodeIdentificación"] },
                    { name: "Ultima operación", location: ["UltimaOperación"] }
                ]
            },
            {
                name: "Detalles",
                location: ["Detalles"],
                nameInObject: "Detalles",
                type: "object",
                elements: [
                    { name: "Celular", location: ["Celular"] },
                    { name: "Correo electrónico 1", location: ["CorreoElectrónico1"] },
                    { name: "Correo electrónico 2", location: ["CorreoElectrónico2"] },
                    { name: "Dirección", location: ["Dirección"] },
                    { name: "Dígito de verificación", location: ["DígitoDeVerificación"] },
                    { name: "Número de identificación", location: ["NúmerodeIdentificación"] },
                    { name: "Porcentaje de participación", location: ["Porcentajedeparticipación"] },
                    { name: "Razón social o nombre", location: ["RazónSocialoNombre"] },
                    { name: "Telefono", location: ["Telefono"] },
                    { name: "Tipo identificación", location: ["TipoIdentificación"] },
                ]
            },
            {
                name: "Bienes garantizados",
                location: ["Bienesgarantizados"],
                nameInObject: "Bienesgarantizados",
                type: "object",
                elements: [
                    { name: "Año correspondiente al modelo", location: ["AñoCorrespondientealModelo"] },
                    { name: "DescripcióndelBien", location: ["DescripcióndelBien"] },
                    { name: "Fabricante", location: ["Fabricante"] },
                    { name: "Marca", location: ["Marca"] }
                ]
            },
            {
                name: "Deudor",
                location: ["Detalles"],
                nameInObject: "Detalles",
                type: "object",
                elements: [
                    { name: "Bien para uso", location: ["Bienparauso"] },
                    { name: "Celular", location: ["Celular"] },
                    { name: "Ciudad", location: ["Ciudad"] },
                    { name: "Correo electrónico", location: ["CorreoElectrónico"] },
                    { name: "Dirección", location: ["Dirección"] },
                    { name: "DígitoDeVerificación", location: ["DígitoDeVerificación"] },
                    { name: "Genero", location: ["Genero"] },
                    { name: "Número de identificación", location: ["NúmerodeIdentificación"] },
                    { name: "Sectores", location: ["Sectores"] },
                    { name: "Tamaño de la empresa", location: ["Tamañodelaempresa"] },
                    { name: "Telefono", location: ["Telefono"] },
                    { name: "Tipo identificación", location: ["TipoIdentificación"] },
                ]
            },
            {
                name: "Información general",
                location: ["Infogeneral"],
                nameInObject: "Infogeneral",
                type: "object",
                elements: [
                    { name: "Fecha finalización", location: ["FechaFinalización"] },
                    { name: "Fecha de inscripción en el registro especial o de celebración del contrato", location: ["Fechadeinscripciónenelregistroespecialodecelebracióndelcontrato"] },
                    { name: "Garantía inscrita en un registro especial", location: ["GarantíaInscritaenunRegistroEspecial"] },
                    { name: "Monto Máximo de la obligación garantizada", location: ["MontoMáximodelaobligacióngarantizada"] },
                    { name: "Tipo garantia", location: ["TipoGarantia"] },
                ]
            },
        ]
    },
]

export default objects;