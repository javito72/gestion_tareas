// src/models/usuario.js

const BaseModel = require('./baseModel');

class Usuario extends BaseModel {
    constructor() {
        super('usuarios.json');
    }

    // Métodos adicionales específicos para usuarios pueden ir aquí
}

module.exports = new Usuario();
