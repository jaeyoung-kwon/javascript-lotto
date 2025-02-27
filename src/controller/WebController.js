import { RANK_INFO_TABLE } from "../constant/rank.js";
import LottoCalculator from "../domain/lottoCalculator.js";
import LottoMachine from "../domain/lottoMachine.js";
import { renderResultModal } from "../ui/modal/renderResultModal.js";
import { createDOMElement } from "../util/createDOMElement.js";

class WebController {
  init() {
    const purchaseButton = document.getElementById("purchaseButton");
    purchaseButton.addEventListener("click", () => {
      this.purchaseLotto();
    });
  }

  purchaseLotto() {
    const input = document.getElementById("purchaseInput").value;
    const purchaseMoney = Number(input);

    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.drawLotto(purchaseMoney);

    const lottoListWrapper = createDOMElement("div", {
      class: "lotto_list_wrapper",
    });

    const lottoLengthText = createDOMElement("p", {
      class: "body_text",
      textContent: `총 ${lottos.length}개를 구매하였습니다.`,
    });

    const lottoList = createDOMElement("div", {
      class: "lotto_list",
    });

    lottos.forEach((lotto) => {
      const lottoLow = createDOMElement("div", {
        class: "lotto_row",
      });

      const lottoIcon = createDOMElement("div", {
        class: "lotto_icon",
        textContent: "🎟️",
      });
      const lottoNumbers = createDOMElement("p", {
        class: "body_text",
        textContent: lotto.numbers.join(", "),
      });
      lottoLow.appendChild(lottoIcon);
      lottoLow.appendChild(lottoNumbers);

      lottoList.appendChild(lottoLow);
    });

    const numberInputForm = createDOMElement("div", {
      class: "number_input_form",
    });

    const numberInputTitle = createDOMElement("p", {
      class: "body_text",
      textContent: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
    });

    const numberInputContainer = createDOMElement("div", {
      class: "number_input_container",
    });

    const winningNumberInputBox = createDOMElement("div", {
      class: "number_input_box",
    });

    const winningNumberTitle = createDOMElement("p", {
      class: "body_text",
      textContent: "당첨 번호",
    });

    const winningNumberInputWrapper = createDOMElement("div", {
      class: "number_input_wrapper",
    });

    for (let i = 0; i < 6; i++) {
      const winningNumberInput = createDOMElement("input", {
        id: `winningNumberInput${i}`,
        class: "number_input",
        type: "number",
      });
      winningNumberInput.addEventListener("input", function () {
        if (this.value.length > 2) {
          this.value = this.value.slice(0, 2);
        }
      });
      winningNumberInputWrapper.appendChild(winningNumberInput);
    }

    winningNumberInputBox.appendChild(winningNumberTitle);
    winningNumberInputBox.appendChild(winningNumberInputWrapper);

    const bonusNumberInputBox = createDOMElement("div", {
      class: "number_input_box",
    });

    const bonusNumberTitle = createDOMElement("p", {
      class: "body_text",
      textContent: "보너스 번호",
    });

    const bonusNumberInputWrapper = createDOMElement("div", {
      class: "number_input_wrapper",
    });

    const bonusNumberInput = createDOMElement("input", {
      id: "bonusNumberInput",
      class: "number_input",
      type: "number",
    });

    bonusNumberInput.addEventListener("input", function () {
      if (this.value.length > 2) {
        this.value = this.value.slice(0, 2);
      }
    });

    bonusNumberInputWrapper.appendChild(bonusNumberInput);

    bonusNumberInputBox.appendChild(bonusNumberTitle);
    bonusNumberInputBox.appendChild(bonusNumberInputWrapper);

    numberInputContainer.appendChild(winningNumberInputBox);
    numberInputContainer.appendChild(bonusNumberInputBox);

    const resultButtonWrapper = createDOMElement("div", {
      class: "result_button_wrapper",
    });

    const resultButtons = createDOMElement("button", {
      class: "result_button",
      id: "resultButton",
      textContent: "결과 확인하기",
    });

    resultButtonWrapper.appendChild(resultButtons);

    numberInputForm.appendChild(numberInputTitle);
    numberInputForm.appendChild(numberInputContainer);
    numberInputForm.appendChild(resultButtonWrapper);

    lottoListWrapper.appendChild(lottoLengthText);
    lottoListWrapper.appendChild(lottoList);
    lottoListWrapper.appendChild(numberInputForm);

    const bodyWrapper = document.querySelector(".body_wrapper");

    bodyWrapper.appendChild(lottoListWrapper);

    const resultButton = document.getElementById("resultButton");
    resultButton.addEventListener("click", () => {
      const result = this.calculateResult(lottos, purchaseMoney);
      renderResultModal(result);
    });
  }

  calculateResult(lottos, purchaseMoney) {
    const winningNumbers = Array.from({ length: 6 }).map((_, index) => {
      const input = document.getElementById(`winningNumberInput${index}`);
      return Number(input.value);
    });
    const bonusNumber = Number(
      document.getElementById("bonusNumberInput").value
    );

    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
    return result;
  }
}

export default WebController;
