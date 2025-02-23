import Lotto from "../../src/domain/lotto.js";
import { sortArrayAscending } from "../../src/util/sorting.js";

describe("Lotto 객체 테스트", () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto([6, 4, 3, 2, 5, 1]);
  });

  test("로또 번호와 당첨 번호가 몇 개가 일치하는지 계산한다.", () => {
    expect(lotto.countNumbersMatch([3, 4, 5, 6, 7, 8])).toBe(4);
  });

  test("로또 번호와 보너스 번호가 일치하는지 확인한다.", () => {
    expect(lotto.isMatch(6)).toBe(true);
  });

  test("로또 번호가 오름차순으로 정렬되는지 확인한다.", () => {
    expect(sortArrayAscending(lotto.numbers)).toStrictEqual(lotto.numbers);
  });
});
