import { PRIZE } from "../../src/constant/prize.js";
import { RANK_INFO_TABLE } from "../../src/constant/rank.js";
import { LOTTO_RULE } from "../../src/constant/rule.js";
import Lotto from "../../src/domain/lotto.js";
import LottoCalculator from "../../src/domain/lottoCalculator.js";

describe("로또 등수 계산", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  let lottoCalculator;

  beforeEach(() => {
    lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
  });

  test("1등 조건 일치 확인", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(PRIZE.first)[0]).toBe(lotto);
  });

  test("2등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 7]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(PRIZE.second)[0]).toBe(lotto);
  });

  test("3등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 8]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(PRIZE.third)[0]).toBe(lotto);
  });
  test("4등 조건 일치 확인", () => {
    const lotto = new Lotto([3, 4, 5, 6, 8, 9]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(PRIZE.forth)[0]).toBe(lotto);
  });
  test("5등 조건 일치 확인", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(PRIZE.fifth)[0]).toBe(lotto);
  });

  test("등수에따른 수익 금액을 확인한다.", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);

    lottoCalculator.calculatePrize(lotto);
    lottoCalculator.calculateTotalPrice();

    expect(lottoCalculator.totalPrice).toBe(RANK_INFO_TABLE[5].price);
  });

  test("계산된 수익 금액을 바탕으로 수익률을 계산한다.", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);
    const purchaseMoney = LOTTO_RULE.purchaseUnit * 1;

    lottoCalculator.calculatePrize(lotto);
    lottoCalculator.calculateTotalPrice();
    lottoCalculator.calculateProfit(purchaseMoney);

    expect(lottoCalculator.profit).toBe(500);
  });
});
