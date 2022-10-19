const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    { name: "park", tel: "010-4113-8018", zip: "서울특별시" },
    { name: "lee", tel: "010-9695-9115", zip: "서울특별시" },
  ]);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
