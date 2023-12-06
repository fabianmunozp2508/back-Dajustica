const express = require('express');
const cors = require('cors');
const { createConnection, getConnectionManager } = require('typeorm');
const clienteController = require('./controllers/clienteController');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Middleware para manejar la conexión a la base de datos
app.use(async (req, res, next) => {
  const connectionManager = getConnectionManager();

  try {
    // Verifica si existe una conexión activa, si no, crea una
    if (!connectionManager.has('default')) {
      await createConnection();
    }

    // Continúa con la siguiente middleware
    next();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.use('/api', clienteController);

const startServer = async () => {
  try {
    // Verifica y crea la conexión al inicio del servidor
    const connectionManager = getConnectionManager();
    if (!connectionManager.has('default')) {
      await createConnection();
    }

    const server = app.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      server.close(() => {
        console.log('Cerrando el servidor...');

        // Cierra la conexión al cerrar el servidor
        if (connectionManager.has('default')) {
          const connection = connectionManager.get('default');
          connection.close().then(() => {
            console.log('Conexión cerrada. Saliendo del proceso...');
            process.exit(0);
          });
        }
      });
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
