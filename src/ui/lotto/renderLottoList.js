import { createDOMElement } from "../../util/createDOMElement.js";
import { createInputForm } from "../winningNumber/createInputForm.js";
import { createLottoLength } from "./createLottoLength.js";
import { createLottoList } from "./createLottoList.js";

export const renderLottoList = (lottos) => {
  const lottoListWrapper = createDOMElement(
    "div",
    {
      class: "lotto_list_wrapper",
    },
    [
      createLottoLength(lottos.length),
      createLottoList(lottos),
      createInputForm(),
    ]
  );

  const bodyWrapper = document.querySelector(".body_wrapper");

  bodyWrapper.appendChild(lottoListWrapper);
};
