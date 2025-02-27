import { createDOMElement } from "../../util/createDOMElement.js";
import { createLottoList } from "./createLottoList.js";
import { createInputForm } from "../winningNumber/createInputForm.js";
import WebController from "../../controller/WebController.js";
import { renderResultModal } from "../modal/renderResultModal.js";

export const renderLottoList = (lottos, purchaseMoney) => {
  const lottoListWrapper = createDOMElement("div", {
    class: "lotto_list_wrapper",
  });

  const lottoLengthText = createDOMElement("p", {
    class: "body_text",
    textContent: `총 ${lottos.length}개를 구매하였습니다.`,
  });

  const lottoList = createLottoList(lottos);

  const numberInputForm = createInputForm();

  lottoListWrapper.appendChild(lottoLengthText);
  lottoListWrapper.appendChild(lottoList);
  lottoListWrapper.appendChild(numberInputForm);

  const bodyWrapper = document.querySelector(".body_wrapper");

  bodyWrapper.appendChild(lottoListWrapper);

  const resultButton = document.getElementById("resultButton");
  resultButton.addEventListener("click", (e) => {
    try {
      e.preventDefault();

      const result = WebController.calculateResult(lottos, purchaseMoney);
      renderResultModal(result);
    } catch (error) {
      alert(error.message);
    }
  });
};
