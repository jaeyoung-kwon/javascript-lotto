import { LOTTO_RULE } from "../../constant/rule.js";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createWinningNumberInput = () => {
  return createDOMElement(
    "div",
    {
      class: "number_input_box",
    },
    [
      createDOMElement("label", {
        class: "body_text",
        textContent: "당첨 번호",
      }),
      createDOMElement(
        "div",
        {
          class: "number_input_wrapper",
        },
        Array.from({ length: LOTTO_RULE.lottoNumber.count }).map((_, index) =>
          createDOMElement("input", {
            id: `winningNumberInput${index}`,
            class: "number_input",
            type: "number",
          })
        )
      ),
    ]
  );
};
