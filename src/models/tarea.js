// src/models/tarea.js

const BaseModel = require('./baseModel');

class Tarea extends BaseModel {
    constructor() {
        super('tareas.json');
    }

    // Actualizar el método de validación para incluir 'inventario'
    validarArea(area) {
        const areasPermitidas = ['compras', 'ventas', 'producción', 'inventario'];
        return areasPermitidas.includes(area.toLowerCase());
    }

    // Puedes agregar más métodos específicos para tareas aquí
}

module.exports = new Tarea();
