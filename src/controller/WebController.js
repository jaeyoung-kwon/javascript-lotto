import LottoCalculator from "../domain/lottoCalculator.js";
import EventHandler from "../handler/EventHandler.js";
import LottoState from "../state/LottoState.js";
import WebInput from "../view/web/WebInput.js";
import WebOutput from "../view/web/WebOutput.js";

const WebController = {
  init() {
    new EventHandler();

    WebOutput.renderBodyWrapper();
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
    WebOutput.resetMain();
    this.init();
  },
};

export default WebController;
