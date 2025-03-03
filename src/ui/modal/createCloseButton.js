import { createDOMElement } from "../../util/createDOMElement.js";

export const createCloseButton = () => {
  return createDOMElement(
    "div",
    {
      class: "modal_close_button_wrapper",
    },
    createDOMElement(
      "button",
      {
        id: "modalCloseButton",
        class: "modal_close_button",
        type: "button",
      },
      createDOMElement("img", {
        src: "icon/close.svg",
        alt: "Close",
      })
    )
  );
};
