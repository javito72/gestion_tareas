// src/models/estado.js

const BaseModel = require('./baseModel');

class Estado extends BaseModel {
    constructor() {
        super('estados.json');
    }

    // Métodos adicionales específicos para estados pueden ir aquí
}

module.exports = new Estado();
