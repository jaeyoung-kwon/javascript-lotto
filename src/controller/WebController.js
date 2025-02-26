import LottoMachine from "../domain/lottoMachine.js";
import { createDOMElement } from "../util/createDOMElement.js";

class WebController {
  init() {
    const purchaseButton = document.getElementById("purchaseButton");
    purchaseButton.addEventListener("click", this.purchaseLotto.bind(this));
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
        class: "number_input",
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
      class: "number_input",
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
    console.log("SDFSDFSDf");
    resultButton.addEventListener("click", this.showModal.bind(this));
  }

  showModal() {
    if (document.querySelector(".modal_backdrop")) return;

    const modalBackdrop = createDOMElement("div", { class: "modal_backdrop" });

    const modalContainer = createDOMElement("div", {
      class: "modal_container",
    });

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

    const modalWrapper = createDOMElement("div", { class: "modal_wrapper" });
    const modalTitle = createDOMElement("p", {
      class: "modal_title",
      textContent: "🏆 당첨 통계 🏆",
    });

    const modalTable = createDOMElement("div", { class: "modal_table" });

    // 당첨 통계 테이블 생성
    const tableData = [
      ["일치 갯수", "당첨금", "당첨 갯수"],
      ["3개", "5,000", "n개"],
      ["4개", "50,000", "n개"],
      ["5개", "1,500,000", "n개"],
      ["5개+보너스볼", "30,000,000", "n개"],
      ["6개", "2,000,000,000", "n개"],
    ];

    tableData.forEach((rowData, index) => {
      modalTable.appendChild(
        createDOMElement("div", { class: "modal_table_divider" })
      );
      const row = createDOMElement("div", { class: "modal_table_row" });

      rowData.forEach((cellText) => {
        const cell = createDOMElement("p", {
          class: "modal_table_cell",
          textContent: cellText,
        });
        row.appendChild(cell);
      });

      modalTable.appendChild(row);

      if (index === tableData.length - 1) {
        modalTable.appendChild(
          createDOMElement("div", { class: "modal_table_divider" })
        );
      }
    });

    const modalProfitText = createDOMElement("p", {
      class: "modal_profit_text",
      textContent: "당신의 총 수익률은 %입니다.",
    });
    const restartButton = createDOMElement("button", {
      class: "restart_button",
      type: "button",
      textContent: "다시 시작하기",
    });

    // 구조 조립
    modalWrapper.appendChild(modalTitle);
    modalWrapper.appendChild(modalTable);
    modalWrapper.appendChild(modalProfitText);
    modalWrapper.appendChild(restartButton);

    modalContainer.appendChild(closeButtonWrapper);
    modalContainer.appendChild(modalWrapper);

    modalBackdrop.appendChild(modalContainer);

    // DOM에 추가
    document.body.appendChild(modalBackdrop);

    // 닫기 이벤트 추가
    closeButton.addEventListener("click", () => {
      modalBackdrop.remove();
    });

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.remove();
      }
    });
  }
}

export default WebController;
