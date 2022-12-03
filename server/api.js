import express from 'express';

export const api = express();

api.use(express.static('./public'));

api.use('/', express.static('index.html'));

api.listen(3000);
