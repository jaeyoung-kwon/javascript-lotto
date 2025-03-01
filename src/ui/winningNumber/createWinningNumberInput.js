import { LOTTO_RULE } from "../../constant/rule";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createWinningNumberInput = () => {
  return createDOMElement(
    "div",
    {
      class: "number_input_box",
    },
    [
      createDOMElement("p", {
        class: "body_text",
        textContent: "당첨 번호",
      }),
      createDOMElement(
        "div",
        {
          class: "number_input_wrapper",
        },
        Array.from({ length: LOTTO_RULE.lottoNumber.count }).map((_, index) => {
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

          return winningNumberInput;
        })
      ),
    ]
  );
};
