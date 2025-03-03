class EventHandler {
  constructor(controller) {
    this.controller = controller;

    this._elem = document.body;
    this._elem.onclick = this.onClick.bind(this);
  }

  onClick(event) {
    const targetElement = event.target.closest("[id]");

    if (targetElement) {
      const handler = this.#getHandler(targetElement.id);
      handler?.(event);
    }
  }

  #getHandler(buttonId) {
    const handlers = {
      purchaseButton: this.controller.handlePurchase.bind(this.controller),
      resultButton: this.controller.handleResult.bind(this.controller),
      modalRestartButton: this.controller.handleRestart.bind(this.controller),
      modalCloseButton: this.controller.handleCloseModal.bind(this.controller),
      modalBackdrop: this.controller.handleCloseModal.bind(this.controller),
    };
    return handlers[buttonId];
  }
}

export default EventHandler;
