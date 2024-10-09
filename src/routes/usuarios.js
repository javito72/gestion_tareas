// src/routes/usuarios.js

const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { estaAutenticado, esAdministrador } = require('../middleware/auth');

// Todas las rutas de usuarios requieren estar autenticado y ser administrador
router.use(estaAutenticado);
router.use(esAdministrador);

// Listar todos los usuarios
router.get('/', usuariosController.listarUsuarios);

// Mostrar formulario para crear un nuevo usuario
router.get('/crear', usuariosController.mostrarFormularioCrear);

// Procesar la creación de un nuevo usuario
router.post('/crear', usuariosController.crearUsuario);

// Mostrar formulario para editar un usuario
router.get('/editar/:id', usuariosController.mostrarFormularioEditar);

// Procesar la actualización de un usuario
router.post('/editar/:id', usuariosController.editarUsuario);

// Eliminar un usuario
router.post('/eliminar/:id', usuariosController.eliminarUsuario);

module.exports = router;
