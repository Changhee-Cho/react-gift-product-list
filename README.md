## react-gift-product-list

### 2단계 - 로그인, 주문하기 API 구현하기

🔸 로그인 기능

- [x] /login api 를 사용하여 로그인 기능을 완성해주세요.
- [x] 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용해주세요.
- [x] 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주세요. (react-toastify 라이브러리 사용)

🔸 주문하기 기능

- [x] /products/:productId/summary api를 사용하여 제품 정보를 가져와주세요.
- [x] 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시켜요.
- [x] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놔요.
- [x] /order api를 사용하여 주문하기 기능을 완성해주세요.
- [x] 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작해요.
- [x] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시켜요.

* API 서버는 next-step에서 제공하는 react-gift-mock-server를 사용하였으며, 접근은 http://localhost:3000을 통해서 함
