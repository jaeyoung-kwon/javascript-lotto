import LottoCalculator from "../domain/lottoCalculator.js";
import EventHandler from "../handler/EventHandler.js";
import LottoState from "../state/LottoState.js";
import { renderBodyWrapper } from "../ui/main/renderBodyWrapper.js";
import WebInput from "../view/WebInput.js";

const WebController = {
  init() {
    renderBodyWrapper();
    new EventHandler();
  },

  calculateResult() {
    const winningNumbers = WebInput.getWinningNumbers();
    const bonusNumber = WebInput.getBonusNumber(winningNumbers);

    const lottos = LottoState.getLottos();
    const purchaseMoney = LottoState.getPurchaseMoney();

    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
    return result;
  },

  restart() {
    this.resetMain();
    this.init();
  },

  resetMain() {
    const bodyContainer = document.querySelector(".body_container");

    while (bodyContainer.firstChild) {
      bodyContainer.removeChild(bodyContainer.firstChild);
    }
  },
};

export default WebController;
