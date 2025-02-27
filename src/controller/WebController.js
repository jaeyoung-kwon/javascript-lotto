import LottoCalculator from "../domain/lottoCalculator.js";
import LottoMachine from "../domain/lottoMachine.js";
import { renderLottoList } from "../ui/lotto/renderLottoList.js";

class WebController {
  init() {
    const purchaseButton = document.getElementById("purchaseButton");
    purchaseButton.addEventListener("click", () => {
      this.purchaseLotto();
    });
  }

  purchaseLotto() {
    const input = document.getElementById("purchaseInput").value;
    const purchaseMoney = Number(input);

    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.drawLotto(purchaseMoney);

    renderLottoList(lottos, purchaseMoney);
  }

  static calculateResult(lottos, purchaseMoney) {
    const winningNumbers = Array.from({ length: 6 }).map((_, index) => {
      const input = document.getElementById(`winningNumberInput${index}`);
      return Number(input.value);
    });
    const bonusNumber = Number(
      document.getElementById("bonusNumberInput").value
    );

    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
    return result;
  }
}

export default WebController;
