// src/controllers/authController.js

const Usuario = require('../models/usuario');

// Mostrar formulario de inicio de sesión
exports.mostrarFormularioLogin = (req, res) => {
    res.render('auth/login', { title: 'Iniciar Sesión' });
};

// Procesar inicio de sesión
exports.procesarLogin = (req, res) => {
    const { email } = req.body;
    const usuarios = Usuario.getAll();
    const usuario = usuarios.find(u => u.email === email);
    if (usuario) {
        // Guardar información del usuario en la sesión sin sobrescribir el objeto req.session
        req.session.usuarioId = usuario.id;
        res.redirect('/');
    } else {
        res.render('auth/login', { error: 'Email no encontrado', title: 'Iniciar Sesión' });
    }
};

// Cerrar sesión
exports.cerrarSesion = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
};
