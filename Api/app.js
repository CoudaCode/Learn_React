import Http from "http";
import fs from "fs";
import path from "path";

const server = Http.createServer((req, res) => {
  console.log(req.url, req.method);
  // res.end("ok")
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Content-Type","application/json")
  if (req.url === "/api/auth/register" && req.method === "POST") {
    let body = "";
    req.on("data", (chunck) => {
      body += chunck;
    });
    req.on("end", () => {
      console.log("body", body);
      body = JSON.parse(body);
      let oldData = fs.readFileSync(path.join("Api", "data", "user.json"), {
        encoding: "utf-8",
      });

      oldData = JSON.parse(oldData);
      console.log("oldData", oldData);

      oldData.push(body);

      fs.writeFileSync(
        path.join("Api", "data", "user.json"),
        JSON.stringify(oldData),
        { encoding: "utf-8" }
      );

      res.end("ok");
    });
  }

  if (req.url === "/api/auth/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunck) => {
      body += chunck;
    });
    req.on("end", () => {
      body = JSON.parse(body);

      let oldData = fs.readFileSync(path.join("Api", "data", "user.json"), {
        encoding: "utf-8",
      });

      oldData = JSON.parse(oldData);

      let donne = oldData.find(
        (user) => user.email == body.email && user.password === body.password
      );

      if (donne) {
        return res.end(donne.email);
      } else {
        return res.end("error");
      }
    });
  }

  if (req.url == "/api/quiz" && req.method == "GET") {
    let QuizData = fs.readFileSync(path.join("Api", "data", "quiz.json"), {
      encoding: "utf-8",
    });
    res.end(QuizData);
  }
});

server.listen(4000, () => {
  console.log("connecté");
});
