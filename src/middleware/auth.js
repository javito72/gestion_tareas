// src/middleware/auth.js

const Usuario = require('../models/usuario');

// Middleware para verificar si el usuario está autenticado
exports.estaAutenticado = (req, res, next) => {
    if (req.session && req.session.usuarioId) {
        const usuario = Usuario.getById(req.session.usuarioId);
        if (usuario) {
            req.usuario = usuario;
            return next();
        }
    }
    res.redirect('/auth/login');
};

// Middleware para verificar si el usuario es administrador
exports.esAdministrador = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'administrador') {
        return next();
    }
    res.status(403).send('Acceso denegado');
};
