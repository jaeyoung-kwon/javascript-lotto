import { LOTTO_RULE } from "../constant/rule.js";
import { generateRandomNumbers } from "../util/generateRandomNumbers.js";
import Lotto from "./lotto.js";

class LottoMachine {
  getLottoCount(purchaseMoney) {
    const lottoCount = purchaseMoney / LOTTO_RULE.purchaseUnit;
    return lottoCount;
  }

  drawLotto(count) {
    return Array.from({ length: count }).map(() => {
      const randomNumber = generateRandomNumbers(LOTTO_RULE.lottoNumber);
      return new Lotto(randomNumber);
    });
  }
}

export default LottoMachine;
