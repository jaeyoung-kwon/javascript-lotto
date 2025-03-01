import { createDOMElement } from "../../util/createDOMElement.js";

export const createLottoList = (lottos) => {
  return createDOMElement(
    "div",
    {
      class: "lotto_list",
    },
    lottos.map((lotto) =>
      createDOMElement(
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
      )
    )
  );
};
