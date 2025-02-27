import LottoCalculator from "../domain/lottoCalculator.js";
import LottoMachine from "../domain/lottoMachine.js";
import { renderLottoList } from "../ui/lotto/renderLottoList.js";
import WebInput from "../view/WebInput.js";

class WebController {
  init() {
    const purchaseButton = document.getElementById("purchaseButton");
    purchaseButton.addEventListener("click", () => {
      this.purchaseLotto();
    });
  }

  purchaseLotto() {
    const purchaseMoney = WebInput.getPurchaseMoney();
    if (!purchaseMoney) return;

    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.drawLotto(purchaseMoney);

    renderLottoList(lottos, purchaseMoney);
  }

  static calculateResult(lottos, purchaseMoney) {
    const winningNumbers = WebInput.getWinningNumbers();
    if (!winningNumbers) return;
    const bonusNumber = WebInput.getBonusNumber(winningNumbers);
    if (!bonusNumber) return;

    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
    return result;
  }
}

export default WebController;
