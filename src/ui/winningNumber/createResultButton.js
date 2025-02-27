import { createDOMElement } from "../../util/createDOMElement.js";

export const createResultButton = () => {
  const resultButtonWrapper = createDOMElement("div", {
    class: "result_button_wrapper",
  });

  const resultButton = createDOMElement("button", {
    class: "result_button",
    id: "resultButton",
    type: "submit",
    textContent: "결과 확인하기",
  });

  resultButtonWrapper.appendChild(resultButton);

  return resultButtonWrapper;
};
