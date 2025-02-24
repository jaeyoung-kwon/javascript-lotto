import { ERROR_MESSAGE } from "../constant/message.js";
import { LOTTO_RULE } from "../constant/rule.js";
import {
  isDuplicated,
  isIncludesInArray,
  isInRange,
  isInteger,
  isLessThanMin,
  isMultipleOfUnit,
  isNumber,
  isOneOf,
  isValidArrayLength,
} from "../util/validations.js";
import { throwCustomError } from "../util/throwCustomError.js";

const Validator = {
  validatePurchaseMoney(purchaseMoney) {
    if (!isNumber(purchaseMoney))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notNumber);
    if (!isInteger(purchaseMoney))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notInteger);
    if (isLessThanMin(purchaseMoney, 1))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notPositive);
    if (!isMultipleOfUnit(purchaseMoney, LOTTO_RULE.purchaseUnit))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notMultipleOfPurchaseUnit);
  },

  validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumber) => {
      if (!isNumber(winningNumber))
        throwCustomError(ERROR_MESSAGE.winningNumbers.notNumber);
      if (!isInteger(winningNumber))
        throwCustomError(ERROR_MESSAGE.winningNumbers.notInteger);
      if (
        !isInRange(
          winningNumber,
          LOTTO_RULE.lottoNumber.min,
          LOTTO_RULE.lottoNumber.max
        )
      )
        throwCustomError(ERROR_MESSAGE.winningNumbers.notInRange);
    });

    if (isDuplicated(winningNumbers)) {
      throwCustomError(ERROR_MESSAGE.winningNumbers.notUnique);
    }

    if (!isValidArrayLength(winningNumbers, LOTTO_RULE.lottoNumber.count))
      throwCustomError(ERROR_MESSAGE.winningNumbers.notLottoNumberCount);
  },

  validateBonusNumber(winningNumbers, bonusNumber) {
    if (!isNumber(bonusNumber))
      throwCustomError(ERROR_MESSAGE.bonusNumber.notNumber);

    if (!isInteger(bonusNumber))
      throwCustomError(ERROR_MESSAGE.bonusNumber.notInteger);

    if (
      !isInRange(
        bonusNumber,
        LOTTO_RULE.lottoNumber.min,
        LOTTO_RULE.lottoNumber.max
      )
    )
      throwCustomError(ERROR_MESSAGE.bonusNumber.notInRange);
    if (isIncludesInArray(winningNumbers, bonusNumber))
      throwCustomError(ERROR_MESSAGE.bonusNumber.duplicateWithWinningNumber);
  },

  validateRestartRequest(input) {
    if (!isOneOf(input, ["y", "n", "Y", "N"]))
      throwCustomError(ERROR_MESSAGE.restartRequest.notYorN);
  },
};

export default Validator;
