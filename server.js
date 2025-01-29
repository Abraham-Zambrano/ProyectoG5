/****
 * @@@@@
 * Autor: Zambrano Valverde Luis
 */

/****
 * @@@@@
 * Requiere y configura las variables de entorno.
 */
require('dotenv').config();

/****
 * @@@@@
 * Requiere los módulos express, body-parser y cors.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/****
 * @@@@@
 * Requiere las rutas de autenticación y transacciones.
 */
const createAuthRouter = require('./routes/auth.routes');
const createTransaccionesRouter = require('./routes/transaccionesRoutes');

/****
 * @@@@@
 * Requiere la configuración de la base de datos.
 */
const db = require('./config/db');

/****
 * @@@@@
 * Crea una instancia de la aplicación express.
 */
const app = express();

/****
 * @@@@@
 * Define el puerto en el que la aplicación escuchará.
 * @constant {number}
 */
const PORT = process.env.PORT || 3000;

/****
 * @@@@@
 * Middleware para habilitar CORS y parsear JSON.
 */
app.use(cors());
app.use(bodyParser.json());

/****
 * @@@@@
 * Función para inicializar la base de datos y arrancar el servidor.
 * @async
 * @function initializeDatabase
 */
const initializeDatabase = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Conexión a la base de datos establecida');
    connection.release();

    /****
     * @@@@@
     * Usar las rutas de autenticación.
     * @name use/api/auth
     * @function
     * @inner
     * @param {string} path - La ruta base de la API.
     * @param {function} router - El enrutador de autenticación.
     */
    app.use('/api/auth', createAuthRouter(db));

    /****
     * @@@@@
     * Usar las rutas de transacciones.
     * @name use/api/transacciones
     * @function
     * @inner
     * @param {string} path - La ruta base de la API.
     * @param {function} router - El enrutador de transacciones.
     */
    app.use('/api/transacciones', createTransaccionesRouter(db));

    /****
     * @@@@@
     * Ruta para obtener el correo basado en el id del usuario.
     * @name get/api/transacciones/correo
     * @function
     * @inner
     * @param {string} path - La ruta de la solicitud.
     * @param {callback} middleware - La función middleware de express.
     */
    app.get('/api/transacciones/correo', async (req, res) => {
      const idUsuario = req.query.usuarioId;
      const queryEmail = 'SELECT email FROM usuarios WHERE id = ?';

      try {
        const [resultsEmail] = await db.query(queryEmail, [idUsuario]);
        if (resultsEmail.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ email: resultsEmail[0].email });
      } catch (error) {
        console.error('Error al obtener correo:', error);
        res.status(500).json({ message: 'Error al obtener correo' });
      }
    });

    /****
     * @@@@@
     * Ruta para obtener id del cliente basado en el correo.
     * @name get/api/transacciones/cliente
     * @function
     * @inner
     * @param {string} path - La ruta de la solicitud.
     * @param {callback} middleware - La función middleware de express.
     */
    app.get('/api/transacciones/cliente', async (req, res) => {
      const email = req.query.email;
      const queryClienteId = 'SELECT id FROM clientes WHERE email = ?';

      try {
        const [resultsClienteId] = await db.query(queryClienteId, [email]);
        if (resultsClienteId.length === 0) {
          return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ id: resultsClienteId[0].id });
      } catch (error) {
        console.error('Error al obtener id del cliente:', error);
        res.status(500).json({ message: 'Error al obtener id del cliente' });
      }
    });

    /****
     * @@@@@
     * Ruta para realizar una transferencia.
     * @name post/api/transacciones/transferencia
     * @function
     * @inner
     * @param {string} path - La ruta de la solicitud.
     * @param {callback} middleware - La función middleware de express.
     */
    app.post('/api/transacciones/transferencia', async (req, res) => {
      const { cliente_id, tipo, monto, usuario_id } = req.body;

      // Asegúrate de verificar si el cliente existe antes de insertar
      const queryVerificarCliente = 'SELECT id FROM clientes WHERE id = ?';
      const queryInsertarTransferencia = 'INSERT INTO transferencias (cliente_id, tipo, monto, fecha, usuario_id) VALUES (?, ?, ?, NOW(), ?)';

      try {
        const [resultsCliente] = await db.query(queryVerificarCliente, [cliente_id]);
        if (resultsCliente.length === 0) {
          return res.status(400).json({ message: 'Cliente no encontrado' });
        }

        await db.query(queryInsertarTransferencia, [cliente_id, tipo, monto, usuario_id]);
        res.json({ message: 'Transferencia realizada correctamente' });
      } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        res.status(500).json({ message: 'Error al realizar la transferencia' });
      }
    });

    /****
     * @@@@@
     * Ruta para obtener el historial de transacciones.
     * @name get/api/transacciones/historial
     * @function
     * @inner
     * @param {string} path - La ruta de la solicitud.
     * @param {callback} middleware - La función middleware de express.
     */
    app.get('/api/transacciones/historial', async (req, res) => {
      const usuarioId = req.query.usuarioId;
      const queryHistorial = 'SELECT * FROM transferencias WHERE usuario_id = ?';

      try {
        const [resultsHistorial] = await db.query(queryHistorial, [usuarioId]);
        res.json(resultsHistorial);
      } catch (error) {
        console.error('Error al obtener el historial de transacciones:', error);
        res.status(500).json({ message: 'Error al obtener el historial de transacciones' });
      }
    });

    // Inicializar la base de datos y arrancar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1); // Terminar el proceso si no se puede conectar
  }
};

/****
 * @@@@@
 * Inicializar la base de datos y arrancar el servidor.
 */
initializeDatabase();
