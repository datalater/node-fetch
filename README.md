# Motivation

Node.js에서 HTTP request를 요청하고 response를 받아오는 예제 코드를 작성한다.

단, 본 프로젝트는 [node-fetch](https://www.npmjs.com/package/node-fetch#post-with-json) 패키지를 사용한다.

# Getting started

**1. 패키지 설치**

```bash
$ npm i
```

**2. .env 파일 수정**

> 존재하지 않을 경우 직접 생성한다.

```bash
APP_KEY=YOUR_KAKAO_REST_API_APP_KEY
SEL_URL=EMAIL_ME
```

APP_KEY 값에 발급 받은 카카오 REST API APP KEY를 채워 넣는다.

**3. 로컬 웹 서버 실행**

```bash
$ npm start
```

# Usage with examples

## Github REST API

[localhost:3000](http://127.0.0.1:3000/)

## SEL REST API

> .env 파일에 SEL_URL 값이 올바를 경우에만 정상 작동한다.

[http://127.0.0.1:3000/sel/pnu/1165010700100180001](http://127.0.0.1:3000/sel/pnu/1165010700100180001)

[http://127.0.0.1:3000/sel/pnu?pnu=1165010700100180001](http://127.0.0.1:3000/sel/pnu?pnu=1165010700100180001)

## Kakao REST API

[http://127.0.0.1:3000/kakao/zipcode?query=정자동 6](http://127.0.0.1:3000/kakao/zipcode?query=%EC%A0%95%EC%9E%90%EB%8F%996)

[http://127.0.0.1:3000/kakao/zipcode?query=없는주소](http://127.0.0.1:3000/kakao/zipcode?query=%EC%97%86%EB%8A%94%EC%A3%BC%EC%86%8C)

### JusoFindJuso REST API

> 실제로 완성된 juso-find-juso REST API는 없다. 단지 Kakao REST API의 결과를 정제해서, juso-find-juso REST API의 결과값을 보내주는 것뿐이다.

[http://127.0.0.1:3000/jusofindjuso/zipcode?query=정자동 6](http://127.0.0.1:3000/jusofindjuso/zipcode?query=%EC%A0%95%EC%9E%90%EB%8F%996)

[http://127.0.0.1:3000/jusofindjuso/v2/zipcode?query=정자동 6](http://127.0.0.1:3000/jusofindjuso/v2/zipcode?query=%EC%A0%95%EC%9E%90%EB%8F%996)

> v2 API는 코드 로직이 async/await으로 구현되었다. 구현 로직만 다를 뿐, 같은 동작을 한다.
