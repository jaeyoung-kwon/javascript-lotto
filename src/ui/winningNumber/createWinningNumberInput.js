import { LOTTO_RULE } from "../../constant/rule";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createWinningNumberInput = () => {
  const winningNumberInputBox = createDOMElement("div", {
    class: "number_input_box",
  });

  const winningNumberTitle = createDOMElement("p", {
    class: "body_text",
    textContent: "당첨 번호",
  });

  const winningNumberInputWrapper = createDOMElement("div", {
    class: "number_input_wrapper",
  });

  // 6개의 input을 생성
  Array.from({ length: LOTTO_RULE.lottoNumber.count }).forEach((_, index) => {
    const winningNumberInput = createDOMElement("input", {
      id: `winningNumberInput${index}`,
      class: "number_input",
      type: "number",
    });
    winningNumberInput.addEventListener("input", function () {
      if (this.value.length > 2) {
        this.value = this.value.slice(0, 2);
      }
    });
    winningNumberInputWrapper.appendChild(winningNumberInput);
  });

  winningNumberInputBox.appendChild(winningNumberTitle);
  winningNumberInputBox.appendChild(winningNumberInputWrapper);

  return winningNumberInputBox;
};
