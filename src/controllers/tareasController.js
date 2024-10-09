// src/controllers/tareasController.js

const Tarea = require('../models/tarea');
const Usuario = require('../models/usuario');
const Estado = require('../models/estado');
const Prioridad = require('../models/prioridad');

// Listar todas las tareas
exports.listarTareas = (req, res) => {
    const tareas = Tarea.getAll();
    const estados = Estado.getAll();
    const prioridades = Prioridad.getAll();
    const usuarios = Usuario.getAll();
    res.render('tareas/listar', { tareas, estados, prioridades, usuarios, title: 'Lista de Tareas' });
};

// Mostrar formulario para crear una nueva tarea
exports.mostrarFormularioCrear = (req, res) => {
    const estados = Estado.getAll();
    const prioridades = Prioridad.getAll();
    const usuarios = Usuario.getAll();
    res.render('tareas/crear', { estados, prioridades, usuarios, title: 'Crear Nueva Tarea' });
};

// Procesar la creación de una nueva tarea
exports.crearTarea = (req, res) => {
    const { titulo, descripcion, estado, prioridad, usuarioAsignado, fechaVencimiento, area } = req.body;
    const tareas = Tarea.getAll();
    const nuevoId = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;

    // Validar el campo 'area'
    if (!Tarea.validarArea(area)) {
        return res.render('tareas/crear', { 
            error: 'Área inválida. Selecciona una de las opciones permitidas.',
            estados: Estado.getAll(),
            prioridades: Prioridad.getAll(),
            usuarios: Usuario.getAll(),
            title: 'Crear Nueva Tarea' 
        });
    }

    const nuevaTarea = {
        id: nuevoId,
        titulo,
        descripcion,
        estado: parseInt(estado),
        prioridad: parseInt(prioridad),
        usuarioAsignado: parseInt(usuarioAsignado),
        fechaCreacion: new Date().toISOString(),
        fechaVencimiento,
        area: area.toLowerCase()  // Añadir el campo 'area'
    };
    Tarea.create(nuevaTarea);
    res.redirect('/tareas');
};

// Mostrar formulario para editar una tarea
exports.mostrarFormularioEditar = (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = Tarea.getById(id);
    if (!tarea) {
        return res.status(404).send('Tarea no encontrada');
    }
    const estados = Estado.getAll();
    const prioridades = Prioridad.getAll();
    const usuarios = Usuario.getAll();
    res.render('tareas/editar', { tarea, estados, prioridades, usuarios, title: 'Editar Tarea' });
};

// Procesar la actualización de una tarea
exports.editarTarea = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descripcion, estado, prioridad, usuarioAsignado, fechaVencimiento, area } = req.body;

    // Validar el campo 'area'
    if (!Tarea.validarArea(area)) {
        const tarea = Tarea.getById(id);
        return res.render('tareas/editar', { 
            tarea,
            error: 'Área inválida. Selecciona una de las opciones permitidas.',
            estados: Estado.getAll(),
            prioridades: Prioridad.getAll(),
            usuarios: Usuario.getAll(),
            title: 'Editar Tarea' 
        });
    }

    const tareaActualizada = {
        titulo,
        descripcion,
        estado: parseInt(estado),
        prioridad: parseInt(prioridad),
        usuarioAsignado: parseInt(usuarioAsignado),
        fechaVencimiento,
        area: area.toLowerCase()  // Actualizar el campo 'area'
    };
    const tarea = Tarea.update(id, tareaActualizada);
    if (!tarea) {
        return res.status(404).send('Tarea no encontrada');
    }
    res.redirect('/tareas');
};

// Eliminar una tarea
exports.eliminarTarea = (req, res) => {
    const id = parseInt(req.params.id);
    Tarea.delete(id);
    res.redirect('/tareas');
};
