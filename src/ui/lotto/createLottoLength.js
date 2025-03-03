import LottoState from "../../state/LottoState.js";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createLottoLength = () => {
  const lottoLength = LottoState.getLottos().length;
  return createDOMElement("h3", {
    class: "body_text",
    textContent: `총 ${lottoLength}개를 구매하였습니다.`,
  });
};
