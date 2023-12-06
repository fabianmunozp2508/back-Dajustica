const express = require('express');
const cors = require('cors');
const { createConnection } = require('typeorm');

const app = express();
const PORT = 3000; // Asigna el puerto que desees

const startServer = async () => {
  try {
    // Prueba de conexión a la base de datos
    await createConnection();

    // Si la conexión es exitosa, puedes iniciar el servidor
    const server = app.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });

    process.on('SIGINT', () => {
      server.close(async () => {
        console.log('Cerrando el servidor...');
        await connection.close();
        console.log('Conexión cerrada. Saliendo del proceso...');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

// Llama a la función para iniciar el servidor
startServer();
