import WebController from "../../controller/WebController.js";
import { createDOMElement } from "../../util/createDOMElement.js";
import { createCloseButton } from "./createCloseButton.js";
import { createModalBody } from "./createModalBody.js";

export const renderResultModal = (result) => {
  if (document.querySelector(".modal_backdrop")) return;

  const modalBackdrop = createDOMElement("div", {
    class: "modal_backdrop",
    id: "modalBackdrop",
  });

  const modalContainer = createDOMElement("div", {
    class: "modal_container",
  });

  const closeButton = createCloseButton();

  const modalBody = createModalBody(result);

  modalContainer.appendChild(closeButton);
  modalContainer.appendChild(modalBody);

  modalBackdrop.appendChild(modalContainer);

  document.body.appendChild(modalBackdrop);
};
