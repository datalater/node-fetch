const express = require("express");
const app = express();
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
const githubUrl = "https://api.github.com/users/datalater";
const selUrl = process.env.SEL_URL;
const kakaoUrl = "https://dapi.kakao.com/v2/local/search/address.json";

app.listen(port, () => {
  console.log(`Start! express server on port ${port}`);
});

// 01 Github REST API 결과값 가져오기
app.get("/", (req, res) => {
  fetch(githubUrl)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

// 02 SEL REST API 결과값 가져오기 by dynamic route
app.get("/sel/pnu/:pnu", (req, res) => {
  const fullUrl = selUrl + "?pnu=" + req.params.pnu;

  fetch(fullUrl)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

// 03 SEL REST API 결과값 가져오기 by query string
app.get("/sel/pnu", (req, res) => {
  const fullUrl = selUrl + "?pnu=" + req.query.pnu;

  fetch(fullUrl)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

// 04 카카오 REST API 결과값 가져오기
app.get("/kakao/zipcode", (req, res) => {
  const fullUrl = kakaoUrl + "?query=" + encodeURIComponent(req.query.query);

  fetch(fullUrl, {
    method: "GET",
    headers: { Authorization: "KakaoAK " + process.env.APP_KEY }
  })
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

// 05-1 주소찾아주소 용도를 위해 카카오 REST API 결과값을 정제해서 보내기
app.get("/jusofindjuso/zipcode", (req, res) => {
  const fullUrl = kakaoUrl + "?query=" + encodeURIComponent(req.query.query);

  fetch(fullUrl, {
    method: "GET",
    headers: { Authorization: "KakaoAK " + process.env.APP_KEY }
  })
    .then(res => res.json())
    .then(data => {
      const zoneNo =
        data.documents.length === 0
          ? "Type correct address."
          : data.documents[0].road_address.zone_no;
      res.send({ zoneNo });
    })
    .catch(err => console.log(err));
});

// 05-2 async/await으로 05-1 구현하기
app.get("/jusofindjuso/v2/zipcode", async (req, res) => {
  const zoneNo = await getZipCode(req.query.query);
  res.send({ zoneNo });
});

const getZipCode = async query => {
  try {
    const fullUrl = kakaoUrl + "?query=" + encodeURIComponent(query);
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: { Authorization: "KakaoAK " + process.env.APP_KEY }
    });
    const data = await res.json();

    return data.documents.length === 0
      ? "Type correct address."
      : data.documents[0].road_address.zone_no;
  } catch (err) {
    console.log(err);
  }
};
