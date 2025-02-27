import { createDOMElement } from "../../util/createDOMElement.js";

export const createPurchaseWrapper = () => {
  const purchaseWrapper = createDOMElement("div", {
    class: "purchase_wrapper",
  });

  const purchaseInputForm = createDOMElement("form", {
    class: "purchase_input_wrapper",
  });

  const purchaseInput = createDOMElement("input", {
    id: "purchaseInput",
    class: "purchase_input",
    type: "number",
    placeholder: "구입",
  });

  const purchaseButton = createDOMElement("button", {
    type: "submit",
    tabindex: "-1",
    id: "purchaseButton",
    class: "purchase_button",
    textContent: "구입",
  });

  purchaseInputForm.appendChild(purchaseInput);
  purchaseInputForm.appendChild(purchaseButton);

  purchaseWrapper.appendChild(purchaseInputForm);

  return purchaseWrapper;
};
