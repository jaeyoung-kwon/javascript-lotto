import LottoCalculator from "../domain/lottoCalculator.js";
import LottoMachine from "../domain/lottoMachine.js";
import { renderLottoList } from "../ui/lotto/renderLottoList.js";
import { renderBodyWrapper } from "../ui/main/renderBodyWrapper.js";
import WebInput from "../view/WebInput.js";

const WebController = {
  init: function () {
    renderBodyWrapper();
    const purchaseButton = document.getElementById("purchaseButton");
    purchaseButton.addEventListener("click", (e) => {
      try {
        e.preventDefault();

        this.purchaseLotto();
      } catch (error) {
        alert(error.message);
      }
    });
  },

  purchaseLotto: function () {
    const purchaseMoney = WebInput.getPurchaseMoney();

    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.drawLotto(purchaseMoney);

    renderLottoList(lottos, purchaseMoney);
  },

  calculateResult: (lottos, purchaseMoney) => {
    const winningNumbers = WebInput.getWinningNumbers();
    const bonusNumber = WebInput.getBonusNumber(winningNumbers);

    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
    return result;
  },

  restart: function () {
    this.resetMain();
    this.init();
  },

  resetMain: function () {
    const bodyContainer = document.querySelector(".body_container");

    while (bodyContainer.firstChild) {
      bodyContainer.removeChild(bodyContainer.firstChild);
    }
  },
};

export default WebController;
