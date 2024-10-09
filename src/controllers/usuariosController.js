// src/controllers/usuariosController.js

const Usuario = require('../models/usuario');

// Listar todos los usuarios
exports.listarUsuarios = (req, res) => {
    const usuarios = Usuario.getAll();
    res.render('usuarios/listar', { usuarios, title: 'Lista de Usuarios' });
};

// Mostrar formulario para crear un nuevo usuario
exports.mostrarFormularioCrear = (req, res) => {
    res.render('usuarios/crear', { title: 'Crear Nuevo Usuario' });
};

// Procesar la creación de un nuevo usuario
exports.crearUsuario = (req, res) => {
    const { nombre, email, rol, departamento } = req.body;
    const usuarios = Usuario.getAll();
    const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
    const nuevoUsuario = {
        id: nuevoId,
        nombre,
        email,
        rol,
        departamento
    };
    Usuario.create(nuevoUsuario);
    res.redirect('/usuarios');
};

// Mostrar formulario para editar un usuario
exports.mostrarFormularioEditar = (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = Usuario.getById(id);
    if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.render('usuarios/editar', { usuario, title: 'Editar Usuario' });
};

// Procesar la actualización de un usuario
exports.editarUsuario = (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, email, rol, departamento } = req.body;
    const usuarioActualizado = {
        nombre,
        email,
        rol,
        departamento
    };
    const usuario = Usuario.update(id, usuarioActualizado);
    if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.redirect('/usuarios');
};

// Eliminar un usuario
exports.eliminarUsuario = (req, res) => {
    const id = parseInt(req.params.id);
    Usuario.delete(id);
    res.redirect('/usuarios');
};
