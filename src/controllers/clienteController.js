const express = require('express');
const router = express.Router();
const { getConnection } = require('typeorm'); // Asegúrate de importar getConnection
const bodyParser = require('body-parser');
const Cliente = require('../entities/Cliente');

// Middleware para analizar el cuerpo de las solicitudes POST
router.use(bodyParser.json());

// Endpoint para obtener todos los clientes
router.get('/clientes', async (req, res) => {
  try {
    const connection = getConnection();
    const clienteRepository = connection.getRepository(Cliente);
    const clientes = await clienteRepository.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).send('Error al obtener clientes');
  }
});

// Endpoint para crear un nuevo cliente
router.post('/clientes', async (req, res) => {
  try {
    const connection = getConnection();
    const clienteRepository = connection.getRepository(Cliente);
    
    console.log('Valor de identidad_clientes recibido:', req.body.identidad_clientes);

    const nuevoCliente = clienteRepository.create(req.body);
    const resultado = await clienteRepository.save(nuevoCliente);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear un cliente:', error);
    res.status(500).send('Error al crear un cliente');
  }
});


// Endpoint para actualizar un cliente existente
router.put('/clientes/:identidad_clientes', async (req, res) => {
  try {
    const connection = getConnection();
    const clienteRepository = connection.getRepository(Cliente);
    const identidad_clientes = req.params.identidad_clientes; // Usa identidad_clientes como clave
    const clienteActualizado = await clienteRepository.findOne({ where: { identidad_clientes } });

    if (!clienteActualizado) {
      return res.status(404).send('Cliente no encontrado');
    }

    clienteRepository.merge(clienteActualizado, req.body);
    const resultado = await clienteRepository.save(clienteActualizado);
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al actualizar un cliente:', error);
    res.status(500).send('Error al actualizar un cliente');
  }
});



// Endpoint para eliminar un cliente
router.delete('/clientes/:id', async (req, res) => {
  try {
    const connection = getConnection();
    const clienteRepository = connection.getRepository(Cliente);
    const clienteId = req.params.id;
    const resultado = await clienteRepository.delete(clienteId);
    
    if (resultado.affected === 0) {
      return res.status(404).send('Cliente no encontrado');
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar un cliente:', error);
    res.status(500).send('Error al eliminar un cliente');
  }
});

module.exports = router;
