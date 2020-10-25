# 📝 Form Validator 학습 내용
## HTML / CSS
- **속성**: margin보다 padding을 좀더 깔끔하게 활용하자
  - 각 질의응답 영역과 제출 버튼의 길이와 간격이 일정하니 그를 감싸는 큰 `inner`에 `padding` 속성 주기

## Javascript
### 레퍼런스
- `showError(input, message)` 함수를 통해 `input`에 따라 적절한 에러 메세지를 파라미터 형태로 제공
- `showError`, `showSuccess` 함수: 각 질의응답 영역의 class 이름을 바꾸며 각각에 따른 CSS를 보여줌
- `checkRequired(inputArr)` 함수: 각 질의응답 영역을 inputArr 형태로 파라미터로 넣으면 이 함수 안에서 답변의 형식이 올바른지 틀린지 체크함
- 아이디의 길이와 비밀번호의 길이, 그리고 이메일과 비밀번호 확인의 유효성 검사는 모두 따로 함수를 생성함.

- 분석 결론: 한 함수가 하나의 목적을 위해 만들어짐. 함수를 잘 쪼개어 만들었다고 생각됨.
### 내 코드
(~2020/10/21 코드)
- 각 질의응답 수행 후 `Enter` 입력 시 제출되게 기능 추가
- `checkAnswers(input, reg)` 함수: `input` 파라미터에 각 질의응답 영역의 `input id`를 넣으면 input 박스의 테두리색과 에러메세지가 컨트롤됨.

- 분석 결론 (1): 한 함수가 너무 많은 일을 하는 것 같다. 쪼개야 할 필요가 있는 듯.
- 분석 결론 (2): `checkAnswers` 함수의 `input` 파라미터 대신 레퍼런스처럼 `inputArr` 파라미터를 넣어 foreach문을 써서 짤 수 있지 않을까?
## Questions
- `<div>`와 `<section>` 태그를 언제 적절히 사용해야 하는지 감이 잘 안 잡힘.

## TODO
