const resultButton = document.getElementById("resultButton");

resultButton.addEventListener("click", () => {
  if (document.querySelector(".modal_backdrop")) return;

  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal_backdrop";
  document.body.appendChild(modalBackdrop);

  modalBackdrop.innerHTML = `
        <div class="modal_container">
        <div class="modal_close_button_wrapper">
            <button class="modal_close_button" id="modalCloseButton">
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

  const closeButton = document.getElementById("modalCloseButton");
  closeButton.addEventListener("click", () => {
    modalBackdrop.remove();
  });

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.remove();
    }
  });

  document.body.appendChild(modalBackdrop);
});
