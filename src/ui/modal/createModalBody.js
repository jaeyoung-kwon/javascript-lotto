import { createDOMElement } from "../../util/createDOMElement.js";
import { createBodyTable } from "./createBodyTable.js";

export const createModalBody = (result) => {
  return createDOMElement("div", { class: "modal_wrapper" }, [
    createDOMElement("p", {
      class: "modal_title",
      textContent: "🏆 당첨 통계 🏆",
    }),
    createBodyTable(result.prize),
    createDOMElement("p", {
      class: "modal_profit_text",
      textContent: `당신의 총 수익률은 ${result.profit}%입니다.`,
    }),
    createDOMElement("button", {
      class: "modal_restart_button",
      id: "modalRestartButton",
      type: "button",
      textContent: "다시 시작하기",
    }),
  ]);
};
