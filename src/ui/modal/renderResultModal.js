import { createDOMElement } from "../../util/createDOMElement.js";
import { createCloseButton } from "./createCloseButton.js";
import { createModalBody } from "./createModalBody.js";

export const renderResultModal = (result) => {
  if (document.querySelector(".modal_backdrop")) return;

  const modalBackdrop = createDOMElement(
    "div",
    {
      class: "modal_backdrop",
      id: "modalBackdrop",
    },
    createDOMElement(
      "div",
      {
        class: "modal_container",
      },
      [createCloseButton(), createModalBody(result)]
    )
  );

  document.body.appendChild(modalBackdrop);
};
