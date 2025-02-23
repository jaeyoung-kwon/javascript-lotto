import LottoMachine from "../../src/domain/lottoMachine.js";
import { generateRandomNumbers } from "../../src/util/generateRandomNumbers.js";

describe("LottoMachine 객체 테스트", () => {
  test("입력 받은 금액만큼 로또 개수를 계산한다.", () => {
    const input = Number("1000");

    const lottoMachine = new LottoMachine();

    expect(lottoMachine.getLottoCount(input)).toBe(1);
  });

  test("무작위로 생성된 숫자의 개수는 6개이다.", () => {
    expect(generateRandomNumbers({ min: 1, max: 45, count: 6 }).length).toBe(6);
  });

  test("무작위로 생성된 숫자는 서로 중복되지 않는다.", () => {
    const randomNumbers = generateRandomNumbers({ min: 1, max: 45, count: 6 });

    expect(new Set(randomNumbers).size).toBe(randomNumbers.length);
  });
});
