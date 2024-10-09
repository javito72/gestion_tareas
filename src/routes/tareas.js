// src/routes/tareas.js

const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const { estaAutenticado } = require('../middleware/auth');

// Todas las rutas de tareas requieren estar autenticado
router.use(estaAutenticado);

// Listar todas las tareas
router.get('/', tareasController.listarTareas);

// Mostrar formulario para crear una nueva tarea
router.get('/crear', tareasController.mostrarFormularioCrear);

// Procesar la creación de una nueva tarea
router.post('/crear', tareasController.crearTarea);

// Mostrar formulario para editar una tarea
router.get('/editar/:id', tareasController.mostrarFormularioEditar);

// Procesar la actualización de una tarea
router.post('/editar/:id', tareasController.editarTarea);

// Eliminar una tarea
router.post('/eliminar/:id', tareasController.eliminarTarea);

module.exports = router;
