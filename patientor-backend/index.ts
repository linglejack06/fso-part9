import express from "express";

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});