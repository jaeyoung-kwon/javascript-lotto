import { MATCH_TO_RANK_TABLE, RANK_INFO_TABLE } from "../constant/rank.js";

class LottoCalculator {
  #winningNumbers;
  #bonusNumber;
  #prize;
  #totalPrice;
  #profit;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
    this.#prize = new Map([
      [5, []],
      [4, []],
      [3, []],
      [2, []],
      [1, []],
    ]);
  }

  calculatePrize(lotto) {
    const matchCount = lotto.countNumbersMatch(this.#winningNumbers);
    const isMatchBonus = lotto.isMatch(this.#bonusNumber);

    const rank = this.#getRank(matchCount, isMatchBonus);

    if (rank) {
      this.#prize.get(rank).push(lotto);
    }
  }

  #getRank(matchCount, isMatchBonus) {
    if (matchCount < 3 || matchCount > 6) {
      return null;
    }
    return MATCH_TO_RANK_TABLE[matchCount][isMatchBonus];
  }

  calculateTotalPrice() {
    this.#totalPrice = Array.from(this.#prize.entries()).reduce(
      (sum, [rank, rankLottos]) => {
        const info = RANK_INFO_TABLE[rank];
        return sum + info.price * rankLottos.length;
      },
      0
    );
  }

  calculateProfit(purchaseMoney) {
    this.#profit = (this.#totalPrice / purchaseMoney) * 100;
  }

  get prize() {
    return this.#prize;
  }

  get totalPrice() {
    return this.#totalPrice;
  }

  get profit() {
    return this.#profit;
  }
}

export default LottoCalculator;
