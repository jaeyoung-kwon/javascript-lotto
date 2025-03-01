import { createDOMElement } from "../../util/createDOMElement.js";

export const createPurchaseWrapper = () => {
  const purchaseWrapper = createDOMElement(
    "div",
    {
      class: "purchase_wrapper",
    },
    createDOMElement(
      "form",
      {
        class: "purchase_input_wrapper",
      },
      [
        createDOMElement("input", {
          id: "purchaseInput",
          class: "purchase_input",
          type: "number",
          placeholder: "구입",
        }),
        createDOMElement("button", {
          type: "submit",
          tabindex: "-1",
          id: "purchaseButton",
          class: "purchase_button",
          textContent: "구입",
        }),
      ]
    )
  );

  return purchaseWrapper;
};
