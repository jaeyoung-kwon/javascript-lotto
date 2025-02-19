# Lotto

1.구입 금액 입력

- [x] 구입 금액을 입력 받는다. - UI
- [x] 예외 처리 - domain `validator`
  - [x] 문자인 경우, 예외메시지 출력
  - [x] 소수인 경우, 예외메시지 출력
  - [x] 공백인 경우, 예외메시지 출력
  - [x] 음수인 경우, 예외메시지 출력
  - [x] 1000으로 나누어 떨어지지않는 경우, 예외메시지 출력
- [x] 예외 메시지를 출력한 후 재입력 받는다. - UI

2. 로또 번호 생성 및 출력

- [x] 입력 받은 금액만큼 로또 개수를 계산한다. - domain `LottoMachine`
- [x] 로또 개수를 출력한다. - UI
- [x] 무작위 숫자 6개를 만든다. - domain `util` -> `LottoMachine`
  - [x] 숫자는 1 ~ 45 사이여야 한다. - domain
  - [x] 중복된 숫자가 있으면 안된다. - domain
  - [x] 오름차순으로 정렬한다. - domain
- [ ] 생성된 숫자로 로또를 생성한다. - domain `LottoMachine`
- [ ] 로또 개수만큼 로또를 생성한다. - domain `LottoMachine`
- [ ] 생성된 로또를 출력한다. - UI

3. 당첨 번호 입력

- [x] 당첨 번호를 입력 받는다. - UI
- [x] 예외 처리 - domain `validator`
  - [x] 당첨 번호가 6개가 아닌 경우, 예외메시지 출력
  - [x] 문자인 경우, 예외메시지 출력
  - [x] 소수인 경우, 예외메시지 출력
  - [x] 공백인 경우, 예외메시지 출력
  - [x] 당첨 번호가 1 ~ 45 사이의 숫자가 아닌 경우, 예외메시지 출력
  - [x] 당첨 번호가 중복되는 경우, 예외메시지 출력
- [x] 예외 메시지를 출력한 후 재입력 받는다. - UI

4. 보너스 번호 입력

- [x] 보너스 번호를 입력 받는다. - UI
- [x] 예외 처리 - domain `validator`
  - [x] 문자인 경우, 예외메시지 출력
  - [x] 소수인 경우, 예외메시지 출력
  - [x] 공백인 경우, 예외메시지 출력
  - [x] 당첨 번호가 1 ~ 45 사이의 숫자가 아닌 경우, 예외메시지 출력
  - [x] 당첨 번호와 중복되는 경우, 예외메시지 출력
- [x] 예외 메시지를 출력한 후 재입력 받는다. - UI

5. 당첨 통계 계산 - domain

- [ ] 로또 번호와 당첨 번호가 몇 개가 일치하는지 계산한다. `Lotto`
- [ ] 보너스 번호가 일치하는지 확인한다. `Lotto`
- [ ] 등수를 계산한다. `계산도메인`
- [ ] 등수에 따른 금액을 맞는 로또 개수와 곱하여 수익금액을 계산한다. `계산도메인`
- [ ] 전체 금액을 더해서 계산한다. `계산도메인`
- [ ] 전체 금액에서 구입 금액을 나눈다. `계산도메인`
- [ ] 총 수익률을 계산한다. `계산도메인`

6. 당첨 통계 출력 - UI

- [ ] 번호일치 개수와 등수에 따른 금액, 당첨 로또 개수를 출력한다.
  - 1등: 6개 번호 일치 / 2,000,000,000원
  - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  - 3등: 5개 번호 일치 /0,000원
  - 4등: 4개 번호 일치 / 50,000원
  - 5등: 3개 번호 일치 / 5,000원
- [ ] 총 수익률을 출력한다.

7. 재시작 및 종료

- [ ] y/n으로 재시작 및 종료 입력을 받는다. - UI
- [ ] 예외 처리 - domain `validator`
  - [ ] y/n 외의 입력이 들어왔을 경우, 예외메시지 출력
- [ ] 예외 메시지를 출력한 후 재입력 받는다. - UI

### 프로그래밍 요구 사항

- [ ] 변수 선언시 const 만 사용한다.
- [ ] 함수(또는 메서드)의 들여쓰기 depth는 1단계까지만 허용한다.
- [ ] 함수의 매개변수는 2개 이하여야 한다.
- [ ] 함수에서 부수 효과를 분리하고, 가능한 순수 함수를 많이 활용한다.
- [ ] 클래스(또는 객체)를 사용하는 경우, 프로퍼티를 외부에서 직접 꺼내지 않는다. 객체에 메시지를 보내도록 한다.
