import { createDOMElement } from "../../util/createDOMElement";

export const createCloseButton = () => {
  const closeButtonWrapper = createDOMElement("div", {
    class: "modal_close_button_wrapper",
  });

  const closeButton = createDOMElement("button", {
    id: "modalCloseButton",
    class: "modal_close_button",
    type: "button",
  });
  const closeIcon = createDOMElement("img", {
    src: "/icon/close.svg",
    alt: "Close",
  });

  closeButton.appendChild(closeIcon);
  closeButtonWrapper.appendChild(closeButton);

  return closeButtonWrapper;
};
