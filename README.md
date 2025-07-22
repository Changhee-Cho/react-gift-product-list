## react-gift-product-list

### 3단계 - 테마 상품 목록 페이지 구현하기

🔸 테마 상품 목록 페이지

- [x] 선물하기 홈 > 선물 테마 섹션의 아이템을 클릭하면 테마 상품 목록 페이지로 연결돼요.
- [x] /api/themes/:themeId/info API를 사용하여 선물 테마 섹션의 히어로 영역을 구현해요.
- [x] 만약 테마 정보를 가져오는 API가 404 에러가 발생하면 선물하기 홈 페이지로 연결해요.
- [x] /api/themes/:themeId/products API를 사용하여 상품 리스트를 구현해요.
- [x] 무한 스크롤 기능을 구현해요.
- [x] 상품 리스트가 없으면 빈 페이지를 보여줘요.

- API mock-server 및 API 요구 명세서(Markdown) : https://github.com/Changhee-Cho/react-gift-mock-server
- API 서버는 next-step에서 제공하는 react-gift-mock-server를 사용하였으며, 접근은 http://localhost:3000 을 통해서 함
