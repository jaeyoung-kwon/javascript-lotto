import { generateRandomNumbers } from "../util/generateRandomNumbers.js";
import Lotto from "./lotto.js";

class LottoMachine {
  getLottoCount(input) {
    const lottoCount = input / 1000;
    return lottoCount;
  }

  drawLotto(count) {
    return Array.from({ length: count }).map(() => {
      const randomNumber = generateRandomNumbers({ min: 1, max: 45, count: 6 });
      return new Lotto(randomNumber);
    });
  }
}

export default LottoMachine;
