import { createDOMElement } from "../../util/createDOMElement.js";

export const createBonusNumberInput = () => {
  const bonusNumberInputBox = createDOMElement("div", {
    class: "number_input_box",
  });

  const bonusNumberTitle = createDOMElement("p", {
    class: "body_text",
    textContent: "보너스 번호",
  });

  const bonusNumberInputWrapper = createDOMElement("div", {
    class: "number_input_wrapper",
  });

  const bonusNumberInput = createDOMElement("input", {
    id: "bonusNumberInput",
    class: "number_input",
    type: "number",
  });

  bonusNumberInput.addEventListener("input", function () {
    if (this.value.length > 2) {
      this.value = this.value.slice(0, 2);
    }
  });

  bonusNumberInputWrapper.appendChild(bonusNumberInput);

  bonusNumberInputBox.appendChild(bonusNumberTitle);
  bonusNumberInputBox.appendChild(bonusNumberInputWrapper);

  return bonusNumberInputBox;
};
