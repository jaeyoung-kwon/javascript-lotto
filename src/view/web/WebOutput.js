import { createLottoLength } from "../../ui/lotto/createLottoLength";
import { createLottoList } from "../../ui/lotto/createLottoList.js";
import { createBodyTitle } from "../../ui/main/createBodyTitle";
import { createPurchaseWrapper } from "../../ui/purchaseMoney/createPurchaseWrapper.js";
import { createCloseButton } from "../../ui/modal/createCloseButton.js";
import { createModalBody } from "../../ui/modal/createModalBody.js";
import { createInputForm } from "../../ui/winningNumber/createInputForm";
import { createDOMElement } from "../../util/createDOMElement.js";
import { createLottoListElement } from "../../ui/lotto/createLottoListElement.js";
import LottoState from "../../state/LottoState.js";

const WebOutput = {
  renderBodyWrapper() {
    const bodyWrapper = createDOMElement(
      "div",
      {
        class: "body_wrapper",
      },
      [createBodyTitle(), createPurchaseWrapper()]
    );

    const main = document.querySelector(".body_container");
    main.appendChild(bodyWrapper);
  },

  renderLottoList() {
    const lottoListWrapper = createDOMElement(
      "div",
      {
        class: "lotto_list_wrapper",
      },
      [createLottoLength(), createLottoList(), createInputForm()]
    );

    const bodyWrapper = document.querySelector(".body_wrapper");

    bodyWrapper.appendChild(lottoListWrapper);
  },

  renderResultModal(result) {
    if (document.querySelector(".modal_backdrop")) return;

    const modalBackdrop = createDOMElement(
      "div",
      {
        class: "modal_backdrop",
        id: "modalBackdrop",
      },
      createDOMElement(
        "div",
        {
          class: "modal_container",
        },
        [createCloseButton(), createModalBody(result)]
      )
    );

    document.body.appendChild(modalBackdrop);
  },

  disableButtons() {
    const purchaseButton = document.getElementById("purchaseButton");
    purchaseButton.disabled = true;
    const resultButton = document.getElementById("resultButton");
    resultButton.disabled = true;
  },

  appendLottoList(lottos) {
    const lottoListWrapper = document.querySelector(".lotto_list_wrapper");

    const lottoList = lottoListWrapper.querySelector(".lotto_list");

    lottos.forEach((lotto) => {
      const lottoElement = createLottoListElement(lotto);
      lottoList.appendChild(lottoElement);
    });

    const lottoLength = lottoListWrapper.querySelector(".body_text");
    lottoLength.textContent = `총 ${
      LottoState.getLottos().length
    }개를 구매하였습니다.`;
  },

  resetMain() {
    const bodyContainer = document.querySelector(".body_container");

    while (bodyContainer.firstChild) {
      bodyContainer.removeChild(bodyContainer.firstChild);
    }
  },
};

export default WebOutput;
