import { RANK_INFO_TABLE } from "../../constant/rank.js";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createBodyTable = (prize) => {
  const modalTable = createDOMElement("div", { class: "modal_table" });

  const tableData = [["일치 갯수", "당첨금", "당첨 갯수"]];

  prize.forEach((rankLottos, rank) => {
    const info = RANK_INFO_TABLE[rank];
    tableData.push([
      info.message,
      info.price.toLocaleString(),
      `${rankLottos.length}개`,
    ]);
  });

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

  return modalTable;
};
