import { createDOMElement } from "../../util/createDOMElement.js";
import { createPurchaseWrapper } from "../purchaseMoney/createPurchaseWrapper.js";
import { createBodyTitle } from "./createBodyTitle.js";

export const renderBodyWrapper = () => {
  const bodyWrapper = createDOMElement(
    "div",
    {
      class: "body_wrapper",
    },
    [createBodyTitle(), createPurchaseWrapper()]
  );

  const main = document.querySelector(".body_container");
  main.appendChild(bodyWrapper);
};
