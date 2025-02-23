import { PRIZE } from "../../src/constant/prize.js";
import { RANK_INFO_TABLE } from "../../src/constant/rank.js";
import { LOTTO_RULE } from "../../src/constant/rule.js";
import Lotto from "../../src/domain/lotto.js";
import LottoCalculator from "../../src/domain/lottoCalculator.js";

const RANK_TEST_CASE = [
  [[[1, 2, 3, 4, 5, 6]], PRIZE.first], // 6개 일치
  [[[2, 3, 4, 5, 6, 7]], PRIZE.second], // 5개 일치 + 보너스 번호 일치
  [[[2, 3, 4, 5, 6, 8]], PRIZE.third], // 5개 일치 + 보너스 번호 불일치
  [[[3, 4, 5, 6, 8, 9]], PRIZE.forth], // 4개 일치
  [[[4, 5, 6, 8, 9, 10]], PRIZE.fifth], // 3개 일치
  [
    [
      [4, 5, 6, 8, 9, 10], // 3개 일치
      [1, 2, 3, 17, 14, 12], // 3개 일치
    ],
    PRIZE.fifth,
  ],
  [
    [
      [3, 4, 5, 6, 8, 9], // 4개 일치
      [1, 3, 4, 5, 14, 12], // 4개 일치
    ],
    PRIZE.forth,
  ],
];

describe("로또 등수 계산", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const initialPrize = new Map([
    [PRIZE.fifth, []],
    [PRIZE.forth, []],
    [PRIZE.third, []],
    [PRIZE.second, []],
    [PRIZE.first, []],
  ]);

  let lottoCalculator;

  beforeEach(() => {
    lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
  });

  test.each(RANK_TEST_CASE)(
    "등수별 조건 일치 확인",
    (lottoNumbersSet, rank) => {
      const lottos = lottoNumbersSet.map(
        (lottoNumbers) => new Lotto(lottoNumbers)
      );

      lottos.forEach((lotto) => {
        lottoCalculator.calculatePrize(lotto);
      });

      expect(lottoCalculator.prize.get(rank)).toStrictEqual(lottos);
    }
  );

  test("등수에 들지 않는 조건 확인", () => {
    const lotto1 = new Lotto([5, 6, 8, 9, 10, 11]); // 2개 일치
    const lotto2 = new Lotto([6, 8, 9, 10, 11, 12]); // 1개 일치

    lottoCalculator.calculatePrize(lotto1);
    lottoCalculator.calculatePrize(lotto2);

    expect(lottoCalculator.prize).toStrictEqual(initialPrize);
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
