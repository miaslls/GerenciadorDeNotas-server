import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { resultadosRouter } from './resultados/resultados.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/resultados', resultadosRouter);

app.listen(port, () => {
  console.info(`Server running @ port ${port} - - - - - 🏃💨 `);
});
