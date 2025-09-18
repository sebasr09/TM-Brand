const objects = [
  {
    name: 'Antecedentes disciplinarios Procuraduría',
    location: 'procuraduria',
    important: true,
    details: [
      {
        name: 'Delito',
        location: [],
        nameInObject: 'delito',
        type: 'object',
        elements: [{ name: 'Delito', location: ['delito'] }]
      },
      {
        name: 'Delitos',
        location: ['datos'],
        nameInObject: 'datos',
        type: 'double array',
        elements: {
          location: ['Delitos'],
          elements: [{ name: 'Descripción del delito', location: ['Descripción del Delito'] }]
        }
      },
      // {
      //     name: "Eventos",
      //     location: ["datos"],
      //     nameInObject: "datos",
      //     type: "double array",
      //     elements: {
      //         location: ["Eventos"],
      //         elements: [
      //             { name: "Entidad", location: ["Entidad"] },
      //             { name: "Fecha acto", location: ["Fecha acto"] },
      //             { name: "Nombre causa", location: ["Nombre causa"] },
      //             { name: "Tipo de acto", location: ["Tipo acto"] }
      //         ]
      //     }
      // },
      // {
      //     name: "Instancias",
      //     location: ["datos"],
      //     type: "double array",
      //     nameInObject: "datos",
      //     elements: {
      //         location: ["Instancias"],
      //         elements: [
      //             { name: "Autoridad", location: ["Autoridad"] },
      //             { name: "Fecha providencia", location: ["Fecha providencia"] },
      //             { name: "Nombre", location: ["Nombre"] },
      //             { name: "Fecha efecto juridicos", location: ["Fecha efecto Juridicos"] }
      //         ]
      //     }
      // },
      // {
      //     name: "SIRI",
      //     location: ["datos"],
      //     nameInObject: "datos",
      //     type: "array",
      //     elements: [
      //         { name: "SIRI", location: ["SIRI"] }
      //     ]
      // },
      // {
      //     name: "Sanciones",
      //     location: ["datos"],
      //     nameInObject: "datos",
      //     type: "double array",
      //     elements: {
      //         location: ["Sanciones"],
      //         elements: [
      //             { name: "Clase", location: ["Clase"] },
      //             { name: "Sanción", location: ["Sanción"] },
      //             { name: "Suspendida", location: ["Suspendida"] },
      //             { name: "Término", location: ["Término"] }
      //         ]
      //     }
      // },
      {
        name: 'Inhabilidades',
        location: ['inhabilidades'],
        nameInObject: 'inhabilidades',
        type: 'array',
        elements: [
          { name: 'Fecha de inicio', location: ['Fecha de inicio'] },
          { name: 'Fecha fin', location: ['Fecha fin'] },
          { name: 'Inhabilidad legal', location: ['Inhabilidad legal'] },
          { name: 'Módulo', location: ['Módulo'] },
          { name: 'SIRI', location: ['SIRI'] }
        ]
      }
    ]
  },
  {
    name: 'Contraloría',
    location: 'contraloria',
    important: true
  },
  {
    name: 'Rama Judicial sistema TYBA',
    location: 'juzgados_tyba',
    important: true,
    details: [
      {
        name: 'Información del proceso',
        location: [],
        nameInObject: 'CODIGO PROCESO',
        type: 'object',
        elements: [
          { name: 'Código del proceso', location: ['CODIGO PROCESO'] },
          { name: 'Despacho', location: ['DESPACHO'] }
        ]
      },
      {
        name: 'Detalle del proceso',
        location: ['INFO PROCES0'],
        nameInObject: 'INFO PROCES0',
        type: 'object',
        elements: [
          { name: 'Tipo proceso', location: ['Tipo Proceso'] },
          { name: 'Clase proceso', location: ['Clase Proceso'] },
          { name: 'Subclase Proceso', location: ['Subclase Proceso'] },
          { name: 'Departamento', location: ['Departamento'] },
          { name: 'Ciudad', location: ['Ciudad'] },
          { name: 'Corporación', location: ['Corporación'] },
          { name: 'Especialidad', location: ['Especialidad'] },
          { name: 'Distrito/Circuito', location: ['Distrito\\Circuito'] },
          { name: 'Número Despacho', location: ['Número despacho'] },
          { name: 'Despacho', location: ['Despacho'] },
          { name: 'Fecha Publicación', location: ['Fecha Publicación'] },
          { name: 'Fecha Providencia', location: ['Fecha Providencia'] },
          { name: 'Fecha Finalización', location: ['Fecha Finalización'] },
          { name: 'Tipo decisión', location: ['Tipo Decisión'] },
          { name: 'Observaciones Finalización', location: ['Observaciones Finalización'] }
        ]
      },
      {
        name: 'Sujetos',
        location: ['INFO PROCES0', 'sujetos'],
        nameInObject: 'INFO PROCES0',
        type: 'array',
        elements: [
          {
            name: 'Nombre(s) y apellido(s)/Razón social',
            location: ['NOMBRE(S) Y APELLIDO(S) / RAZÓN SOCIAL'],
            type: 'title'
          },
          { name: 'Tipo de identificación', location: ['TIPO DOCUMENTO'] },
          { name: 'Número de identificación', location: ['NÚMERO DE IDENTIFICACIÓN'] },
          { name: 'Fecha registro', location: ['FECHA REGISTRO'] }
        ]
      },
      {
        name: 'Ciclos',
        location: ['INFO PROCES0', 'actuaciones'],
        nameInObject: 'INFO PROCES0',
        type: 'array',
        elements: [
          { name: 'Ciclo', location: ['CICLO'], type: 'title' },
          { name: 'Tipo de actuación', location: ['TIPO ACTUACIÓN'] },
          { name: 'Fecha de actuación', location: ['FECHA ACTUACIÓN'] },
          { name: 'Fecha de registro', location: ['FECHA DE REGISTRO'] }
        ]
      }
    ]
  },
  {
    name: 'LISTAS y PEPS (Personas expuestas política y socialmente)',
    location: 'peps',
    important: true,
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'TIPO_LISTA',
        elements: [
          { name: 'Tipo lista', location: ['TIPO_LISTA'], type: 'title' },
          { name: 'Origen lista', location: ['ORIGEN_LISTA'] },
          { name: 'Código', location: ['CODIGO'] },
          { name: 'Nombre completo', location: ['NOMBRECOMPLETO'] },
          { name: 'Primer nombre', location: ['PRIMER_NOMBRE'] },
          { name: 'Segundo nombre', location: ['SEGUNDO_NOMBRE'] },
          { name: 'Primer apellido', location: ['PRIMER_APELLIDO'] },
          { name: 'Segundo apellido', location: ['SEGUNDO_APELLIDO'] },
          { name: 'Tipo persona', location: ['TIPO_PERSONA'] },
          { name: 'Tipo identificación', location: ['TIPO_ID'] },
          { name: 'Identificación', location: ['ID'] },
          { name: 'Relacionado con', location: ['RELACIONADO_CON'] },
          { name: 'Rol o descripción 1', location: ['ROL_O_DESCRIPCION1'] },
          { name: 'Rol o descripción 2', location: ['ROL_O_DESCRIPCION2'] },
          { name: 'AKA', location: ['AKA'] },
          { name: 'Fuente', location: ['FUENTE'] },
          { name: 'Fecha update', location: ['FECHA_UPDATE'] },
          { name: 'Fecha final rol', location: ['FECHA_FINAL_ROL'] },
          { name: 'Nacionalidad/País de origen', location: ['NACIONALIDAD_PAISORIGEN'] },
          { name: 'Dirección', location: ['DIRECCION'] },
          { name: 'Estado', location: ['ESTADO'] },
          { name: 'Llave imagen', location: ['LLAVEIMAGEN'] }
        ]
      }
    ]
  },
  {
    name: 'LISTAS y PEPS (Personas expuestas política y socialmente) Por denominación',
    location: 'peps2',
    important: true,
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'Doc',
        elements: [
          { name: 'Doc', location: ['Doc'], type: 'title' },
          { name: 'Nombre', location: ['Nombre'] },
          { name: 'Información', location: ['Info'] }
        ]
      }
    ]
  },
  {
    name: 'OFAC (Lista Clinton)',
    location: 'ofac',
    important: true,
    details: [
      {
        name: 'Nombre',
        location: [],
        nameInObject: 'nombre',
        type: 'object',
        elements: [{ name: 'Nombre', location: [] }]
      },
      {
        name: 'Tipo',
        location: [],
        nameInObject: 'tipo',
        type: 'object',
        elements: [{ name: 'Tipo', location: [] }]
      },
      {
        name: 'Puntaje',
        location: [],
        nameInObject: 'puntaje',
        type: 'object',
        elements: [{ name: 'Puntaje', location: [] }]
      },
      {
        name: 'Programa',
        location: [],
        nameInObject: 'programa',
        type: 'object',
        elements: [{ name: 'Programa', location: [] }]
      },
      {
        name: 'Lista',
        location: [],
        nameInObject: 'lista',
        type: 'object',
        elements: [{ name: 'Lista', location: [] }]
      },
      {
        name: 'Dirección',
        location: [],
        nameInObject: 'direccion',
        type: 'object',
        elements: [{ name: 'Dirección', location: [] }]
      }
    ]
  },
  {
    name: 'Consejo de Seguridad de la ONU',
    location: 'lista_onu',
    important: true
  },
  {
    name: 'SECOP',
    location: 'secop',
    important: true,
    details: [
      {
        name: 'Información del proceso',
        location: [],
        nameInObject: 'cuantia_proceso',
        type: 'object',
        elements: [
          { name: 'Cuantía proceso', location: ['cuantia_proceso'] },
          { name: 'Detalle del objeto a contratar', location: ['detalle_del_objeto_a_contratar'] },
          { name: 'Estado del proceso', location: ['estado_del_proceso'] },
          { name: 'Fecha de firma del contrato', location: ['fecha_de_firma_del_contrato'] },
          { name: 'Nombre de la entidad', location: ['nombre_de_la_entidad'] },
          { name: 'Nombre del representante legal', location: ['nombre_del_represen_legal'] },
          { name: 'Ruta del proceso en secop', location: ['ruta_proceso_en_secop_i'] },
          { name: 'Tipo de contrato', location: ['tipo_de_contrato'] },
          { name: 'Tipo de proceso', location: ['tipo_de_proceso'] }
        ]
      }
    ]
  },
  {
    name: 'SECOP 2',
    location: 'secop2',
    important: true,
    details: [
      {
        name: 'Información del proceso',
        location: [],
        nameInObject: 'departamento',
        type: 'object',
        elements: [
          { name: 'Departamento', location: ['departamento'] },
          { name: 'Descripcion del contrato', location: ['descripcion_contrato'] },
          { name: 'Entidad compradora', location: ['entidad_compradora'] },
          { name: 'Entidad proveedora', location: ['entidad_proveedora'] },
          { name: 'Estado contrato', location: ['estado_contrato'] },
          { name: 'Fecha inicio contrato', location: ['fecha_inicio_contrato'] },
          { name: 'Fecha fin contrato', location: ['fecha_fin_contrato'] },
          { name: 'Modalidad contratación', location: ['modalidad_contratacion'] },
          { name: 'Municipio', location: ['municipio'] },
          { name: 'Tipo de contrato', location: ['tipo_de_contrato'] },
          { name: 'Url del contrato', location: ['urlcontrato'] },
          { name: 'Valor del contrato', location: ['valor_contrato'] }
        ]
      }
    ]
  },
  {
    name: 'Sancionados del SECOP',
    location: 'secop_s',
    important: true,
    details: [
      {
        name: 'Información del proceso',
        location: [],
        nameInObject: 'documento_contratista',
        type: 'object',
        elements: [
          { name: 'Documento contratista', location: ['documento_contratista'] },
          { name: 'Fecha de publicación', location: ['fecha_de_publicacion'] },
          { name: 'Municipio', location: ['municipio'] },
          { name: 'Nombre contratista', location: ['nombre_contratista'] },
          { name: 'Nombre entidad', location: ['nombre_entidad'] },
          { name: 'Número de contrato', location: ['numero_de_contrato'] },
          { name: 'Número de resolución', location: ['numero_de_resolucion'] },
          { name: 'Orden', location: ['orden'] },
          { name: 'Ruta de proceso', location: ['ruta_de_proceso'] },
          { name: 'Valor sanción', location: ['valor_sancion'] }
        ]
      }
    ]
  },
  {
    name: 'RUNT',
    location: 'runt_app',
    details: [
      {
        name: 'Licencias',
        nameInObject: 'licencia',
        location: ['licencias'],
        type: 'array',
        elements: [
          { name: 'Número de licencia', location: ['noLicencia'], type: 'title' },
          { name: 'Fecha de vencimiento', location: ['fechaVencimiento'] },
          { name: 'Fecha de expedición', location: ['fechaExpedicion'] },
          { name: 'Categoría', location: ['categoria'] },
          { name: 'Estado', location: ['estado'] },
          { name: 'Sustrato', location: ['sustrato'] }
        ]
      },
      {
        name: 'Nombres',
        location: [],
        nameInObject: 'nombres',
        type: 'object',
        elements: [{ name: 'Nombres', location: [] }]
      },
      {
        name: 'Multas',
        nameInObject: 'multa',
        location: [],
        type: 'object',
        elements: [
          { name: 'Estado paz y salvo', location: ['estadoPazSalvo'] },
          { name: 'Número paz y salvo', location: ['numeroPazSalvo'] },
          { name: 'Número comparendos', location: ['numeroComparendos'] },
          { name: 'Estado suspensión', location: ['estadoSuspension'] },
          { name: 'Fecha suspensión', location: ['fechaSuspension'] },
          { name: 'Estado cancelación', location: ['estadoCancelacion'] },
          { name: 'Fecha cancelación', location: ['fechaCancelacion'] }
        ]
      }
    ]
  },
  {
    name: 'SIMUR (Histórico de multas en Bogotá)',
    location: 'simur',
    important: true,
    details: [
      {
        name: 'Información del proceso',
        location: [],
        nameInObject: 'Placa',
        type: 'object',
        elements: [
          { name: 'Placa', location: ['Placa'] },
          { name: 'Número', location: ['No'] },
          { name: 'Fecha infracción', location: ['Fecha Infracción'] },
          { name: 'Número comparendo', location: ['No Comparendo'] },
          { name: 'Número documento', location: ['No Documento'] }
        ]
      }
    ]
  },
  {
    name: 'FOPEP (Fondo de Pensiones Públicas del Nivel Nacional)',
    location: 'fopep',
    important: false,
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'error',
        elements: [{ name: 'Error', location: [] }]
      }
    ]
  },
  {
    name: 'Sisben',
    location: 'sisben',
    important: false,
    details: [
      {
        location: [],
        nameInObject: 'Actualizacion ficha',
        type: 'object',
        elements: [{ name: 'Actualización ficha', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Actualizacion persona',
        type: 'object',
        elements: [{ name: 'Actualizacion persona', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Apellido',
        type: 'object',
        elements: [{ name: 'Apellido', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Departamento',
        type: 'object',
        elements: [{ name: 'Departamento', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Estado',
        type: 'object',
        elements: [{ name: 'Estado', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Fecha ingreso',
        type: 'object',
        elements: [{ name: 'Fecha ingreso', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Ficha',
        type: 'object',
        elements: [{ name: 'Ficha', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Municipio',
        type: 'object',
        elements: [{ name: 'Municipio', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Nombre',
        type: 'object',
        elements: [{ name: 'Nombre', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Puntaje',
        type: 'object',
        elements: [{ name: 'Puntaje', location: [] }]
      }
    ]
  },
  {
    name: 'RUES (Registro único empresarial y social)',
    location: 'rues',
    important: false,
    details: [
      {
        name: 'Clase',
        location: [],
        nameInObject: 'clase_identificacion',
        type: 'object',
        elements: [{ name: 'Clase', location: [], type: 'title' }]
      },
      {
        name: 'NIT',
        location: [],
        nameInObject: 'nit',
        type: 'object',
        elements: [{ name: 'NIT', location: [], type: 'title' }]
      },
      {
        name: 'Estado',
        location: [],
        nameInObject: 'estado',
        type: 'object',
        elements: [{ name: 'Estado', location: [], type: 'title' }]
      },
      {
        name: 'Cámara',
        location: [],
        nameInObject: 'codigo_camara',
        type: 'object',
        elements: [{ name: 'Cámara', location: [], type: 'title' }]
      },
      {
        name: 'Ciudad',
        location: [],
        nameInObject: 'nombre_camara',
        type: 'object',
        elements: [{ name: 'Ciudad', location: [], type: 'title' }]
      },
      {
        name: 'Matricula',
        location: [],
        nameInObject: 'matricula',
        type: 'object',
        elements: [{ name: 'Matricula', location: [], type: 'title' }]
      },
      {
        name: 'Categoría',
        location: [],
        nameInObject: 'categoria_matricula',
        type: 'object',
        elements: [{ name: 'Categoría', location: [], type: 'title' }]
      },
      {
        name: 'Identificación',
        location: [],
        nameInObject: 'identificacion',
        type: 'object',
        elements: [{ name: 'Identificación', location: [], type: 'title' }]
      },
      {
        name: 'Razón social',
        location: [],
        nameInObject: 'razon_social',
        type: 'object',
        elements: [{ name: 'Razón social', location: [], type: 'title' }]
      },
      {
        name: 'Registro mercantil',
        location: [],
        type: 'object',
        nameInObject: 'registro_mercantil',
        elements: [
          { name: 'Número de matrícula', location: ['numero_de_matricula'] },
          { name: 'Último año de renovado', location: ['ultimo_año_renovado'] },
          { name: 'Fecha de renovación', location: ['fecha_de_renovacion'] },
          { name: 'Fecha de matrícula', location: ['fecha_de_matricula'] },
          { name: 'Fecha de vigencia', location: ['fecha_de_vigencia'] },
          { name: 'Estado de la matrícula', location: ['estado_de_la_matricula'] },
          { name: 'Fecha de cancelación', location: ['fecha_de_cancelación'] },
          { name: 'Motivo de cancelación', location: ['motivo_cancelación'] },
          { name: 'Tipo de organización', location: ['tipo_de_organizacion'] },
          { name: 'Categoría de la matrícula', location: ['categoria_de_la_matricula'] },
          { name: 'Empleados', location: ['empleados'] },
          { name: 'Afiliado', location: ['afiliado'] },
          { name: 'Beneficiario ley 1780', location: ['beneficiario_ley_1780?'] },
          { name: 'Municipio comercial', location: ['municipio_comercial'] },
          { name: 'Dirección comercial', location: ['dirección_comercial'] },
          { name: 'Teléfono comercial', location: ['teléfono_comercial'] },
          { name: 'Municipio fiscal', location: ['municipio_fiscal'] },
          { name: 'Teléfono fiscal', location: ['teléfono_fiscal'] },
          { name: 'Correo electrónico comercial', location: ['correo_electrónico_comercial'] },
          { name: 'Correo electrónico fiscal', location: ['correo_electrónico_fiscal'] }
        ]
      },
      {
        name: 'Actividades económicas',
        location: [],
        nameInObject: 'actividades_economicas',
        type: 'array',
        elements: [{ name: 'Detalle', location: [], type: 'title' }]
      }
    ]
  },
  {
    name: 'Noticias reputacionales español',
    location: 'google',
    important: true,
    type: 'Array',
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'title',
        elements: [
          { name: 'Palabra clave', location: ['keyword'], type: 'title' },
          { name: 'Titulo', location: ['title'] },
          { name: 'Descipción', location: ['description'] },
          { name: 'Link', location: ['link'] },
          { name: 'Error', location: ['Error'] }
        ]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'Error',
        elements: [{ name: 'Error', location: ['Error'] }]
      }
    ]
  },
  {
    name: 'Noticias reputacionales Inglés',
    location: 'ddg',
    important: true,
    type: 'Array',
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'title',
        elements: [
          { name: 'Titulo', location: ['title'], type: 'title' },
          { name: 'Palabra clave', location: ['keyword'] },
          { name: 'Descipción', location: ['description'] },
          { name: 'Link', location: ['link'] },
          { name: 'Error', location: ['Error'] }
        ]
      }
    ]
  },
  {
    name: 'Contadores',
    location: 'contadores_s',
    important: false,
    details: [
      {
        name: 'Información general',
        location: [],
        nameInObject: 'c_dula',
        type: 'object',
        elements: [
          { name: 'Cédula', location: ['c_dula'] },
          { name: 'Contador', location: ['contador'] },
          { name: 'Fecha ejecutoría', location: ['fecha_ejecutoria'] },
          { name: 'Fecha inicio', location: ['fecha_inicio'] },
          { name: 'Fecha fin', location: ['fecha_fin'] },
          { name: 'Fecha registro', location: ['fecha_registro'] },
          { name: 'Meses', location: ['meses'] },
          { name: 'Proceso jurídico', location: ['proceso_jur_dico'] },
          { name: 'Resolución', location: ['resoluci_n'] },
          { name: 'Tipo', location: ['tipo'] }
        ]
      }
    ]
  },
  {
    name: 'Libreta militar',
    location: 'libretamilitar',
    important: false,
    type: 'object',
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'error',
        elements: [{ name: 'Error', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'clase',
        elements: [{ name: 'Clase', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'documento',
        elements: [{ name: 'Documento', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'nombre',
        elements: [{ name: 'Nombre', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'tipo_documento',
        elements: [{ name: 'Tipo documento', location: [] }]
      }
    ]
  },
  {
    name: 'Policia',
    location: 'policia',
    important: true
  },
  {
    name: 'Registraduria - puesto de votación',
    location: 'registraduria_mesa',
    important: false,
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'info',
        elements: [{ name: 'Detalles', location: [] }]
      }
    ]
  },
  {
    name: 'Registraduria - certificado',
    location: 'registraduria_certificado',
    important: false,
    details: [
      {
        name: 'Nombre',
        location: [],
        nameInObject: 'nombre',
        type: 'object',
        elements: [{ name: 'nombre', location: [] }]
      },
      {
        name: 'Cédula',
        location: [],
        nameInObject: 'cedula',
        type: 'object',
        elements: [{ name: 'Cédula', location: [] }]
      },
      {
        name: 'Estado',
        location: [],
        nameInObject: 'estado',
        type: 'object',
        elements: [{ name: 'Estado', location: [] }]
      },
      {
        name: 'Fecha de expedición',
        location: [],
        nameInObject: 'fecha_exp',
        type: 'object',
        elements: [{ name: 'Fecha de expedición', location: [] }]
      },
      {
        name: 'Lugar de expedición',
        location: [],
        nameInObject: 'lugar_exp',
        type: 'object',
        elements: [{ name: 'Lugar de expedición', location: [] }]
      }
    ]
  },
  {
    name: 'Registraduria - Solicitud duplicado de documento',
    location: 'registraduria_solicitud',
    important: false
  },
  {
    name: 'Registro nacional de medidas correctivas. ',
    location: 'rnmc',
    important: true,
    details: [
      {
        location: [],
        nameInObject: 'Departamento',
        type: 'object',
        elements: [{ name: 'Departamento', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Detalles',
        type: 'object',
        elements: [{ name: 'Detalles', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Expendiente',
        type: 'object',
        elements: [{ name: 'Expendiente', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Fecha',
        type: 'object',
        elements: [{ name: 'Fecha', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Formato',
        type: 'object',
        elements: [{ name: 'Formato', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Identificacion',
        type: 'object',
        elements: [{ name: 'Identificacion', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Infractor',
        type: 'object',
        elements: [{ name: 'Infractor', location: [] }]
      },
      {
        location: [],
        nameInObject: 'Municipio',
        type: 'object',
        elements: [{ name: 'Municipio', location: [] }]
      },
      {
        location: [],
        nameInObject: 'apelacion',
        type: 'object',
        elements: [{ name: 'apelacion', location: [] }]
      },
      {
        location: [],
        nameInObject: 'articulo',
        type: 'object',
        elements: [{ name: 'articulo', location: [] }]
      },
      {
        location: [],
        nameInObject: 'expediente',
        type: 'object',
        elements: [{ name: 'expediente', location: [] }]
      }
    ]
  },
  {
    name: 'Registro único tributario (RUT)',
    location: 'rut',
    important: false
  },
  {
    name: 'Registro único tributario (RUT) - estado',
    location: 'rut_estado',
    important: false
  },
  {
    name: 'SENA',
    location: 'sena',
    important: false,
    type: 'Array',
    details: [
      {
        name: 'Curso',
        location: [],
        type: 'object',
        nameInObject: 'Certificación',
        elements: [
          { name: 'Certificación', location: ['Certificación'], type: 'Certificación' },
          { name: 'Descarga', location: ['Descarga'] },
          { name: 'Firma Certificado', location: ['Firma Certificado'] },
          { name: 'Programa', location: ['Programa'] },
          { name: 'Registro', location: ['Registro'] },
          { name: 'Tipo', location: ['Tipo'] },
          { name: 'Titulo', location: ['Titulo'] }
        ]
      }
    ]
  },
  {
    name: 'Siste de Información de Conductores que Transportan Mercancías Peligrosas - SISCONMP',
    location: 'sisconmp',
    important: false,
    details: [
      {
        location: [],
        type: 'object',
        nameInObject: 'DIVCODIGSede',
        elements: [{ name: 'DIVCODIGSede', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'DCInstitucionEducativa',
        elements: [{ name: 'DC Institución Educativa', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'ValorNumericoClase',
        elements: [{ name: 'Valor númerico clase', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'FechaExpedicionLicencia',
        elements: [{ name: 'Fecha expedición licencia', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'Clase',
        elements: [{ name: 'Clase', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'TipoCapacitacion',
        elements: [{ name: 'Tipo capacitación', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'NumeroLicencia',
        elements: [{ name: 'Número licencia', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'NombreSede',
        elements: [{ name: 'Nombre sede', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'InstitucionEducativa',
        elements: [{ name: 'Institución educativa', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'FechaVencimiento',
        elements: [{ name: 'Fecha vencimiento', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'NDI',
        elements: [{ name: 'NDI', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'NITInstitucionEducativa',
        elements: [{ name: 'NIT institución educativa', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'DIVNOMBRSede',
        elements: [{ name: 'DIV NOMBRSede', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'EntidadCertificadora',
        elements: [{ name: 'Entidad certificadora', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'TDI',
        elements: [{ name: 'TDI', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'FechaExpedicion',
        elements: [{ name: 'Fecha expedición', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'TipoVehiculo',
        elements: [{ name: 'Tipo vehículo', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'FechaVencimientoLicencia',
        elements: [{ name: 'Fecha vencimiento licencia', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'Nombres',
        elements: [{ name: 'Nombres', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'DescripcionClase',
        elements: [{ name: 'Descripción clase', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'NombreCapacitacion',
        elements: [{ name: 'Nombre capacitación', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'NIDSede',
        elements: [{ name: 'NID sede', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'Apellidos',
        elements: [{ name: 'Apellidos', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'NombreArchivo',
        elements: [{ name: 'Nombre archivo', location: [] }]
      },
      {
        location: [],
        type: 'object',
        nameInObject: 'Inactivo',
        elements: [{ name: 'Inactivo', location: [] }]
      }
    ]
  },
  {
    name: 'Multas de tránsito Bogotá',
    location: 'transitobog',
    important: true
  },
  {
    name: 'Sistema integrado de información sobre multas y sanciones por infracciones de tránsito - SIMIT',
    location: 'simit',
    important: true
  }
];

export default objects;
