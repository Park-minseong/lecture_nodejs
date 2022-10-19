const fs = require("fs"); //파일에 접근 할 수 있는 라이브러리 - mysql연결 시 사용
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json"); // fs를 이용하여 mysql 설정파일 불러옴
const conf = JSON.parse(data); //json형태로 파싱
const mysql = require("mysql"); //mysql라이브러이 로딩

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
}); //createConnection 연결 수행, connection 변수는 database.json의 내용을 커넥션에 적용하여 연결한 객체 초기화
connection.connect(); // db연결

app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM T_USER", (err, rows, fields) => {
    res.send(rows);
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
