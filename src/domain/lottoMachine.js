import { LOTTO_RULE } from "../constant/rule.js";
import Lotto from "./lotto.js";

class LottoMachine {
  drawLotto(purchaseMoney) {
    const lottoCount = this.#getLottoCount(purchaseMoney);

    return Array.from({ length: lottoCount }).map(() => {
      const randomNumber = this.#generateRandomNumbers(LOTTO_RULE.lottoNumber);
      return new Lotto(randomNumber);
    });
  }

  #generateRandomNumbers = ({ min, max, count }) => {
    const randomNumbers = new Set();
    while (randomNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers);
  };

  #getLottoCount(purchaseMoney) {
    return purchaseMoney / LOTTO_RULE.purchaseUnit;
  }
}

export default LottoMachine;
