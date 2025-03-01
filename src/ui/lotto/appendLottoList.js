import LottoState from "../../state/LottoState.js";
import { createLottoListElement } from "./createLottoListElement.js";

export const appendLottoList = (lottos) => {
  const lottoListWrapper = document.querySelector(".lotto_list_wrapper");

  const lottoList = lottoListWrapper.querySelector(".lotto_list");

  lottos.forEach((lotto) => {
    const lottoElement = createLottoListElement(lotto);
    lottoList.appendChild(lottoElement);
  });

  const lottoLength = lottoListWrapper.querySelector(".body_text");
  lottoLength.textContent = `총 ${
    LottoState.getLottos().length
  }개를 구매하였습니다.`;
};
