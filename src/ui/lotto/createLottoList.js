import LottoState from "../../state/LottoState.js";
import { createDOMElement } from "../../util/createDOMElement.js";
import { createLottoListElement } from "./createLottoListElement.js";

export const createLottoList = () => {
  const lottos = LottoState.getLottos();

  return createDOMElement(
    "div",
    {
      class: "lotto_list",
    },
    lottos.map((lotto) => createLottoListElement(lotto))
  );
};
