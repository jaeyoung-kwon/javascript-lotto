import { createDOMElement } from "../../util/createDOMElement.js";

export const createLottoList = (lottos) => {
  const lottoList = createDOMElement("div", {
    class: "lotto_list",
  });

  lottos.forEach((lotto) => {
    const lottoLow = createDOMElement("div", {
      class: "lotto_row",
    });

    const lottoIcon = createDOMElement("div", {
      class: "lotto_icon",
      textContent: "🎟️",
    });
    const lottoNumbers = createDOMElement("p", {
      class: "body_text",
      textContent: lotto.numbers.join(", "),
    });

    lottoLow.appendChild(lottoIcon);
    lottoLow.appendChild(lottoNumbers);

    lottoList.appendChild(lottoLow);
  });

  return lottoList;
};
