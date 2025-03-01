import { createDOMElement } from "../../util/createDOMElement.js";

export const createBodyTitle = () => {
  return createDOMElement("p", {
    class: "body_title",
    textContent: "🎱 내 번호 당첨 확인 🎱",
  });
};
