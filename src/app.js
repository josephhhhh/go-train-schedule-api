import app from './server.js';
const port = process.env.PORT || 3000;

const startApp = (port) => {
  try {
    app.listen(port, () => console.log(`service running at port ${port}`));
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

startApp(port);