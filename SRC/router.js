import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Rota para obter todas as frases
router.get('/frases', (req, res) => {
    const filePath = join(__dirname, 'frases.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo frases.json');
        return res.status(500).json({ error: 'Erro ao ler o arquivo frases.json' });
      }
  
      res.json(JSON.parse(data));
    });
  });

export default router;