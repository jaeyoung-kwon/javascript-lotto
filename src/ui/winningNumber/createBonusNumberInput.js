import { createDOMElement } from "../../util/createDOMElement.js";

export const createBonusNumberInput = () => {
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
        createDOMElement("input", {
          id: "bonusNumberInput",
          class: "number_input",
          type: "number",
        })
      ),
    ]
  );
};
