import { createDOMElement } from "../../util/createDOMElement.js";

export const createBonusNumberInput = () => {
  // input event listener 추가하기
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

  return createDOMElement(
    "div",
    {
      class: "number_input_box",
    },
    [
      createDOMElement("label", {
        class: "body_text",
        textContent: "보너스 번호",
      }),
      createDOMElement(
        "div",
        {
          class: "number_input_wrapper",
        },
        bonusNumberInput
      ),
    ]
  );
};
