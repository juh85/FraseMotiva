import express from 'express';
import fraseRouter from './router.js';

const app = express();

// Middleware
app.use(express.json());

// Habilitar CORS (inclui preflight OPTIONS)
// CORS (Cross-Origin Resource Sharing - Compartilhamento de recursos de origem cruzada)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Permitir localhost em qualquer porta comum (80, 8080, etc) ou usar a origem da requisição
    if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        res.header('Access-Control-Allow-Origin', origin);
    } else {
        res.header('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); 
    }
    next();
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/test', (req, res) => {
    res.status(200).send({ 
        success: true, 
        message: 'Servidor está funcionando!',
        timestamp: new Date().toISOString()
    });
});

// Rotas
app.use(fraseRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
    console.log('=================================');
    console.log('Teste a rota: http://localhost:3000/test');
});