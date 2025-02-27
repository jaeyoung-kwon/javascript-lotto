import { createDOMElement } from "../../util/createDOMElement";

export const createCloseButton = () => {
  const closeButtonWrapper = createDOMElement("div", {
    class: "modal_close_button_wrapper",
  });

  const closeButton = createDOMElement("button", {
    class: "modal_close_button",
    type: "button",
    id: "modalCloseButton",
  });
  const closeIcon = createDOMElement("img", {
    src: "/icon/close.svg",
    alt: "Close",
  });

  closeButton.appendChild(closeIcon);
  closeButtonWrapper.appendChild(closeButton);

  return closeButtonWrapper;
};
