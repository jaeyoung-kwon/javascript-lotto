import { createDOMElement } from "../../util/createDOMElement.js";
import { createBodyTable } from "./createBodyTable.js";

export const createModalBody = (result) => {
  const modalWrapper = createDOMElement("div", { class: "modal_wrapper" });
  const modalTitle = createDOMElement("p", {
    class: "modal_title",
    textContent: "🏆 당첨 통계 🏆",
  });

  const modalTable = createBodyTable(result.prize);

  const modalProfitText = createDOMElement("p", {
    class: "modal_profit_text",
    textContent: `당신의 총 수익률은 ${result.profit}%입니다.`,
  });
  const restartButton = createDOMElement("button", {
    class: "modal_restart_button",
    id: "modalRestartButton",
    type: "button",
    textContent: "다시 시작하기",
  });

  modalWrapper.appendChild(modalTitle);
  modalWrapper.appendChild(modalTable);
  modalWrapper.appendChild(modalProfitText);
  modalWrapper.appendChild(restartButton);

  return modalWrapper;
};
