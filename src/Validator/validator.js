const Validator = {
  validatePurchaseMoney(purchaseMoneyInput) {
    if (purchaseMoneyInput === "")
      throw new Error("[ERROR] 구입 금액을 입력해주세요.");

    const purchaseMoney = Number(purchaseMoneyInput);

    if (Number.isNaN(purchaseMoney))
      throw new Error("[ERROR] 구입 금액은 숫자로 입력해야 합니다.");

    if (!Number.isInteger(purchaseMoney))
      throw new Error("[ERROR] 구입 금액은 정수로 입력해야 합니다.");

    if (purchaseMoney <= 0)
      throw new Error("[ERROR] 구입 금액은 양수로 입력해야 합니다.");

    if (purchaseMoney % 1000 !== 0)
      throw new Error("[ERROR] 구입 금액은 1000원 단위로 입력해야 합니다.");
  },

  validateWinningNumbers(winningNumbersInput) {
    winningNumbersInput.forEach((winningNumberString) => {
      if (winningNumberString === "")
        throw new Error("[ERROR] 당첨번호는 공백 없이 입력해야 합니다.");

      const winningNumber = Number(winningNumberString);

      if (Number.isNaN(winningNumber))
        throw new Error("[ERROR] 당첨번호는 숫자로 입력해야 합니다.");

      if (!Number.isInteger(winningNumber))
        throw new Error("[ERROR] 당첨번호는 정수로 입력해야 합니다.");

      if (winningNumber < 1 || winningNumber > 45)
        throw new Error(
          "[ERROR] 당첨번호는 1 ~ 45 사이의 숫자로 입력해야 합니다.",
        );
    });

    if (winningNumbersInput.length !== 6)
      throw new Error("[ERROR] 당첨번호는 6개를 입력해야 합니다.");
  },

  validateBonusNumber(bonusNumberInput) {
    const bonusNumber = Number(bonusNumberInput);

    if (Number.isNaN(bonusNumber))
      throw new Error("[ERROR] 보너스번호는 숫자로 입력해야 합니다.");

    if (!Number.isInteger(bonusNumber))
      throw new Error("[ERROR] 보너스번호는 정수로 입력해야 합니다.");
  },
};

export default Validator;
