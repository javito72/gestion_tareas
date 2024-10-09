// src/models/prioridad.js

const BaseModel = require('./baseModel');

class Prioridad extends BaseModel {
    constructor() {
        super('prioridades.json');
    }

    // Métodos adicionales específicos para prioridades pueden ir aquí
}

module.exports = new Prioridad();
