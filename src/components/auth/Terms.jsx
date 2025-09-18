import { Button, Dialog, Slide, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { postApi } from "../api/apiManager"
import Colors from '../../constants/Colors';
import MarkdownElement from '../common/MarkdownElement';

const terms = `Los siguientes términos y condiciones regulan el uso del sitio web de dominio de la empresa TradeMate representada en Colombia por TradeMate S.A.S (www.trademate.tech). Por favor lea atentamente estos términos y condiciones antes de empezar a usar el presente sitio web. Si el usuario no acepta estos términos y condiciones o si el usuario es menor de 18 años no debe usar nuestro sitio web. Usando este sitio web el usuario acepta conocer y aceptar cada uno de los términos y condiciones establecidos por la empresa TradeMate S.A.S., a través de su sitio web: www.tradeMate.tech.

<h4>Definiciones</h4>


**De la empresa TradeMate S.A.S.:** TradeMate S.A.S. (en adelante, la empresa) es una sociedad constituida conforme a las leyes Colombianas, cuya actividad principal es desarrollar soluciones web de uso libre que permitan a los usuarios comparar diferentes ofertas de productos y servicios, de manera gratuita y simple.

La prestación de servicios al usuario por parte de la empresa es gratuita. Su objetivo consiste exclusivamente en indicar los proveedores donde el usuario puede encontrar el producto deseado.

**Del usuario:** Se entiende por usuario a aquella persona natural o jurídica que hace uso del sitio web www.trademate.tech, con la finalidad de acceder a la prestación de servicios brindados gratuitamente por la empresa TradeMate S.A.S.

Entre el usuario y la empresa TradeMate S.A.S. no hay dependencia económica ni ningún tipo de onerosidad en las prestaciones, razón por la cual no se configura una relación de consumo. Todo servicio brindado por la empresa al usuario es gratuito.

**Del sitio web:** Cualquier referencia realizada al sitio web se entenderá hecha con referencia al dominio www.trademate.tech, de propiedad de la empresa TradeMate representada en Colombia por TradeMate S.A.S.

<h4>Tasas</h4>


TradeMate expone información sobre productos financieros que es obtenida de información pública que es adquirida de los sitios web de las Compañías y Entidades que aquí se presentan. Esta información tiene carácter informativo y referencial y no constituye una oferta de los productos que se presentan. A pesar de la tarea de actualización constante de datos, TradeMate no garantiza que la información presentada sea correcta y que refleje las condiciones exactas de los productos mostrados, por lo tanto queda exenta de cualquier responsabilidad asociada a la información mostrada.

<h4>1. Términos de uso, condiciones de uso del sitio web y su aceptación</h4>


El usuario se obliga a abstenerse de utilizar el sitio web y los servicios con fines ilícitos, lesivos de los derechos e intereses de terceros, o de modo tal pueda dañar, inutilizar, sobrecargar o deteriorar el portal y los servicios, o impedir su normal utilización o disfrute.

El sitio web se reserva el derecho a denegar el acceso al sitio web y/o a los servicios, en cualquier momento y sin necesidad de preaviso, a aquellos usuarios que incumplan las condiciones de uso.

El usuario responderá de los daños y perjuicios de toda naturaleza que el sitio web pueda sufrir, directa o indirectamente, como consecuencia del incumplimiento de cualquiera de las obligaciones derivadas de las condiciones de uso o de la ley, en relación con la utilización del sitio web.

Acceso al sitio web y a su contenido. La empresa procurará proveer al usuario un acceso ininterrumpido al sitio web, mas no asegura que eso suceda siempre, por lo cual no se hace responsable del término, suspensión o restricción del acceso al sitio web en cualquier momento.

El sitio web cambia regularmente. La empresa hace el mayor esfuerzo razonable para asegurar que el contenido del sitio web esté actualizado y libre de errores, razón por la cual realiza actualizaciones diariamente, las cuales no es posible de notificar al usuario en cada una de ellas.

Derechos de propiedad intelectual. Los logos denotados con ® son marcas registradas de la empresa. La empresa es una marca registrada y no se puede usar sin permiso por escrito de la empresa.

La empresa también posee los derechos de propiedad intelectual y las licencias sobre el sitio web, las cuales incluyen el software usado para correr el sitio web y todo el material que se publicita en el mismo.

El usuario acepta que la empresa disponga de su propiedad intelectual para su uso personal únicamente. El usuario no debe copiar, alterar, modificar, vender, distribuir, publicitar o crear un trabajo deliberado a partir de cualquier material publicado o creado por el sitio web, sin permiso por escrito.

<h4>2. Objeto</h4>


El sitio web tiene por objeto la difusión de información referida a los ámbitos bancario, financiero, de seguros y telecomunicaciones.

La empresa se reserva el derecho a modificar unilateralmente, en cualquier momento y sin aviso previo, la presentación y configuración del sitio web, así como también se reserva el derecho a modificar o eliminar, en cualquier momento y sin previo aviso, los servicios y las condiciones requeridas para acceder y/o utilizar el sitio web y los servicios.

<h4>3. Exclusión de garantías y de responsabilidad</h4>


La empresa no garantiza la disponibilidad y continuidad del funcionamiento del sitio web y de los servicios.

El usuario es consciente y acepta voluntariamente que el uso del sitio web, de los servicios y de cualesquiera de sus contenidos tiene lugar, en todo caso, bajo su única y exclusiva responsabilidad.

La empresa no se responsabiliza de la utilidad o infalibilidad del sitio web y de los servicios para la toma de decisiones en el campo empresarial, de las finanzas personales o cualquier otro ámbito.

La empresa se exime de responsabilidad por daños y perjuicios de toda naturaleza que puedan resultar como efecto de la falta de exactitud, veracidad, exhaustividad y/o actualidad de los contenidos, por cuanto el servicio brindado por la empresa es meramente de promoción y referencia de servicios ofertados por terceros, conforme a la información que estos ofrecen en sus respectivas website.

La función de los links que aparecen en el sitio web es exclusivamente la de informar al usuario acerca de la existencia de otras fuentes de información disponibles en internet y, por ello la empresa no será responsable por el contenido de los mismos, eximiéndose de tal modo de toda responsabilidad respecto a la información que se halle fuera de este sitio web y aquella no gestionada directamente por nuestro director de desarrollo web.

La empresa deslinda cualquier responsabilidad respecto a la calidad y veracidad de los bienes y/o servicios ofrecidos por los anunciantes que son promocionados y/o referenciados en el presente sitio web.

<h4>3.1. Exclusión de garantías y de responsabilidad por el funcionamiento del sitio web y de los servicios.</h4>


<h5>3.1.1. Disponibilidad y continuidad.</h5>


La empresa no garantiza la disponibilidad y continuidad del funcionamiento del sitio web y de los servicios.

La empresa se exime de toda responsabilidad por los daños y perjuicios que puedan generarse por la falta de disponibilidad o de continuidad del funcionamiento del sitio web y de los servicios.

<h5>3.1.2. Utilidad.</h5>


La empresa no garantiza que el sitio web y los servicios sean útiles para la realización de ninguna actividad en particular, razon por la cual la empresa se exime de toda responsabilidad por los daños y perjuicios que pudieran generarse por la insatisfaccion del usuario respecto a la utilidad del sitio web.

<h5>3.1.3. Fiabilidad.</h5>


La empresa no garantiza la fiabilidad del sitio web ni de los servicios, y en particular, aunque no de modo exclusivo, que los usuarios puedan efectivamente acceder a las distintas páginas web promocionadas y/o referenciadas a través del sitio web o a los distintos servicios, ni que a través de éstos se puedan transmitir, difundir, almacenar o poner a disposición de terceros los contenidos, o recibir, obtener o acceder a los contenidos.

La empresa excluye toda responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la falta de fiabilidad del sitio web y de los servicios, y en particular, aunque no de modo exclusivo, a los fallos en el acceso a las distintas páginas web del sitio o a los distintos servicios, así como a los fallos en la transmisión, difusión, almacenamiento o puesta a disposición de terceros de los contenidos o en la recepción, obtención o acceso a los contenidos.

<h4>3.2. Exclusión de garantías y de responsabilidad por los contenidos y por los servicios prestados por terceros a través del sitio web.</h4>


<h5>3.2.1. Calidad.</h5>


La empresa no controla con carácter previo y no garantiza la ausencia de virus en los contenidos, ni la ausencia de otros elementos en los contenidos que puedan producir alteraciones en su sistema informático (software y hardware), o en los documentos electrónicos y ficheros almacenados en su sistema informático, razón por la cual la empresa se exime de cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la presencia de virus o a la presencia de otros elementos lesivos en los contenidos.

<h5>3.2.2. Licitud, fiabilidad y utilidad.</h5>


La empresa no garantiza la licitud, fiabilidad y utilidad de los contenidos.

La empresa no asume responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos, y en particular, aunque no de modo exclusivo, por los daños y perjuicios que puedan deberse a:



1. el incumplimiento de la ley, la moral y las buenas costumbres generalmente aceptadas o el orden público como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos;
2. la infracción de los derechos de propiedad intelectual e industrial, de los secretos empresariales, de compromisos contractuales de cualquier clase, de los derechos al honor, a la intimidad personal y familiar y a la imagen de las personas, de los derechos de propiedad y de toda otra naturaleza pertenecientes a un tercero, como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos;
3. la realización de actos de competencia desleal y publicidad ilícita como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos;
4. la falta de veracidad, exactitud, exhaustividad, pertinencia y/o actualidad de los contenidos;
5. la inadecuación para cualquier clase de propósito de y la defraudación de las expectativas generadas por los contenidos;
6. el incumplimiento, retraso en el cumplimiento, cumplimiento defectuoso o terminación por cualquier causa de las obligaciones contraídas por terceros y contratos realizados con terceros a través de o con motivo del acceso a los contenidos;
7. los vicios y defectos de toda clase de los contenidos transmitidos, difundidos, almacenados, puestos a disposición o de otra forma transmitidos o puestos a disposición, recibidos, obtenidos o a los que se haya accedido a través del sitio web o de los servicios.

<h4>3.3. Exclusión de garantías y de responsabilidad por los servicios y contenidos alojados fuera del sitio web.</h4>


El sitio web pone a disposición de los usuarios dispositivos técnicos de enlace (tales como, entre otros, links, banners, botones), directorios y herramientas de búsqueda que permiten a los usuarios acceder a sitios web pertenecientes a terceros (en adelante, "sitios enlazados"). La instalación de estos enlaces, directorios y herramientas de búsqueda en el sitio web tiene por único objeto facilitar a los usuarios la búsqueda de y acceso a la información disponible en internet, y no presupone que exista ninguna clase de vínculo o asociación entre la empresa y los operadores de los sitios enlazados.

La empresa no controla previamente, aprueba ni hace propios los servicios, información, datos, archivos, productos y cualquier clase de material existente en los sitios enlazados. El usuario, por tanto, debe extremar la prudencia en la valoración y utilización de los servicios, información, datos, archivos, productos y cualquier clase de material existente en los sitios enlazados.

La empresa no garantiza ni asume ningún tipo de responsabilidad por los daños y perjuicios de toda clase que puedan deberse a:



1. el funcionamiento, disponibilidad, accesibilidad o continuidad de los sitios enlazados;
2. el mantenimiento de los servicios, información, datos, archivos, productos y cualquier clase de material existente en los sitios enlazados;
3. la prestación o transmisión de los servicios, información, datos, archivos, productos y cualquier clase de material existente en los sitios enlazados;
4. la calidad, licitud, fiabilidad y utilidad de los servicios, información, datos, archivos, productos y cualquier clase de material existente en los sitios enlazados, en los mismos términos y con el mismo alcance dispuesto en las condiciones generales 3.2 y 3.3, respecto de los contenidos y de los servicios prestados por terceros a través del sitio web.

<h4>3.4. Exclusión de garantías y de responsabilidad por la utilización del sitio web, de los servicios y de los contenidos por los usuarios.</h4>


La empresa no controla el acceso ni la utilización que los usuarios hacen del sitio web, de los servicios y de los contenidos. En particular, la empresa no garantiza que los usuarios utilicen el sitio web, los servicios y los contenidos de conformidad con la ley, estas condiciones generales y, en su caso, las condiciones particulares que resulten de aplicación, la moral y buenas costumbres generalmente aceptadas y el orden público, ni que lo hagan de forma diligente y prudente.

<h4>3.5. Identidad e información relativa a los usuarios proporcionada por los propios usuarios.</h4>


La empresa no controla ni ofrece ninguna clase de garantía sobre la identidad de los usuarios, ni sobre la veracidad, vigencia, exhaustividad y/o autenticidad de los datos que los usuarios proporcionan sobre sí mismos y proporcionan a o hacen accesibles para otros usuarios. Dentro de los datos entregados por los usuarios se incluyen los datos biométricos otorgados en el proceso de autenticación facial.

La empresa no asume ninguna responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la incorrecta identidad de los usuarios y a la falta de veracidad, vigencia, exhaustividad y/o autenticidad de la información que los usuarios proporcionan acerca de sí mismos y proporcionan o hacen accesibles para otros usuarios, y en particular, aunque no de forma exclusiva, por los daños y perjuicios de toda naturaleza que puedan deberse a la suplantación de la personalidad de un tercero efectuada por un usuario en cualquier clase de comunicación o transacción realizada a través del sitio web.

<h4>4. Manejo de información personal del usuario y Política de Privacidad</h4>


Puede revisar nuestra política de protección de datos personales referida a la Ley 1581 de 2012.

Esta sección explica qué información recogemos sobre el usuario, cómo la recogemos, cómo la almacenamos y cómo la podemos utilizar en las circunstancias en que la ofrecemos a terceros.

Para aprovechar las ventajas de algunos de los servicios ofrecidos a través de nuestro sitio web podría ser necesario que nos proporcione cierta información sobre usted. Esto puede incluir hacer el registro de sus datos de contacto o completar algunos formularios en nuestra página web. Es posible que también le pidamos que proporcione información acerca de usted, si desea participar en cualquier debate en las preguntas y respuestas, entrar en cualquier servicio que ofrecemos o utilizar un buscador o comparador en nuestra página web, o si decide ponerse en contacto con nosotros por cualquier motivo.  Dentro de los datos que eventualmente entreguen los usuarios se incluyen los datos biométricos otorgados en el proceso de autenticación facial. Los datos biométricos incluyen a su vez voz, facial, dactilar e iris. La naturaleza de nuestro servicio es tal que podemos, en ocasiones, también solicitar que proporcione datos personales (como número de documento, nombre y apellido, su estado laboral, crediticio y otros datos adicionales). Cuando lo hacemos, vamos a pedir su consentimiento explícito a la utilización de dichos datos personales. Cuando usted acepta proporcionar esta información vamos a tomar las medidas adecuadas para proteger dichos datos de índole personal.

<h4>4.1. Cookies</h4>


También podemos recopilar información acerca de su ordenador, incluyendo cuando se disponga de su dirección ip, sistema operativo y el tipo de navegador utiliza un cookie que se almacena en el disco duro de su ordenador. Los cookies nos ayudan a mejorar nuestro sitio web y ofrecer un mejor y más personalizado servicio a usted. El uso de los cookies nos permite permiten personalizar su experiencia en nuestro sitio web, acelerar sus búsquedas, seleccionar los servicios o materiales para su inclusión en el sitio web, los cuales pueden ser de interés para usted, seguimiento de los patrones de tráfico en general y el uso de nuestro sitio web para ayudarnos a mejorar nuestro servicio y diseño.

La mayoría de los navegadores aceptan automáticamente cookies, pero normalmente pueden modificar la configuración de su navegador para evitar la aceptación automática. Si usted decide no recibir cookies, puede no ser capaz de utilizar determinadas funciones de nuestro sitio web.

<h4>4.2. Almacenamiento de sus datos personales.</h4>


La información personal que obtuvimos de usted puede ser transferida y almacenada fuera del espacio económico colombiano. Para el almacenamiento de esta información personal, seguimos procedimientos estrictos de seguridad en el almacenamiento y divulgación de la información que ha proporcionado a través de este sitio web, para evitar el acceso no autorizado. Vamos a tomar todas las medidas razonables para asegurar que sus datos personales permanezcan seguros.

<h4>4.3. Usos de información del usuario.</h4>


La empresa o terceros que actúen en nuestro nombre puede utilizar su información personal de las siguientes maneras:



1. Al rellenar formularios en línea con los datos proporcionados por usted en nuestro sitio web, nosotros podemos proceder a pasárselos a los proveedores de los productos financieros, seguros y telecomunicaciones de los cuales usted está interesado, con la información necesaria para que se pongan en contacto con usted.
2. Para proporcionarle información, productos o servicios que usted pide de nosotros.
3. Para permitir a usted a participar en las funciones interactivas de nuestro servicio, cuando usted decide hacerlo.
4. Para contactar con usted por correo, teléfono o correo electrónico.
5. Para informarle sobre otros productos y servicios que pueden ser de interés para usted.

Usted podrá ser notificado de nuestras noticias, de los cambios en el sitio web, eventos especiales u otros servicios que creemos que pueden interesarle.

También podemos revelar su información personal a terceros que proporcionan productos y servicios financieros pertinentes a los productos o servicios que usted ha seleccionado en nuestro sitio web. Pensamos que podría ser de interés para usted, para que ellos también puedan proporcionarle información sobre los productos o servicios que ofrecen. Asimismo, podemos dar a conocer su información personal cuando sea necesario para cumplir con cualquier ley aplicable o para proteger a la empresa y usuarios (incluido el intercambio de información con otras empresas a los efectos de la protección contra el fraude). Asimismo, la informacion personal del usuario podra ser brindado al eventual adquirente del servicio brindado por la empresa, en el eventual caso que se realice la transferencia del negocio a una tercera persona.

<h4>4.4. Derechos del usuario</h4>


Si usted no está de acuerdo con esta política de privacidad, entonces usted no debe ingresar su información personal en ningún lugar de nuestro sitio web. Si en cualquier momento después de que usted ha proporcionado su información personal en nuestra página web, quiere oponerse a que sus datos de carácter personal sean utilizados por nosotros, tiene que hacernos llegar un correo electrónico a borrar.suscripcion@financialomejor.com. Nos esforzaremos en procesar su solicitud lo antes posible, pero en algunos casos puede llevarnos hasta treinta (30) días calendario tal accion. Nuestra política de privacidad se aplica únicamente a información recopilada por nosotros a través de nuestro sitio web. El usuario debe tener en cuenta que la empresa no se hace responsable por los contenidos brindados por terceros que ofrecen bienes y servicios a través del web site de la empresa. Por lo que se recomienda al usuario asegurarse que también lea su protección de datos y condiciones de privacidad de términos y condiciones cuidadosamente antes de darles sus datos personales.

Comentarios, sugerencias, preguntas y peticiones con respecto a nuestra política de privacidad son bienvenidos y deben ser abordados a través del correo electrónico o al info@trademate.com.

Si cualquier parte de estas condiciones es considerada ilegal, inválida o inejecutable por alguna disposición, se considerará separada de la validez y la aplicabilidad de las disposiciones restantes de estos términos, dado que no se verán afectados. Cualquier fallo de nuestra parte para hacer valer cualquier derecho no constituirá una renuncia a los mismos.

Los presentes términos y condiciones se regirán e interpretarán en conformidad con el derecho colombiano.

<h4>5. Licencia de uso</h4>


La empresa autoriza al usuario a la utilización de los derechos de propiedad intelectual e industrial y de los secretos empresariales relativos al software instalado en su equipo informático, únicamente para utilizar el sitio web y los servicios de conformidad con lo establecido en estas condiciones generales. La empresa no concede ninguna otra licencia o autorización de uso de ninguna clase sobre sus derechos de propiedad industrial e intelectual, secretos empresariales o sobre cualquier otra propiedad o derecho relacionado con el sitio web, los servicios o los contenidos.

<h4>6. Ley aplicable y jurisdicción</h4>


Estas condiciones de uso se rigen por la ley de la República del Colombia. La empresa y el usuario, con renuncia expresa a cualquier otro fuero, se someten al poder judicial colombiano.

<h4>7. Aviso de Privacidad (Ley 1581 de 2012)</h4>


TradeMate S.A.S. empresa legalmente constituida, como responsable del tratamiento de datos personales presenta lineamientos para el tratamiento de información de acuerdo a las leyes colombianas.

<h5>Método de contacto:</h5>


Todo usuario puede contactar a TradeMate para modificar, actualizar, suprimir su información comunicándose a través de los siguientes medios:



* Vía Correo Electrónico haciendo su solicitud a info@trademate.com

**Tratamiento que se dará a la información:**

Toda la información suministrada por los usuarios podrá ser utilizada con fines estadísticos, informativos o comerciales de los productos que hacen parte de las diferentes secciones actuales o futuras de comparación de trademate.tech, además los datos podrán ser transferidos únicamente a la empresa o empresas solicitadas para el ofrecimiento de productos y servicios según la elección y autorización expresa del usuario.

**Derechos del Titular:**

El titular de la información podrá modificar, actualizar, suprimir su información.

**PQR:**

En caso de tener dudas sobre el trato de su información puede contactar al área de Servicio al Usuario como se mencionó en la sección "Metodo de Contacto".

La política de tratamiento de información entra en vigencia desde su publicación y hasta cuando sea requerido por las leyes colombianas sobre el tratamiento de datos personales. Puede ver todos los detalles de nuestra política de protección de datos personales

<h4>8. Autorización de Consulta en Centrales de Riesgo</h4>


Autorizo a TradeMate S.A.S. y la(s) institución(es) seleccionada(s) a consultar ante las centrales de riesgo mi información financiera, crediticia, comercial y de servicios para completar mi proceso de solicitud.

En los casos que corresponda: Al solicitar y diligenciar el formulario de contacto el usuario autoriza a TradeMate S.A.S. con NIT 901.180.781-3 a consultar ante las centrales de riesgo su información financiera, crediticia, comercial y de servicios en el marco de la Ley 1266-2008 y normas que la regulen o modifiquen.

Esta autorización permite a TradeMate, sus representantes y se hace extensiva a la institución bancaria seleccionada por el usuario al solicitar un producto para iniciar el proceso de análisis a fin de contactar con el usuario.

Más información [Ley 1266-2008](http://www.sic.gov.co/drupal/sites/default/files/files/ley1266_31_12_2008(1).pdf)
`
export default function Terms({open, user, handleClose}) {

  const acceptTerms = async () => {
    try {
      const result = await postApi(`next-activos/acceptTerms/${user.id}`)
      console.log(result)
      handleClose()
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <Stack sx={{p: '2em 3em'}}>
        <Typography marginBottom='1em' variant='h5' textAlign='center' color={Colors.primary}><b>Terminos y condiciones</b></Typography>
        <MarkdownElement overflow='auto' renderedMarkdown={terms} />
      </Stack>
      <Button 
        fullWidth={false}
        variant="contained"
        color='primary'
        sx={{m: '1em auto'}}
        onClick={() => acceptTerms()}
      >Acepto
      </Button>
    </Dialog>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

Terms.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  handleClose: PropTypes.func
}