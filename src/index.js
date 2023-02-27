require("dotenv/config");
const express = require("express");
var bodyParser = require("body-parser");
// connecting to database
const { connect } = require("./db/init");
const cors = require("cors");

// create an application object
const app = express();
//to avoid cors policy error
app.use(cors({ origin: "*" }));
//for request body data
app.use(express.json());

//initial screen display
app.get("/", (req, res) => {
  res.send(
    '<div style="width:200px; margin: auto auto;"><img width="100%"  src="https://media.tenor.com/2jd3xi2WVt0AAAAC/recurring-settings.gif"></div><div style="width:220px; margin: 0 auto;"><h2>Server is Running...</h2></div>'
  );
});
//routes
app.use("/login", require("./routes/login.routes"));
app.use("/employee", require("./routes/employee.routes"));
app.use(require("./middelware/errors").resourceNotFound);
app.use(require("./middelware/errors").errorHandler);

const PORT = process.env.PORT || 5001;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
