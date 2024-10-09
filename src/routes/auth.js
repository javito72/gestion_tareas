// src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar formulario de inicio de sesión
router.get('/login', authController.mostrarFormularioLogin);

// Procesar inicio de sesión
router.post('/login', authController.procesarLogin);

// Cerrar sesión
router.get('/logout', authController.cerrarSesion);

module.exports = router;
