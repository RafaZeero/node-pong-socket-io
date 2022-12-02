import express from 'express'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// relative reference to dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const api = express()

api.use(express.static(join(__dirname, 'public')))

api.use('/', express.static('index.html'))


export { api }