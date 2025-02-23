import { RANK_INFO_TABLE } from "../constant/rank.js";

class OutputView {
  static printLottoCount(lottoCount) {
    console.log(`${lottoCount}개를 구매했습니다.`);
  }

  static printLotto(lottos) {
    lottos.forEach((lotto) => {
      console.log(`[${lotto.numbers.join(", ")}]`);
    });
  }

  static printResult(prize, profit) {
    console.log("당첨 통계");
    console.log("--------------------");
    prize.forEach((rankLottos, rank) => {
      const info = RANK_INFO_TABLE[rank];
      console.log(
        `${info.message} (${info.price.toLocaleString()}원) - ${
          rankLottos.length
        }개`
      );
    });
    console.log(`총 수익률은 ${profit}%입니다.`);
  }

  static printError(error) {
    console.log(`${error.message}\n`);
  }
}

export default OutputView;
