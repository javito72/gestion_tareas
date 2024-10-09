// src/models/baseModel.js

const fs = require('fs');
const path = require('path');

class BaseModel {
    constructor(filename) {
        this.filePath = path.join(__dirname, '../../data', filename);
    }

    // Obtener todos los registros
    getAll() {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    // Guardar todos los registros
    saveAll(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    // Obtener un registro por ID
    getById(id) {
        const data = this.getAll();
        return data.find(item => item.id === id);
    }

    // Crear un nuevo registro
    create(item) {
        const data = this.getAll();
        data.push(item);
        this.saveAll(data);
        return item;
    }

    // Actualizar un registro existente
    update(id, updatedItem) {
        const data = this.getAll();
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedItem };
            this.saveAll(data);
            return data[index];
        }
        return null;
    }

    // Eliminar un registro
    delete(id) {
        let data = this.getAll();
        data = data.filter(item => item.id !== id);
        this.saveAll(data);
    }
}

module.exports = BaseModel;
