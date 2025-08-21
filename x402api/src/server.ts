import app from './app';

const PORT = process.env.PORT || 4021;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
