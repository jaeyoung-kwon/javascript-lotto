import LottoMachine from "./domain/lottoMachine.js";
import { createDOMElement } from "./util/createDOMElement.js";

const purchaseButton = document.getElementById("purchaseButton");

purchaseButton.addEventListener("click", () => {
  const input = document.getElementById("purchaseInput").value;
  const purchaseMoney = Number(input);

  console.log(purchaseMoney);

  const lottoMachine = new LottoMachine();
  const lottos = lottoMachine.drawLotto(purchaseMoney);

  const lottoListWrapper = document.createElement("div");
  lottoListWrapper.className = "lotto_list_wrapper";

  lottoListWrapper.innerHTML = `
  <p class="body_text">총 ${lottos.length}개를 구매하였습니다.</p>
  <div class="lotto_list">
              ${lottos
                .map((lotto) => {
                  return `<div class="lotto_row">
                  <div class="lotto_icon">🎟️</div>
                  <p class="body_text">${lotto.numbers.join(", ")}</p>
                  </div>`;
                })
                .join("")}
            </div>
            <div class="number_input_form">
              <p class="body_text">
              지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
              </p>
              <div class="number_input_container">
                <div class="number_input_box">
                <p class="body_text">당첨 번호</p>
                  <div class="number_input_wrapper">
                    <input class="number_input" />
                    <input class="number_input" />
                    <input class="number_input" />
                    <input class="number_input" />
                    <input class="number_input" />
                    <input class="number_input" />
                  </div>
                  </div>
                <div class="number_input_box">
                  <p class="body_text">보너스 번호</p>
                  <div class="number_input_wrapper">
                  <input class="number_input" />
                  </div>
                </div>
                </div>
              <div class="result_button_wrapper">
                <button type="button" id="resultButton" class="result_button">
                결과 확인하기
                </button>
                </div>
                </div>
                `;

  const bodyWrapper = document.querySelector(".body_wrapper");

  bodyWrapper.appendChild(lottoListWrapper);

  const resultButton = document.getElementById("resultButton");
  resultButton.addEventListener("click", showModal);
});

const showModal = () => {
  if (document.querySelector(".modal_backdrop")) return;

  const modalBackdrop = createDOMElement("div", { class: "modal_backdrop" });

  const modalContainer = createDOMElement("div", { class: "modal_container" });

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
};
