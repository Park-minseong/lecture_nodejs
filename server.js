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

const multer = require("multer"); //파일 업로드를 위한 multer객체 생성
const upload = multer({ dest: "./upload" }); // upload폴더를 업로드 위치로 지정

app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM T_USER", (err, rows, fields) => {
    res.send(rows);
  });
});

app.use("/images", express.static("./upload"));

app.post("/api/customers", upload.single("profile"), (req, res) => {
  //multer를 이용해 profile이라는 키값으로 날라온 파일을 업로드
  let sql = `INSERT INTO T_USER VALUES(?,?,?,?)`;
  let profile = "/images/" + req.file.filename; //요청으로 날라온 파일의 파일이름
  let name = req.body.name;
  let tel = req.body.tel;
  let zip = req.body.zip;
  let params = [name, tel, zip, profile];

  connection.query(sql, params, (err, rows, field) => {
    res.send(rows);
    console.log(err);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
