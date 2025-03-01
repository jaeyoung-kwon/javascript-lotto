import { createDOMElement } from "../../util/createDOMElement.js";

export const createLottoLength = (length) => {
  return createDOMElement("p", {
    class: "body_text",
    textContent: `총 ${length}개를 구매하였습니다.`,
  });
};
