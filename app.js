const express = require('express');
const path = require('path');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const colors = require('colors');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer'); // Para manejar la carga de archivos

const app = express();

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT;


const SESSION_FILE_PATH = './session.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}


const client = new Client({
  puppeteer: {
    args: ['--no-sandbox']
  },
  authStrategy: new LocalAuth({ clientId: "Client-one" }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2332.15.html'
  }
});


client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});




client.on('authenticated', (session) => {
  console.log('Conexión exitosa');
  sessionData = session;
  if (sessionData) {
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});




let MSGbien = null; // inicia el Mensaje de bienvenida
let etapa = 0;
const registro = {}; // Registra los numeros telefono que inician al programa

let Nombre = '';

client.on('message', async (message) => {
  console.log(`Mensaje recibido de ${message.from}: ${message.body}`);


if (!registro[message.from]) { 
  client.sendMessage(message.from, `¡Bienvenido a ExtraBoletas! 🎉 Tu destino donde la diversión es asegurada. 🏟️⚽ \n\n 1️⃣ Deportivo Pereira 💛❤️ \n \n 2️⃣ Eventos Próximo`) ;


  registro[message.from] = { etapa: 0, numeroDocumento: '' };
  // registro[message.from] = true; // Register the phone number
  return;
}

if (MSGbien !== null) { // Check if MSGbien exists
  client.sendMessage(message.from, MSGbien);
  MSGbien = null; // Reset to a falsy value after sending
} else {
  console.log('Error al verificar el mensaje de bienvenida');
}




switch (registro[message.from].etapa) {

  

  case 0:
    const mensajeEnMinusculas = message.body.toLowerCase();
    if (mensajeEnMinusculas.includes('1')) {
      client.sendMessage(message.from, 'Vive la pasión del fútbol con boletas exclusivas del Deportivo Pereira. 💛❤️ Descubre la emoción de cada partido con nosotros.\n \n 1️⃣Quiero comprar Boletas 🎫\n\n 2️⃣Descargar Boleta🌡️\n\n 3️⃣Cuándo me entregan el carnet de abonado 😊\n \n 4️⃣Hablar con un asesor 📲(Disponible en horario de 10:00 am a 6:00 pm)');
      registro[message.from].etapa = 13;
    } else if (mensajeEnMinusculas.includes('2')) {
      client.sendMessage(message.from, 'No te puedes perder estos eventos por nada del mundo. 🥳\n \n \n \nPara adquirir tus entradas 🎟️, visítanos en nuestra página web: \nExtraBoletas\n\nextraboletas.com');
      registro[message.from].etapa = 12;
      delete registro[message.from];
    }
    break;

      case 13:
        if (message.body === '1' ) {
          // Verificar si el mensaje tiene más de 2 letras
          client.sendMessage(message.from, 'Puedas adquirir la boletería para los partidos del Deportivo Pereira por nuestra página web extraboletas.com \nCompra en línea boletas para eventos \n\nO en estas ubicaciones: 🗺️\n\n📍Centro Comercial Unicentro. \n\n📍Estadio Hernán Ramirez Villegaz (Sector Occidental. \n\n📍Centro Comercial Victoria 💛❤️ SOLO PARA ABONADOS \n\nRecuerda que si eres extranjero debes adquirir tu boleta con el Pasaporte. \n\n ¿Desea alguna otra información? \n\n*SI* \n\n*NO*' );
          registro[message.from].etapa = 30;
          
        } else if (message.body === '2' ) {
          // Verificar si el mensaje tiene más de 2 letras
          client.sendMessage(message.from, 'Ingresa a: \n \nSistema Integrado de Boletería.\n\n https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras \n\nDescarga tus entradas para los partidos del Deportivo Pereira  \n\n ¿Desea alguna otra información? \n\n*SI* \n\n*NO*');
          registro[message.from].etapa = 30;
        
        } else if (message.body === '3' ) {
          // Verificar si el mensaje tiene más de 2 letras
          client.sendMessage(message.from, 'El carnet de ABONADO ADULTO lo entregará el Deportivo Pereira de forma digital el próximo mes. Te enviaremos una notificación para que estes enterado. ✅😊\n\n El carnet de ABONADO NIÑ@ lo podrás reclamar en la taquilla del Estadio. \n\n ¿Desea alguna otra información? \n\n*SI* \n\n*NO*');
          registro[message.from].etapa = 30;

        } else if (message.body === '4' ) {
          // Verificar si el mensaje tiene más de 2 letras
          client.sendMessage(message.from, 'Pronto será atendid@ por uno de nuestros asesores, gracias por preferirnos.');
        }
          break;

      


          // case 13:
          //   if (message.body === "GRATIS" || message.body === "gratis"|| message.body === "Gratis")   {
          //     // Verificar si el mensaje tiene más de 2 letras
          //     client.sendMessage(message.from, 'Para Iniciar por favor indíqueme en un solo mensaje su: \n \n *Nombre:* \n \n *E-Mail* \n \n A que se dedica su negocio y lo que le gustaría que hiciera el Bot con sus clientes. ');
          //     registro[message.from].etapa = 20;
              
          //   }
          //   break;


            case 30:
              if (message.body === 'si' || message.body === 'Si' || message.body === 'SI') {
                // Verificar si el mensaje tiene más de 2 letras
                client.sendMessage(message.from, 'Bienvenido a ExtraBoletas! 🎉 Tu destino donde la diversión es asegurada. 🏟️⚽ \n\n 1️⃣ Deportivo Pereira 💛❤️ \n \n 2️⃣ Eventos Próximo');
                registro[message.from].etapa = 0;
              } else if (message.body === 'No' || message.body === 'no' || message.body === 'NO') {
                  // Verificar si el mensaje tiene más de 2 letras
                  client.sendMessage(message.from, 'Gracias por comunicarte con ExtraBoletas 🎉');
                  delete registro[message.from];
                }
                break;




  }


});




// Desde aqui inica el cargue de la imagen al servidor 

// Configura multer para guardar las imágenes en la carpeta "media"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/media'); // Directorio de destino para las imágenes
  },
  filename: (req, file, cb) => {
    // Define el nombre del archivo como "image" y asegúrate de que sea único
    const extname = path.extname(file.originalname);
    const filename = 'image' + extname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Verifica si el archivo ya existe en "media" y lo elimina si es necesario
    const filePath = path.join('/public/media', 'image' + path.extname(file.originalname));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    cb(null, true);
  },
});

app.post('/upload', upload.single('image'), (req, res) => {
  // Mensaje de éxito que se enviará directamente al HTML
  const successMessage = `
  <style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }


  .modal-content button {
    background-color: #058FF4;
    color: #fff; /* Cambia el color del texto a blanco para que sea legible en el fondo azul */
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  .modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Fondo oscuro para resaltar la imagen */
    z-index: 999;
  }
  .modal-content {
    background-color: #fff;
    border: 1px solid #3c763d;
    color: #3c763d;
    padding: 15px;
    animation: fadeIn 0.5s;
    max-width: 400px; /* Ancho máximo de la ventana modal */
  }
  .fadeOut {
    animation: fadeOut 0.5s;
  }
</style>

<div id="success-message" class="modal-container">
  <div class="modal-content">
    <img src="/media/image.jpg" alt="Imagen" style="max-width: 100%; height: auto;">
    <p>Imagen cargada con éxito</p>
    <button onclick="closeSuccessMessage()">Cerrar</button>
  </div>
</div>

<script>
  function closeSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.classList.add('fadeOut');
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 500);
  }
</script>

  `;

  // Envía el mensaje de éxito directamente al HTML de la página principal
  res.send(successMessage);
});





let MSGenvio = true;




// Desde aqui Robot de envio Mesivo

client.on('auth_failure', (msg) => {
  console.error('Error de autenticación:', msg);
});


client.on('ready', () => {
  console.log('Cliente listo');
});

client.initialize();


app.use(bodyParser.json()); // Usar body-parser para analizar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Usar body-parser para analizar datos codificados en URL

// Array para almacenar los registros de mensajes enviados
const registros = [];

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
//  });


app.post('/procesar', (req, res) => {
  const { numbers, messages } = req.body;

  console.log('Números de Teléfono:', numbers);
  console.log('Mensajes:', messages);

  if (!numbers || !messages) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }

  if (!Array.isArray(numbers) || !Array.isArray(messages)) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }


  const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./media/${file}`)
    client.sendMessage(to, mediaFile)
  }

  
  // ///////////////////////////////////////

  let messageCounter = 0;



  app.post('/cambiar', (req, res) => {
    MSGenvio = !MSGenvio; // Cambiamos el valor de MSGenvio
    res.json({ MSGenvio });
});





  setInterval(() => {
    console.log("MSGenvio:", MSGenvio);
  }, 1000);
  
  
  app.use(express.json());

// ///////////////////////////////////////////////////////////////


numbers.forEach((phoneNumber, index) => {
  const phoneNumberWithSuffix = `${phoneNumber}@c.us`;
  const message = messages[index] || ""; // Asigna una cadena vacía si el mensaje no está presente para ese número



  setTimeout(() => {
  
    if (MSGenvio) {
      sendMedia(phoneNumberWithSuffix, 'image.jpg');
    }
    client.sendMessage(phoneNumberWithSuffix, message)
      .then(() => {
        const registro = {
          mensaje: `Mensaje ${++messageCounter} enviado a ${phoneNumberWithSuffix}`,
          numero: phoneNumberWithSuffix
        };

        registros.push(registro); // Agregar el registro al array de registros
        console.log(registro.mensaje.green);

// Verifica si estás en el último elemento del array
if (index === numbers.length - 1) {
  registros.push({ mensaje: 'Terminé de enviar los mensajes', numero: 'Oprima el boton borra registro' });
  console.log('Terminé de enviar');
}
      })
      .catch((error) => {
        console.log(`Error al enviar el mensaje a ${phoneNumberWithSuffix}: ${error.message}`.red);
      });
  }, 15000 * (index + 1));
});




  res.status(200).send('Datos recibidos correctamente');


app.get('/registros', (req, res) => {
  const ultimosRegistros = registros.slice(-10); // Obtener los últimos 10 registros

  res.json(ultimosRegistros); // Enviar los últimos 10 registros como respuesta en formato JSON
});

});

// Ruta para borrar los registros
app.delete('/borrar-registros', (req, res) => {
  registros.length = 0; // Borra todos los registros
  res.json({ message: 'Registros borrados exitosamente' });
});






app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
