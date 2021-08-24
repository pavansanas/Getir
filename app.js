const app = require("./app_config");
const serverPort = process.env.PORT || 3001;
app.listen(serverPort, () => {
  console.log(`listening at port:${serverPort}`);
});
