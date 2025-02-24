import LottoMachine from "../../src/domain/lottoMachine.js";

describe("LottoMachine 객체 테스트", () => {
  let lottos;

  beforeEach(() => {
    const purchaseMoney = 1000;
    const lottoMachine = new LottoMachine();

    lottos = lottoMachine.drawLotto(purchaseMoney);
  });

  test("입력 받은 금액만큼 로또 개수를 계산한다.", () => {
    expect(lottos.length).toBe(1);
  });

  test("무작위로 생성된 숫자의 개수는 6개이다.", () => {
    const lotto = lottos[0];

    expect(lotto.numbers.length).toBe(6);
  });

  test("무작위로 생성된 숫자는 서로 중복되지 않는다.", () => {
    const lotto = lottos[0];

    expect(new Set(lotto.numbers).size).toBe(lotto.numbers.length);
  });
});
