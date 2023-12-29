import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { resultadoRouter } from './resultado/resultado.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/resultado', resultadoRouter);

app.listen(port, () => {
  console.info(`ℹ️ Server running @ port ${port}\n- - - - - 🏃💨 `);
});
