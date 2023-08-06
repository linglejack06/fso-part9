import express from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('ping');
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});