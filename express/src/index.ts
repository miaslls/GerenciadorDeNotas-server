import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.info(`ℹ️ Server running @ port ${port}\n- - - - - 🏃💨 `);
});
