import { createDOMElement } from "../../util/createDOMElement.js";

export const createResultButton = () => {
  return createDOMElement(
    "div",
    {
      class: "result_button_wrapper",
    },
    createDOMElement("button", {
      class: "result_button",
      id: "resultButton",
      type: "submit",
      textContent: "결과 확인하기",
    })
  );
};
