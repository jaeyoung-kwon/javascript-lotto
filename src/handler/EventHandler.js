import WebController from "../controller/WebController.js";
import LottoMachine from "../domain/lottoMachine.js";
import LottoState from "../state/LottoState.js";
import WebOutput from "../view/web/WebOutput.js";
import WebInput from "../view/web/WebInput.js";

class EventHandler {
  constructor() {
    this._elem = document.body;
    this._elem.onclick = this.onClick.bind(this);
  }

  purchaseButton(event) {
    try {
      event.preventDefault();

      const purchaseMoney = WebInput.getPurchaseMoney();
      const lottoMachine = new LottoMachine();
      const lottos = lottoMachine.drawLotto(purchaseMoney);

      const lottoList = document.querySelector(".lotto_list");
      if (lottoList) {
        LottoState.addLottos(lottos);
        LottoState.addPurchaseMoney(purchaseMoney);
        WebOutput.appendLottoList(lottos);
      } else {
        LottoState.setLottos(lottos);
        LottoState.setPurchaseMoney(purchaseMoney);
        WebOutput.renderLottoList();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  resultButton(event) {
    try {
      event.preventDefault();

      const result = WebController.calculateResult();
      WebOutput.renderResultModal(result);

      const purchaseButton = document.getElementById("purchaseButton");
      purchaseButton.disabled = true;
      const resultButton = document.getElementById("resultButton");
      resultButton.disabled = true;
    } catch (error) {
      alert(error.message);
    }
  }

  modalRestartButton() {
    this.#modalClose();

    WebController.restart();
  }

  modalCloseButton() {
    this.#modalClose();
  }

  modalBackdrop(event) {
    const modalBackdrop = document.querySelector(".modal_backdrop");

    if (event.target === modalBackdrop) {
      this.#modalClose();
    }
  }

  #modalClose() {
    const modalBackdrop = document.querySelector(".modal_backdrop");

    modalBackdrop.remove();
  }

  onClick(event) {
    const targetElement = event.target.closest("[id]");

    if (targetElement && this[targetElement.id]) {
      this[targetElement.id](event);
    }
  }
}

export default EventHandler;
