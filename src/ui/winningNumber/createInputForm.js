import { createDOMElement } from "../../util/createDOMElement.js";
import { createResultButton } from "./createResultButton.js";
import { createBonusNumberInput } from "./createBonusNumberInput.js";
import { createWinningNumberInput } from "./createWinningNumberInput.js";

export const createInputForm = () => {
  const numberInputForm = createDOMElement("div", {
    class: "number_input_form",
  });

  const numberInputTitle = createDOMElement("p", {
    class: "body_text",
    textContent: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
  });

  const numberInputContainer = createDOMElement("div", {
    class: "number_input_container",
  });

  const winningNumberInput = createWinningNumberInput();
  const bonusNumberInput = createBonusNumberInput();

  numberInputContainer.appendChild(winningNumberInput);
  numberInputContainer.appendChild(bonusNumberInput);

  const resultButtonWrapper = createResultButton();

  numberInputForm.appendChild(numberInputTitle);
  numberInputForm.appendChild(numberInputContainer);
  numberInputForm.appendChild(resultButtonWrapper);

  return numberInputForm;
};
