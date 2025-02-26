import LottoMachine from "./domain/lottoMachine.js";

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

  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal_backdrop";

  modalBackdrop.innerHTML = `
        <div class="modal_container">
        <div class="modal_close_button_wrapper">
            <button type="button" class="modal_close_button" id="modalCloseButton">
              <img src="/icon/close.svg" alt="Close" />
            </button>
          </div>
          <div class="modal_wrapper">
          <p class="modal_title">🏆 당첨 통계 🏆</p>
          <div class="modal_table">
          <div class="modal_table_divider"></div>
          <div class="modal_table_row">
          <p class="modal_table_cell">일치 갯수</p>
                <p class="modal_table_cell">당첨금</p>
                <p class="modal_table_cell">당첨 갯수</p>
              </div>
              <div class="modal_table_divider"></div>
              <div class="modal_table_row">
                <p class="modal_table_cell">3개</p>
                <p class="modal_table_cell">5,000</p>
                <p class="modal_table_cell">n개</p>
                </div>
              <div class="modal_table_divider"></div>
              <div class="modal_table_row">
                <p class="modal_table_cell">4개</p>
                <p class="modal_table_cell">50,000</p>
                <p class="modal_table_cell">n개</p>
                </div>
                <div class="modal_table_divider"></div>
                <div class="modal_table_row">
                <p class="modal_table_cell">5개</p>
                <p class="modal_table_cell">1,500,000</p>
                <p class="modal_table_cell">n개</p>
              </div>
              <div class="modal_table_divider"></div>
              <div class="modal_table_row">
              <p class="modal_table_cell">5개+보너스볼</p>
              <p class="modal_table_cell">30,000,000</p>
              <p class="modal_table_cell">n개</p>
              </div>
              <div class="modal_table_divider"></div>
              <div class="modal_table_row">
                <p class="modal_table_cell">6개</p>
                <p class="modal_table_cell">2,000,000,000</p>
                <p class="modal_table_cell">n개</p>
              </div>
            </div>
            <p class="modal_profit_text">당신의 총 수익률은 %입니다.</p>
            <button class="restart_button">다시 시작하기</button>
            </div>
            </div>
    `;

  document.body.appendChild(modalBackdrop);

  const closeButton = document.getElementById("modalCloseButton");
  closeButton.addEventListener("click", () => {
    modalBackdrop.remove();
  });

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.remove();
    }
  });
};
