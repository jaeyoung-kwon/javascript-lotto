import { createDOMElement } from "../../util/createDOMElement.js";
import { createCloseButton } from "./createCloseButton.js";
import { createModalBody } from "./createModalBody.js";

export const renderResultModal = (result) => {
  if (document.querySelector(".modal_backdrop")) return;

  const modalBackdrop = createDOMElement("div", { class: "modal_backdrop" });

  const modalContainer = createDOMElement("div", {
    class: "modal_container",
  });

  const closeButton = createCloseButton();

  const modalBody = createModalBody(result);

  modalContainer.appendChild(closeButton);
  modalContainer.appendChild(modalBody);

  modalBackdrop.appendChild(modalContainer);

  // DOM에 추가
  document.body.appendChild(modalBackdrop);

  closeButton.addEventListener("click", () => {
    modalBackdrop.remove();
  });

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.remove();
    }
  });
};
