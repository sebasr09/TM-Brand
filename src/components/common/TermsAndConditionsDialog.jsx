import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
          id='closeTermsAndConditions'
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function TermsAndConditions({ open, handleClose }) {
  return (
    <React.Fragment>
      <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Términos y condiciones
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <div>
              <p>
                Los siguientes términos y condiciones regulan el uso del sitio web de dominio de la empresa  Mate Tech LLP 
                representada en Colombia por  Mate Tech LLP (www.trademate.tech). Por favor lea
                atentamente estos términos y condiciones antes de empezar a usar el presente sitio web. Si el usuario no
                acepta estos términos y condiciones o si el usuario es menor de 18 años no debe usar nuestro sitio web.
                Usando este sitio web el usuario acepta conocer y aceptar cada uno de los términos y condiciones
                establecidos por la empresa  Mate Tech LLP, a través de su sitio web: www.trademate.tech.
              </p>
              <h2>Definiciones</h2>
              <p>
                <strong>De la empresa  Mate Tech LLP:</strong>  Mate Tech LLP (en adelante, la
                empresa) es una sociedad constituida conforme a las leyes Colombianas, cuyo rubro principal es
                desarrollar soluciones web de uso libre que permitan a los usuarios comparar diferentes ofertas de
                productos y servicios, de manera gratuita y simple.
              </p>
              <p>
                La prestación de servicios al usuario por parte de la empresa es gratuita. Su objetivo consiste
                exclusivamente en indicar los proveedores donde el usuario puede encontrar el producto deseado.
              </p>
              <p>
                <strong>Del usuario:</strong> Se entiende por usuario a aquella persona natural o juridica que hace uso
                del sitio web www.trademate.tech, con la finalidad de acceder a la prestacion de servicios
                brindados gratuitamente por la empresa  Mate Tech LLP.
              </p>
              <p>
                Entre el usuario y la empresa  Mate Tech LLP no hay dependencia economica ni ningun tipo de
                onerosidad en las prestaciones, razón por la cual no se configura una relación de consumo. Todo servicio
                brindado por la empresa a el usuario es gratuito.
              </p>
              <p>
                <strong>Del sitio web:</strong> Cualquier referencia realizada al sitio web se entendera hecha con
                referencia al dominio www.trademate.tech, de propiedad de la empresa  Mate Tech LLP representada
                en Colombia por  Mate Tech LLP.
              </p>
              <h2>Tasas</h2>
              <p>
                 Mate Tech LLP expone información sobre productos financieros que es obtenida de información pública
                que es adquirida de los sitios web de las Compañías y Entidades que aquí se presentan. Esta información
                tiene carácter informativo y referencial y no constituye una oferta de los productos que se presentan. A
                pesar de la tarea de actualización constante de datos,  Mate Tech LLP no garantiza que la información
                presentada sea correcta y que refleje las condiciones exactas de los productos mostrados, por lo tanto
                queda exenta de cualquier responsabilidad asociada a la información mostrada.
              </p>
              <h3>1. Términos de uso, condiciones de uso del sitio web y su aceptación</h3>
              <p>
                El usuario se obliga a abstenerse de utilizar el sitio web y los servicios con fines ilícitos, lesivos
                de los derechos e intereses de terceros, o de modo tal pueda dañar, inutilizar, sobrecargar o deteriorar
                el portal y los servicios, o impedir su normal utilización o disfrute.
              </p>
              <p>
                El sitio web se reserva el derecho a denegar el acceso al sitio web y/o a los servicios, en cualquier
                momento y sin necesidad de preaviso, a aquellos usuarios que incumplan las condiciones de uso.
              </p>
              <p>
                El usuario responderá de los daños y perjuicios de toda naturaleza que el sitio web pueda sufrir,
                directa o indirectamente, como consecuencia del incumplimiento de cualquiera de las obligaciones
                derivadas de las condiciones de uso o de la ley, en relación con la utilización del sitio web.
              </p>
              <p>
                Acceso al sitio web y a su contenido. La empresa procurara proveer al usuario un acceso ininterrumpido
                al sitio web, mas no asegura que eso suceda siempre, por lo cual no se hace responsable del termino,
                suspensión o restriccion del acceso al sitio web en cualquier momento.
              </p>
              <p>
                El sitio web cambia regularmente. La empresa hace el mayor esfuerzo razonable para asegurar que el
                contenido del sitio web este actualizado y libre de errores, razón por la cual realiza actualizaciones
                diariamente, las cuales no es posible de notificar al usuario en cada uno de ellas.
              </p>
              <p>
                Derechos de propiedad intelectual. Los logos denotados con ® son marcas registradas de la empresa. La
                empresa es una marca registrada y no se puede usar sin permiso por escrito de la empresa.
              </p>
              <p>
                La empresa también posee los derechos de propiedad intelectual y las licencias sobre el sitio web, las
                cuales incluyen el software usado para correr el sitio web y todo el material que se publicita en el
                mismo.
              </p>
              <p>
                El usuario acepta que la empresa disponga de su propiedad intelectual para su uso personal únicamente.
                El usuario no debe copiar, alterar, modificar, vender, distribuir, publicitar o crear un trabajo
                deliberado a partir de cualquier material publicado o creado por el sitio web, sin permiso por escrito.
              </p>
              <h3>2. Objeto</h3>
              <p>
                El sitio web tiene por objeto la difusión de información referida a los ámbitos bancario, financiero, de
                seguros y telecomunicaciones.
              </p>
              <p>
                La empresa se reserva el derecho a modificar unilateralmente, en cualquier momento y sin aviso previo,
                la presentación y configuración del sitio web, así como también se reserva el derecho a modificar o
                eliminar, en cualquier momento y sin previo aviso, los servicios y las condiciones requeridas para
                acceder y/o utilizar el sitio web y los servicios.
              </p>
              <h3>3. Exclusión de garantías y de responsabilidad</h3>
              <p>
                La empresa no garantiza la disponibilidad y continuidad del funcionamiento del sitio web y de los
                servicios.
              </p>
              <p>
                El usuario es consciente y acepta voluntariamente que el uso del sitio web, de los servicios y de
                cualesquiera de sus contenidos tiene lugar, en todo caso, bajo su única y exclusiva responsabilidad.
              </p>
              <p>
                La empresa no se responsabiliza de la utilidad o infalibilidad del sitio web y de los servicios para la
                toma de decisiones en el campo empresarial, de las finanzas personales o cualquier otro ámbito.
              </p>
              <p>
                La empresa se exime de responsabilidad por daños y perjuicios de toda naturaleza que puedan resultar
                como efecto de la falta de exactitud, veracidad, exhaustividad y/o actualidad de los contenidos, por
                cuanto el servicio brindado por la empresa es meramente de promocion y referencia de servicios ofertados
                por terceros, conforme a la informacion que estos ofrecen en sus respectivas website.
              </p>
              <p>
                La función de los links que aparecen en el sitio web es exclusivamente la de informar al usuario acerca
                de la existencia de otras fuentes de información disponibles en internet y, por ello la empresa no será
                responsable por el contenido de los mismos, eximiendose de tal modo de toda responsabilidad respecto a
                la información que se halle fuera de este sitio web y aquella no gestionada directamente por nuestro
                director de desarrollo web.
              </p>
              <p>
                La empresa deslinda cualquier responsabilidad respecto a la calidad y veracidad de los bienes y/o
                servicios ofrecidos por los anunciantes que son promocionados y/o referenciados en el presente sitio
                web.
              </p>
              <h4>
                3.1. Exclusión de garantías y de responsabilidad por el funcionamiento del sitio web y de los servicios.
              </h4>
              <h5>3.1.1. Disponibilidad y continuidad.</h5>
              <p>
                La empresa no garantiza la disponibilidad y continuidad del funcionamiento del sitio web y de los
                servicios.
              </p>
              <p>
                La empresa se exime de toda responsabilidad por los daños y perjuicios que puedan generarse por la falta
                de disponibilidad o de continuidad del funcionamiento del sitio web y de los servicios.
              </p>
              <h5>3.1.2. Utilidad.</h5>
              <p>
                La empresa no garantiza que el sitio web y los servicios sean útiles para la realización de ninguna
                actividad en particular, razon por la cual la empresa se exime de toda responsabilidad por los daños y
                perjuicios que pudieran generarse por la insatisfaccion del usuario respecto a la utilidad del sitio
                web.
              </p>
              <h5>3.1.3. Fiabilidad.</h5>
              <p>
                La empresa no garantiza la fiabilidad del sitio web ni de los servicios, y en particular, aunque no de
                modo exclusivo, que los usuarios puedan efectivamente acceder a las distintas páginas web promocionadas
                y/o referenciadas a traves del sitio web o a los distintos servicios, ni que a través de éstos se puedan
                transmitir, difundir, almacenar o poner a disposición de terceros los contenidos, o recibir, obtener o
                acceder a los contenidos.
              </p>
              <p>
                La empresa excluye toda responsabilidad por los daños y perjuicios de toda naturaleza que pudieran
                deberse a la falta de fiabilidad del sitio web y de los servicios, y en particular, aunque no de modo
                exclusivo, a los fallos en el acceso a las distintas páginas web del sitio o a los distintos servicios,
                así como a los fallos en la transmisión, difusión, almacenamiento o puesta a disposición de terceros de
                los contenidos o en la recepción, obtención o acceso a los contenidos.
              </p>
              <h4>
                3.2. Exclusión de garantías y de responsabilidad por los contenidos y por los servicios prestados por
                terceros a través del sitio web.
              </h4>
              <h5>3.2.1. Calidad.</h5>
              <p>
                La empresa no controla con carácter previo y no garantiza la ausencia de virus en los contenidos, ni la
                ausencia de otros elementos en los contenidos que puedan producir alteraciones en su sistema informático
                (software y hardware), o en los documentos electrónicos y ficheros almacenados en su sistema
                informático, razon por la cual la empresa se exime de cualquier responsabilidad por los daños y
                perjuicios de toda naturaleza que puedan deberse a la presencia de virus o a la presencia de otros
                elementos lesivos en los contenidos.
              </p>
              <h5>3.2.2. Licitud, fiabilidad y utilidad.</h5>
              <p>La empresa no garantiza la licitud, fiabilidad y utilidad de los contenidos.</p>
              <p>
                La empresa no asume responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a
                la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los
                contenidos, y en particular, aunque no de modo exclusivo, por los daños y perjuicios que puedan deberse
                a:
              </p>
              <ol>
                <li>
                  el incumplimiento de la ley, la moral y las buenas costumbres generalmente aceptadas o el orden
                  público como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición,
                  recepción, obtención o acceso a los contenidos;
                </li>
                <li>
                  la infracción de los derechos de propiedad intelectual e industrial, de los secretos empresariales, de
                  compromisos contractuales de cualquier clase, de los derechos al honor, a la intimidad personal y
                  familiar y a la imagen de las personas, de los derechos de propiedad y de toda otra naturaleza
                  pertenecientes a un tercero, como consecuencia de la transmisión, difusión, almacenamiento, puesta a
                  disposición, recepción, obtención o acceso a los contenidos;
                </li>
                <li>
                  la realización de actos de competencia desleal y publicidad ilícita como consecuencia de la
                  transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los
                  contenidos;
                </li>
                <li>la falta de veracidad, exactitud, exhaustividad, pertinencia y/o actualidad de los contenidos;</li>
                <li>
                  la inadecuación para cualquier clase de propósito de y la defraudación de las expectativas generadas
                  por los contenidos;
                </li>
                <li>
                  el incumplimiento, retraso en el cumplimiento, cumplimiento defectuoso o terminación por cualquier
                  causa de las obligaciones contraídas por terceros y contratos realizados con terceros a través de o
                  con motivo del acceso a los contenidos;
                </li>
                <li>
                  los vicios y defectos de toda clase de los contenidos transmitidos, difundidos, almacenados, puestos a
                  disposición o de otra forma transmitidos o puestos a disposición, recibidos, obtenidos o a los que se
                  haya accedido a través del sitio web o de los servicios.
                </li>
              </ol>
              <h4>
                3.3. Exclusión de garantías y de responsabilidad por los servicios y contenidos alojados fuera del sitio
                web.
              </h4>
              <p>
                El sitio web pone a disposición de los usuarios dispositivos técnicos de enlace (tales como, entre
                otros, links, banners, botones), directorios y herramientas de búsqueda que permiten a los usuarios
                acceder a sitios web pertenecientes a terceros (en adelante, &ldquo;sitios enlazados&rdquo;). La
                instalación de estos enlaces, directorios y herramientas de búsqueda en el sitio web tiene por único
                objeto facilitar a los usuarios la búsqueda de y acceso a la información disponible en internet, y no
                presupone que exista ninguna clase de vínculo o asociación entre la empresa y los operadores de los
                sitios enlazados.
              </p>
              <p>
                La empresa no controla previamente, aprueba ni hace propios los servicios, información, datos, archivos,
                productos y cualquier clase de material existente en los sitios enlazados. El usuario, por tanto, debe
                extremar la prudencia en la valoración y utilización de los servicios, información, datos, archivos,
                productos y cualquier clase de material existente en los sitios enlazados.
              </p>
              <p>
                La empresa no garantiza ni asume ningún tipo de responsabilidad por los daños y perjuicios de toda clase
                que puedan deberse a:
              </p>
              <ol>
                <li>el funcionamiento, disponibilidad, accesibilidad o continuidad de los sitios enlazados;</li>
                <li>
                  el mantenimiento de los servicios, información, datos, archivos, productos y cualquier clase de
                  material existente en los sitios enlazados;
                </li>
                <li>
                  la prestación o transmisión de los servicios, información, datos, archivos, productos y cualquier
                  clase de material existente en los sitios enlazados;
                </li>
                <li>
                  la calidad, licitud, fiabilidad y utilidad de los servicios, información, datos, archivos, productos y
                  cualquier clase de material existente en los sitios enlazados, en los mismos términos y con el mismo
                  alcance dispuesto en las condiciones generales 3.2 y 3.3, respecto de los contenidos y de los
                  servicios prestados por terceros a través del sitio web.
                </li>
              </ol>
              <h4>
                3.4. Exclusión de garantías y de responsabilidad por la utilización del sitio web, de los servicios y de
                los contenidos por los usuarios.
              </h4>
              <p>
                La empresa no controla el acceso ni la utilización que los usuarios hacen del sitio web, de los
                servicios y de los contenidos. En particular, la empresa no garantiza que los usuarios utilicen el sitio
                web, los servicios y los contenidos de conformidad con la ley, estas condiciones generales y, en su
                caso, las condiciones particulares que resulten de aplicación, la moral y buenas costumbres generalmente
                aceptadas y el orden público, ni que lo hagan de forma diligente y prudente.
              </p>
              <h4>3.5. Identidad e información relativa a los usuarios proporcionada por los propios usuarios.</h4>
              <p>
                La empresa no controla ni ofrece ninguna clase de garantía sobre la identidad de los usuarios, ni sobre
                la veracidad, vigencia, exhaustividad y/o autenticidad de los datos que los usuarios proporcionan sobre
                sí mismos y proporcionan a o hacen accesibles para otros usuarios.
              </p>
              <p>
                La empresa no asume ninguna responsabilidad por los daños y perjuicios de toda naturaleza que puedan
                deberse a la incorrecta identidad de los usuarios y a la falta de veracidad, vigencia, exhaustividad y/o
                autenticidad de la información que los usuarios proporcionan acerca de sí mismos y proporcionan o hacen
                accesibles para otros usuarios, y en particular, aunque no de forma exclusiva, por los daños y
                perjuicios de toda naturaleza que puedan deberse a la suplantación de la personalidad de un tercero
                efectuada por un usuario en cualquier clase de comunicación o transacción realizada a través del sitio
                web.
              </p>
              <h3>4. Manejo de información personal del usuario y Política de Privacidad</h3>
              <p>Puede revisar nuestra política de protección de datos personales referida a la Ley 1581 de 2012</p>
              <p>
                Esta sección explica qué información recogemos sobre el usuario, cómo la recogemos, como la almacenamos
                y como la podemos utilizar en las circunstancias en que la ofrecemos a terceros.
              </p>
              <p>
                Para aprovechar las ventajas de algunos de los servicios ofrecidos a través de nuestro sitio web podría
                ser necesario que nos proporcione cierta información sobre usted. Esto puede incluir hacer el registro
                de sus datos de contacto o completar algunos formularios en nuestra página web. Es posible que también
                le pidamos que proporcione información acerca de usted, si desea participar en cualquier debate en las
                preguntas y respuestas, entrar en cualquier servicio que ofrecemos o utilizar un buscador o comparador
                en nuestra página web, o si decide ponerse en contacto con nosotros por cualquier motivo. La naturaleza
                de nuestro servicio es tal que podemos, en ocasiones, también solicitar que proporcione datos personales
                (como número de documento, nombre y apellido, su estado laboral, crediticio y otros datos adicionales).
                Cuando lo hacemos, vamos a pedir su consentimiento explícito a la utilización de dichos datos
                personales. Cuando usted acepta proporcionar esta información vamos a tomar las medidas adecuadas para
                proteger dichos datos de índole personal.
              </p>
              <h4>4.1. Cookies</h4>
              <p>
                También podemos recopilar información acerca de su ordenador, incluyendo cuando se disponga de su
                dirección ip, sistema operativo y el tipo de navegador utiliza un cookie que se almacena en el disco
                duro de su ordenador. Los cookies nos ayudan a mejorar nuestro sitio web y ofrecer un mejor y más
                personalizado servicio a usted. El uso de los cookies nos permite permiten personalizar su experiencia
                en nuestro sitio web, acelerar sus búsquedas, seleccionar los servicios o materiales para su inclusión
                en el sitio web, los cuales pueden ser de interés para usted, seguimiento de los patrones de tráfico en
                general y el uso de nuestro sitio web para ayudarnos a mejorar nuestro servicio y diseño.
              </p>
              <p>
                La mayoría de los navegadores aceptan automáticamente cookies, pero normalmente pueden modificar la
                configuración de su navegador para evitar la aceptación automática. Si usted decide no recibir cookies,
                puede no ser capaz de utilizar determinadas funciones de nuestro sitio web.
              </p>
              <h4>4.2. Almacenamiento de sus datos personales.</h4>
              <p>
                La información personal que obtuvimos de usted puede ser transferida y almacenada fuera del espacio
                económico colombiano. Para el almacenamiento de esta información personal, seguimos procedimientos
                estrictos de seguridad en el almacenamiento y divulgación de la información que ha proporcionado a
                través de este sitio web, para evitar el acceso no autorizado. Vamos a tomar todas las medidas
                razonables para asegurar que sus datos personales permanezcan seguros.
              </p>
              <h4>4.3. Usos de información del usuario.</h4>
              <p>
                La empresa o terceros que actúen en nuestro nombre puede utilizar su información personal de las
                siguientes maneras:
              </p>
              <ol>
                <li>
                  Al rellenar formularios en línea con los datos proporcionados por usted en nuestro sitio web, nosotros
                  podemos proceder a pasárselos a los proveedores de los productos financieros, seguros y
                  telecomunicaciones de los cuales usted está interesado, con la información necesaria para que se
                  pongan en contacto con usted.
                </li>
                <li>Para proporcionarle información, productos o servicios que usted pide de nosotros.</li>
                <li>
                  Para permitir a usted a participar en las funciones interactivas de nuestro servicio, cuando usted
                  decide hacerlo.
                </li>
                <li>Para contactar con usted por correo electrónico.</li>
                <li>Para informarle sobre otros productos y servicios que pueden ser de interés para usted.</li>
              </ol>
              <p>
                Usted podrá ser notificado de nuestras noticias, de los cambios en el sitio web, eventos especiales u
                otros servicios que creemos que pueden interesarle.
              </p>
              <p>
                También podemos revelar su información personal a terceros que proporcionan productos y servicios
                financieros pertinentes a los productos o servicios que usted ha seleccionado en nuestro sitio web.
                Pensamos que podría ser de interés para usted, para que ellos también puedan proporcionarle información
                sobre los productos o servicios que ofrecen. Asimismo, podemos dar a conocer su información personal
                cuando sea necesario para cumplir con cualquier ley aplicable o para proteger a la empresa y usuarios
                (incluido el intercambio de información con otras empresas a los efectos de la protección contra el
                fraude). Asimismo, la informacion personal del usuario podra ser brindado al eventual adquirente del
                servicio brindado por la empresa, en el eventual caso que se realice la transferencia del negocio a una
                tercera persona.
              </p>
              <h4>4.4. Derechos del usuario</h4>
              <p>
                Si usted no está de acuerdo con esta política de privacidad, entonces usted no debe ingresar su
                información personal en ningún lugar de nuestro sitio web. Si en cualquier momento después de que usted
                ha proporcionado su información personal en nuestra página web, quiere oponerse a que sus datos de
                carácter personal sean utilizados por nosotros, tiene que hacernos llegar un correo electrónico a
                borrar.suscripcion@trademate.tech. Nos esforzaremos en procesar su solicitud lo antes posible, pero
                en algunos casos puede llevarnos hasta 30 días tal accion. Nuestra política de privacidad se aplica
                únicamente a información recopilada por nosotros a través de nuestro sitio web. El usuario debe tener en
                cuenta que la empresa no se hace responsable por los contenidos brindados por terceros que ofrecen
                bienes y servicios a través del web site de la empresa. Por lo que se recomienda al usuario asegurarse
                que también lea su protección de datos y condiciones de privacidad de términos y condiciones
                cuidadosamente antes de darles sus datos personales.
              </p>
              <p>
                Comentarios, sugerencias, preguntas y peticiones con respecto a nuestra política de privacidad son
                bienvenidos y deben ser abordados a través del correo electrónico o al info@trademate.tech.
              </p>
              <p>
                Si cualquier parte de estas condiciones es considerada ilegal, inválida o inejecutable por alguna
                disposición, se considerará separada de la validez y la aplicabilidad de las disposiciones restantes de
                estos términos, dado que no se verán afectados. Cualquier fallo de nuestra parte para hacer valer
                cualquier derecho no constituirá una renuncia a los mismos.
              </p>
              <p>
                Los presentes términos y condiciones se regirán e interpretarán en conformidad con el derecho
                colombiano.
              </p>
              <h3>5. Licencia de uso</h3>
              <p>
                La empresa autoriza al usuario a la utilización de los derechos de propiedad intelectual e industrial y
                de los secretos empresariales relativos al software instalado en su equipo informático, únicamente para
                utilizar el sitio web y los servicios de conformidad con lo establecido en estas condiciones generales.
                La empresa no concede ninguna otra licencia o autorización de uso de ninguna clase sobre sus derechos de
                propiedad industrial e intelectual, secretos empresariales o sobre cualquier otra propiedad o derecho
                relacionado con el sitio web, los servicios o los contenidos.
              </p>
              <h3>6. Ley aplicable y jurisdicción</h3>
              <p>
                Estas condiciones de uso se rigen por la ley de la República del Colombia. La empresa y el usuario, con
                renuncia expresa a cualquier otro fuero, se someten al poder judicial colombiano.
              </p>
              <h3>7. Aviso de Privacidad (Ley 1581 de 2012)</h3>
              <p>
                 Mate Tech LLP empresa legalmente constituida, como responsable del tratamiento de datos personales presenta lineamientos para el tratamiento
                de información de acuerdo a las leyes colombianas.
              </p>
              <p>
                <strong>Método de contacto:</strong>
              </p>
              <p>
                Todo usuario puede contactar a  Mate Tech LLP para modificar, actualizar, suprimir su información
                comunicándose a través de los siguientes medios:
              </p>
              <ul>
                <li>Usando nuestro formulario de contacto en https://trademate.tech</li>
                <li>Vía Correo Electrónico haciendo su solicitud a info@trademate.tech</li>
              </ul>
              <p>
                <strong>Tratamiento que se dará a la información:</strong>
              </p>
              <p>
                Toda la información suministrada por los usuarios podrá ser utilizada con fines estadísticos,
                informativos o comerciales de los productos que hacen parte de las diferentes secciones actuales o
                futuras de comparación de  Mate Tech LLP, además los datos podrán ser transferidos únicamente a
                la empresa o empresas solicitadas para el ofrecimiento de productos y servicios según la elección y
                autorización expresa del usuario.
              </p>
              <p>
                <strong>Derechos del Titular:</strong>
              </p>
              <p>El titular de la información podrá modificar, actualizar, suprimir su información.</p>
              <p>
                <strong>PQR:</strong>
              </p>
              <p>
                En caso de tener dudas sobre el trato de su información puede contactar al área de Servicio al Usuario
                como se mencionó en la sección &ldquo;Metodo de Contacto&rdquo;.
              </p>
              <p>
                La política de tratamiento de información entra en vigencia desde su publicación y hasta cuando sea
                requerido por las leyes colombianas sobre el tratamiento de datos personales. Puede ver todos los
                detalles de nuestra política de protección de datos personales
              </p>
              <h3>8. Autorización de Consulta en Centrales de Riesgo</h3>
              <p>
                Autorizo a  Mate Tech LLP y la(s) institución(es) seleccionada(s) a consultar ante las
                centrales de riesgo mi información financiera, crediticia, comercial y de servicios para completar mi
                proceso de solicitud.
              </p>
              <p>
                En los casos que corresponda: Al solicitar y diligenciar el formulario de contacto el usuario autoriza a
                 Mate Tech LLP con NIT 900.710.374-0 a consultar ante las centrales de riesgo su información
                financiera, crediticia, comercial y de servicios en el marco de la Ley 1266-2008 y normas que la regulen
                o modifiquen.
              </p>
              <p>
                Esta autorización permite a  Mate Tech LLP, sus representantes y se hace extensiva a la institución
                bancaria seleccionada por el usuario al solicitar un producto para iniciar el proceso de análisis a fin
                de contactar con el usuario.
              </p>
              <p>Para más información ver ley 1266 de 2008</p>
              <p></p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

TermsAndConditions.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
