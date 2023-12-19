const express = require('express');
const router = express.Router();
const { getConnection } = require('typeorm'); 
const bodyParser = require('body-parser');
const ClientePension = require('../entities/CreateFolder');

// Middleware para analizar el cuerpo de las solicitudes POST
router.use(bodyParser.json());

router.get('/clientepension', async (req, res) => {
  try {
    const connection = getConnection();
    const clientePensionRepository = connection.getRepository(ClientePension);
    console.log('Fetching all pension clients'); // Añadido para debugging
    const clientesPension = await clientePensionRepository.find();
    
    // Agrega un registro para ver la cantidad de clientes obtenidos
    console.log(`Found ${clientesPension.length} pension clients`);

    res.status(200).json(clientesPension);
  } catch (error) {
    console.error('Error al obtener clientes de pensión:', error);
    res.status(500).send('Error al obtener clientes de pensión');
  }
});
// Endpoint para crear un nuevo registro de cliente pension
router.post('/clientepension', async (req, res) => {
  try {
    const connection = getConnection();
    const clientePensionRepository = connection.getRepository(ClientePension);
    
    const nuevoClientePension = clientePensionRepository.create(req.body);
    const resultado = await clientePensionRepository.save(nuevoClientePension);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear un cliente de pensión:', error);
    res.status(500).send('Error al crear un cliente de pensión');
  }
});

// Endpoint para actualizar un registro de cliente pension existente
router.put('/clientepension/:cedula', async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const clientePensionRepository = getRepository(ClientePension);
    const clientePensionActualizado = await clientePensionRepository.findOne({ where: { CEDULA: cedula } });

    if (!clientePensionActualizado) {
      return res.status(404).send('Cliente de pensión no encontrado');
    }

    clientePensionRepository.merge(clientePensionActualizado, req.body);
    const resultado = await clientePensionRepository.save(clientePensionActualizado);
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al actualizar un cliente de pensión:', error);
    res.status(500).send('Error al actualizar un cliente de pensión');
  }
});

// Endpoint para eliminar un registro de cliente pension
router.delete('/clientepension/:id', async (req, res) => {
  try {
    const connection = getConnection();
    const clientePensionRepository = connection.getRepository(ClientePension);
    const id = req.params.id;
    const resultado = await clientePensionRepository.delete(id);
    
    if (resultado.affected === 0) {
      return res.status(404).send('Cliente de pensión no encontrado');
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar un cliente de pensión:', error);
    res.status(500).send('Error al eliminar un cliente de pensión');
  }
});

module.exports = router;
