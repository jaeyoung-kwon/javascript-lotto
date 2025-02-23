import LottoCalculator from "./domain/lottoCalculator.js";
import LottoMachine from "./domain/lottoMachine.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/outputView.js";

class App {
  #lottoCalculator;

  async run() {
    const purchaseMoney = await InputView.getPurchaseMoney();

    const lottoMachine = new LottoMachine();

    const lottoCount = lottoMachine.getLottoCount(purchaseMoney);
    const lottos = lottoMachine.drawLotto(lottoCount);
    OutputView.printLottoCount(lottoCount);
    OutputView.printLotto(lottos);

    const winningNumbers = await InputView.getWinningNumbers();
    const bonusNumber = await InputView.getBonusNumber(winningNumbers);
    this.#lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    this.calculateResult(lottos, purchaseMoney);
    OutputView.printResult(
      this.#lottoCalculator.prize,
      this.#lottoCalculator.profit
    );

    await this.restart();
  }

  calculateResult(lottos, purchaseMoney) {
    lottos.forEach((lotto) => {
      this.#lottoCalculator.calculatePrize(lotto);
    });
    this.#lottoCalculator.calculateTotalPrice();
    this.#lottoCalculator.calculateProfit(purchaseMoney);
  }

  async restart() {
    const restartAnswer = await InputView.getRestartRequest();
    if (restartAnswer === "y") {
      await this.run();
    }
  }
}

export default App;
