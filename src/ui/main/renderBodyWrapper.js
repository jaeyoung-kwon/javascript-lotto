import { createDOMElement } from "../../util/createDOMElement.js";
import { createPurchaseWrapper } from "../purchaseMoney/createPurchaseWrapper.js";

export const renderBodyWrapper = () => {
  const bodyWrapper = createDOMElement("div", {
    class: "body_wrapper",
  });

  const bodyTitle = createDOMElement("p", {
    class: "body_title",
    textContent: "🎱 내 번호 당첨 확인 🎱",
  });

  const purchaseWrapper = createPurchaseWrapper();

  bodyWrapper.appendChild(bodyTitle);
  bodyWrapper.appendChild(purchaseWrapper);

  const main = document.querySelector(".body_container");
  main.appendChild(bodyWrapper);
};
