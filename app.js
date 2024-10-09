// app.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Configurar Pug como motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar sesiones
app.use(session({
    secret: 'secreto_super_seguro', // Cambia esto a una cadena secreta en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Asegúrate de configurar 'secure' en true si usas HTTPS
}));

// Middleware para agregar información del usuario a las vistas
app.use((req, res, next) => {
    res.locals.usuario = null;
    if (req.session && req.session.usuarioId) {
        const usuario = require('./src/models/usuario').getById(req.session.usuarioId);
        if (usuario) {
            res.locals.usuario = usuario;
        }
    }
    next();
});

// Importar rutas
const tareaRoutes = require('./src/routes/tareas');
const usuarioRoutes = require('./src/routes/usuarios');
const authRoutes = require('./src/routes/auth');

// Usar rutas
app.use('/tareas', tareaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/auth', authRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Sistema de Gestión de Tareas' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
