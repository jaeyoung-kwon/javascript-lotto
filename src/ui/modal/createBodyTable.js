import { RANK_INFO_TABLE } from "../../constant/rank.js";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createBodyTable = (prize) => {
  const tableData = [["일치 갯수", "당첨금", "당첨 갯수"]];

  prize.forEach((rankLottos, rank) => {
    const info = RANK_INFO_TABLE[rank];
    tableData.push([
      info.message,
      info.price.toLocaleString(),
      `${rankLottos.length}개`,
    ]);
  });

  return createDOMElement("div", { class: "modal_table" }, [
    ...tableData
      .map((rowData) => [
        createDOMElement("div", { class: "modal_table_divider" }),
        createDOMElement(
          "div",
          { class: "modal_table_row" },
          rowData.map((cellText) =>
            createDOMElement("p", {
              class: "modal_table_cell",
              textContent: cellText,
            })
          )
        ),
      ])
      .flat(),
    createDOMElement("div", { class: "modal_table_divider" }),
  ]);
};
