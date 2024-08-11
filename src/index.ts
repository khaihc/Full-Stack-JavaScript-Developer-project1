import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import imageRouter from './routes/routes.routes';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', imageRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app
