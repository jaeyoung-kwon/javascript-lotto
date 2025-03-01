import { createDOMElement } from "../../util/createDOMElement.js";

export const createLottoListElement = (lotto) => {
  return createDOMElement(
    "div",
    {
      class: "lotto_row",
    },
    [
      createDOMElement("div", {
        class: "lotto_icon",
        textContent: "🎟️",
      }),
      createDOMElement("p", {
        class: "body_text",
        textContent: lotto.numbers.join(", "),
      }),
    ]
  );
};
