var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _winningNumbers, _bonusNumber, _prize, _LottoCalculator_instances, calculateLottoPrize_fn, getRank_fn, _numbers, _generateRandomNumbers, _LottoMachine_instances, getLottoCount_fn, _lottos, _purchaseMoney, _WebController_instances, updateLottoList_fn, calculateResult_fn, modalClose_fn, restart_fn, _InputEventHandler_instances, generateWinningNumberActions_fn, limitInputLength_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const PRIZE = {
  first: 1,
  second: 2,
  third: 3,
  forth: 4,
  fifth: 5
};
const MATCH_TO_RANK_TABLE = {
  "3_noBonus": 5,
  "3_bonus": 5,
  "4_noBonus": 4,
  "4_bonus": 4,
  "5_noBonus": 3,
  "5_bonus": 2,
  "6_noBonus": 1,
  "6_bonus": 1
};
const RANK_INFO_TABLE = {
  1: { price: 2e9, message: "6개" },
  2: { price: 3e7, message: "5개, 보너스 볼" },
  3: { price: 15e5, message: "5개" },
  4: { price: 5e4, message: "4개" },
  5: { price: 5e3, message: "3개" }
};
class LottoCalculator {
  constructor(winningNumbers, bonusNumber) {
    __privateAdd(this, _LottoCalculator_instances);
    __privateAdd(this, _winningNumbers);
    __privateAdd(this, _bonusNumber);
    __privateAdd(this, _prize);
    __privateSet(this, _winningNumbers, winningNumbers);
    __privateSet(this, _bonusNumber, bonusNumber);
    __privateSet(this, _prize, /* @__PURE__ */ new Map([
      [PRIZE.fifth, []],
      [PRIZE.forth, []],
      [PRIZE.third, []],
      [PRIZE.second, []],
      [PRIZE.first, []]
    ]));
  }
  calculateResult(lottos, purchaseMoney) {
    this.calculatePrize(lottos);
    const totalPrice = this.calculateTotalPrice();
    const profit = this.calculateProfit(totalPrice, purchaseMoney);
    return { prize: __privateGet(this, _prize), profit };
  }
  calculatePrize(lottos) {
    lottos.forEach((lotto) => {
      __privateMethod(this, _LottoCalculator_instances, calculateLottoPrize_fn).call(this, lotto);
    });
  }
  calculateTotalPrice() {
    return Array.from(__privateGet(this, _prize).entries()).reduce(
      (sum, [rank, rankLottos]) => {
        const info = RANK_INFO_TABLE[rank];
        return sum + info.price * rankLottos.length;
      },
      0
    );
  }
  calculateProfit(totalPrice, purchaseMoney) {
    return totalPrice / purchaseMoney * 100;
  }
  get prize() {
    return new Map(__privateGet(this, _prize));
  }
}
_winningNumbers = new WeakMap();
_bonusNumber = new WeakMap();
_prize = new WeakMap();
_LottoCalculator_instances = new WeakSet();
calculateLottoPrize_fn = function(lotto) {
  const matchCount = lotto.countNumbersMatch(__privateGet(this, _winningNumbers));
  const isMatchBonus = lotto.isMatch(__privateGet(this, _bonusNumber));
  const rank = __privateMethod(this, _LottoCalculator_instances, getRank_fn).call(this, matchCount, isMatchBonus);
  if (rank) {
    __privateGet(this, _prize).get(rank).push(lotto);
  }
};
getRank_fn = function(matchCount, isMatchBonus) {
  if (matchCount < 3 || matchCount > 6) {
    return null;
  }
  const key = `${matchCount}_${isMatchBonus ? "bonus" : "noBonus"}`;
  return MATCH_TO_RANK_TABLE[key];
};
const LOTTO_RULE = {
  purchaseUnit: 1e3,
  lottoNumber: {
    min: 1,
    max: 45,
    count: 6
  }
};
const sortArrayAscending = (arr) => {
  return [...arr].sort((a, b) => a - b);
};
class Lotto {
  constructor(numbers) {
    __privateAdd(this, _numbers);
    __privateSet(this, _numbers, sortArrayAscending(numbers));
  }
  countNumbersMatch(numbers) {
    return numbers.reduce((acc, number) => acc + this.isMatch(number), 0);
  }
  isMatch(number) {
    return __privateGet(this, _numbers).includes(number);
  }
  get numbers() {
    return __privateGet(this, _numbers);
  }
}
_numbers = new WeakMap();
class LottoMachine {
  constructor() {
    __privateAdd(this, _LottoMachine_instances);
    __privateAdd(this, _generateRandomNumbers, ({ min, max, count }) => {
      const randomNumbers = /* @__PURE__ */ new Set();
      while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.add(randomNumber);
      }
      return Array.from(randomNumbers);
    });
  }
  drawLotto(purchaseMoney) {
    const lottoCount = __privateMethod(this, _LottoMachine_instances, getLottoCount_fn).call(this, purchaseMoney);
    return Array.from({ length: lottoCount }).map(() => {
      const randomNumber = __privateGet(this, _generateRandomNumbers).call(this, LOTTO_RULE.lottoNumber);
      return new Lotto(randomNumber);
    });
  }
}
_generateRandomNumbers = new WeakMap();
_LottoMachine_instances = new WeakSet();
getLottoCount_fn = function(purchaseMoney) {
  return purchaseMoney / LOTTO_RULE.purchaseUnit;
};
class LottoState {
  constructor() {
    __privateAdd(this, _lottos, []);
    __privateAdd(this, _purchaseMoney, 0);
  }
  setLottos(lottos) {
    __privateSet(this, _lottos, lottos);
  }
  addLottos(lottos) {
    __privateSet(this, _lottos, [...__privateGet(this, _lottos), ...lottos]);
  }
  getLottos() {
    return Array.from(__privateGet(this, _lottos));
  }
  setPurchaseMoney(money) {
    __privateSet(this, _purchaseMoney, money);
  }
  addPurchaseMoney(money) {
    __privateSet(this, _purchaseMoney, __privateGet(this, _purchaseMoney) + money);
  }
  getPurchaseMoney() {
    return __privateGet(this, _purchaseMoney);
  }
  reset() {
    __privateSet(this, _lottos, []);
    __privateSet(this, _purchaseMoney, 0);
  }
}
_lottos = new WeakMap();
_purchaseMoney = new WeakMap();
const LottoState$1 = new LottoState();
const ERROR_MESSAGE = {
  purchaseMoney: {
    notNumber: "구입 금액은 숫자로 입력해야 합니다.",
    notInteger: "구입 금액은 정수로 입력해야 합니다.",
    notPositive: "구입 금액은 양수로 입력해야 합니다.",
    notMultipleOfPurchaseUnit: `구입 금액은 ${LOTTO_RULE.purchaseUnit}원 단위로 입력해야 합니다.`
  },
  winningNumbers: {
    notNumber: "당첨번호는 숫자로 입력해야 합니다.",
    notInteger: "당첨번호는 정수로 입력해야 합니다.",
    notUnique: "당첨번호는 중복없이 입력해야 합니다.",
    notInRange: `당첨번호는 ${LOTTO_RULE.lottoNumber.min} ~ ${LOTTO_RULE.lottoNumber.max} 사이의 숫자로 입력해야 합니다.`,
    notLottoNumberCount: `당첨번호는 ${LOTTO_RULE.lottoNumber.count}개를 입력해야 합니다.`
  },
  bonusNumber: {
    notNumber: "보너스번호는 숫자로 입력해야 합니다.",
    notInteger: "보너스번호는 정수로 입력해야 합니다.",
    notInRange: `보너스번호는 ${LOTTO_RULE.lottoNumber.min} ~ ${LOTTO_RULE.lottoNumber.max} 사이의 숫자로 입력해야 합니다.`,
    duplicateWithWinningNumber: "보너스번호는 당첨번호와 중복없이 입력해야 합니다."
  },
  restartRequest: {
    notYorN: "재시작 여부는 y or n으로 입력해야 합니다."
  }
};
const isInRange = (value, min, max) => value >= min && value <= max;
const isLessThanMin = (value, min) => value < min;
const isDuplicated = (arr) => new Set(arr).size !== arr.length;
const isNumber = (number) => !Number.isNaN(number);
const isInteger = (number) => Number.isInteger(number);
const isMultipleOfUnit = (number, unit) => number % unit === 0;
const isValidArrayLength = (arr, value) => arr.length === value;
const isIncludesInArray = (arr, value) => arr.includes(value);
const isOneOf = (value, candidates) => candidates.includes(value);
const throwCustomError = (errorMessage) => {
  throw new Error(`[ERROR] ${errorMessage}`);
};
const createValidator = (rules, value) => {
  rules.forEach(([validateFunction, errorMessage]) => {
    if (!validateFunction(value)) {
      throwCustomError(errorMessage);
    }
  });
};
const ERROR_TYPE = {
  purchaseMoney: "purchaseMoney",
  winningNumbers: "winningNumbers",
  bonusNumber: "bonusNumber"
};
const Validator = {
  validatePurchaseMoney(purchaseMoney) {
    this.validateNumber(purchaseMoney, ERROR_TYPE.purchaseMoney);
    if (isLessThanMin(purchaseMoney, 1))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notPositive);
    if (!isMultipleOfUnit(purchaseMoney, LOTTO_RULE.purchaseUnit))
      throwCustomError(ERROR_MESSAGE.purchaseMoney.notMultipleOfPurchaseUnit);
  },
  validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumber) => {
      this.validateNumber(winningNumber, ERROR_TYPE.winningNumbers);
      this.validateLottoNumberRange(winningNumber, ERROR_TYPE.winningNumbers);
    });
    if (isDuplicated(winningNumbers)) {
      throwCustomError(ERROR_MESSAGE.winningNumbers.notUnique);
    }
    if (!isValidArrayLength(winningNumbers, LOTTO_RULE.lottoNumber.count))
      throwCustomError(ERROR_MESSAGE.winningNumbers.notLottoNumberCount);
  },
  validateBonusNumber(winningNumbers, bonusNumber) {
    this.validateNumber(bonusNumber, ERROR_TYPE.bonusNumber);
    this.validateLottoNumberRange(bonusNumber, ERROR_TYPE.bonusNumber);
    if (isIncludesInArray(winningNumbers, bonusNumber))
      throwCustomError(ERROR_MESSAGE.bonusNumber.duplicateWithWinningNumber);
  },
  validateNumber(number, type) {
    createValidator(
      [
        [isNumber, ERROR_MESSAGE[type].notNumber],
        [isInteger, ERROR_MESSAGE[type].notInteger]
      ],
      number
    );
  },
  validateLottoNumberRange(lottoNumber, type) {
    createValidator(
      [
        [
          (num) => isInRange(
            num,
            LOTTO_RULE.lottoNumber.min,
            LOTTO_RULE.lottoNumber.max
          ),
          ERROR_MESSAGE[type].notInRange
        ]
      ],
      lottoNumber
    );
  },
  validateRestartRequest(input) {
    if (!isOneOf(input, ["y", "n", "Y", "N"]))
      throwCustomError(ERROR_MESSAGE.restartRequest.notYorN);
  }
};
const WebInputHandler = ({ elementIds, parser, validator }) => {
  if (typeof elementIds === "string") {
    const input = document.getElementById(elementIds).value;
    const parsedInput = parser ? parser(input) : input;
    validator(parsedInput);
    return parsedInput;
  }
  if (Array.isArray(elementIds)) {
    const inputs = elementIds.map((id) => document.getElementById(id).value);
    const parsedInputs = inputs.map(
      (input) => parser ? parser(input) : input
    );
    validator(parsedInputs);
    return parsedInputs;
  }
};
const WebInput = {
  getPurchaseMoney() {
    return WebInputHandler({
      elementIds: "purchaseInput",
      parser: Number,
      validator: (input) => Validator.validatePurchaseMoney(input)
    });
  },
  getWinningNumbers() {
    return WebInputHandler({
      elementIds: Array.from({ length: LOTTO_RULE.lottoNumber.count }).map(
        (_, index) => `winningNumberInput${index}`
      ),
      parser: Number,
      validator: (input) => Validator.validateWinningNumbers(input)
    });
  },
  getBonusNumber(winningNumbers) {
    return WebInputHandler({
      elementIds: "bonusNumberInput",
      parser: Number,
      validator: (bonusNumber) => Validator.validateBonusNumber(winningNumbers, bonusNumber)
    });
  }
};
const createDOMElement = ({ tag, children, ...props }) => {
  if (!tag) throw new Error("Tag is required");
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "class") {
      if (Array.isArray(value)) {
        value.forEach((className) => {
          element.classList.add(className);
        });
      } else {
        element.classList.add(value);
      }
    }
    element[key] = value;
  });
  if (children) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }
  return element;
};
const createLottoLength = () => {
  const lottoLength = LottoState$1.getLottos().length;
  return createDOMElement({
    tag: "h3",
    class: "body_text",
    textContent: `총 ${lottoLength}개를 구매하였습니다.`
  });
};
const createLottoListElement = (lotto) => {
  return createDOMElement({
    tag: "div",
    class: "lotto_row",
    children: [
      createDOMElement({
        tag: "div",
        class: "lotto_icon",
        textContent: "🎟️"
      }),
      createDOMElement({
        tag: "p",
        class: "body_text",
        textContent: lotto.numbers.join(", ")
      })
    ]
  });
};
const createLottoList = () => {
  const lottos = LottoState$1.getLottos();
  return createDOMElement({
    tag: "div",
    class: "lotto_list",
    children: lottos.map((lotto) => createLottoListElement(lotto))
  });
};
const createBodyTitle = () => {
  return createDOMElement({
    tag: "h2",
    class: "body_title",
    textContent: "🎱 내 번호 당첨 확인 🎱"
  });
};
const createPurchaseWrapper = () => {
  const purchaseWrapper = createDOMElement({
    tag: "div",
    class: "purchase_wrapper",
    children: [
      createDOMElement({
        tag: "form",
        class: "purchase_input_wrapper",
        children: [
          createDOMElement({
            tag: "input",
            id: "purchaseInput",
            class: "purchase_input",
            type: "number",
            placeholder: "구입"
          }),
          createDOMElement({
            tag: "button",
            type: "submit",
            tabindex: "-1",
            id: "purchaseButton",
            class: "purchase_button",
            textContent: "구입"
          })
        ]
      })
    ]
  });
  return purchaseWrapper;
};
const createCloseButton = () => {
  return createDOMElement({
    tag: "div",
    class: "modal_close_button_wrapper",
    children: [
      createDOMElement({
        tag: "button",
        id: "modalCloseButton",
        class: "modal_close_button",
        type: "button",
        children: [
          createDOMElement({
            tag: "img",
            src: "icon/close.svg",
            alt: "Close"
          })
        ]
      })
    ]
  });
};
const createBodyTable = (prize) => {
  const tableData = [["일치 갯수", "당첨금", "당첨 갯수"]];
  prize.forEach((rankLottos, rank) => {
    const info = RANK_INFO_TABLE[rank];
    tableData.push([
      info.message,
      info.price.toLocaleString(),
      `${rankLottos.length}개`
    ]);
  });
  return createDOMElement({
    tag: "div",
    class: "modal_table",
    children: [
      ...tableData.map((rowData) => [
        createDOMElement({ tag: "div", class: "modal_table_divider" }),
        createDOMElement({
          tag: "div",
          class: "modal_table_row",
          children: rowData.map(
            (cellText) => createDOMElement({
              tag: "p",
              class: "modal_table_cell",
              textContent: cellText
            })
          )
        })
      ]).flat(),
      createDOMElement({ tag: "div", class: "modal_table_divider" })
    ]
  });
};
const createModalBody = (result) => {
  return createDOMElement({
    tag: "div",
    class: "modal_wrapper",
    children: [
      createDOMElement({
        tag: "h2",
        class: "modal_title",
        textContent: "🏆 당첨 통계 🏆"
      }),
      createBodyTable(result.prize),
      createDOMElement({
        tag: "p",
        class: "modal_profit_text",
        textContent: `당신의 총 수익률은 ${result.profit.toFixed(2)}%입니다.`
      }),
      createDOMElement({
        tag: "button",
        class: "modal_restart_button",
        id: "modalRestartButton",
        type: "button",
        textContent: "다시 시작하기"
      })
    ]
  });
};
const createResultButton = () => {
  return createDOMElement({
    tag: "div",
    class: "result_button_wrapper",
    children: [
      createDOMElement({
        tag: "button",
        class: "result_button",
        id: "resultButton",
        type: "submit",
        textContent: "결과 확인하기"
      })
    ]
  });
};
const createBonusNumberInput = () => {
  return createDOMElement({
    tag: "div",
    class: "number_input_box",
    children: [
      createDOMElement({
        tag: "label",
        class: "body_text",
        textContent: "보너스 번호"
      }),
      createDOMElement({
        tag: "div",
        class: "number_input_wrapper",
        children: [
          createDOMElement({
            tag: "input",
            id: "bonusNumberInput",
            class: "number_input",
            type: "number"
          })
        ]
      })
    ]
  });
};
const createWinningNumberInput = () => {
  return createDOMElement({
    tag: "div",
    class: "number_input_box",
    children: [
      createDOMElement({
        tag: "label",
        class: "body_text",
        textContent: "당첨 번호"
      }),
      createDOMElement({
        tag: "div",
        class: "number_input_wrapper",
        children: Array.from({ length: LOTTO_RULE.lottoNumber.count }).map(
          (_, index) => createDOMElement({
            tag: "input",
            id: `winningNumberInput${index}`,
            class: "number_input",
            type: "number"
          })
        )
      })
    ]
  });
};
const createInputForm = () => {
  return createDOMElement({
    tag: "form",
    class: "number_input_form",
    children: [
      createDOMElement({
        tag: "h3",
        class: "body_text",
        textContent: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요."
      }),
      createDOMElement({
        tag: "div",
        class: "number_input_container",
        children: [createWinningNumberInput(), createBonusNumberInput()]
      }),
      createResultButton()
    ]
  });
};
const WebOutput = {
  renderBodyWrapper() {
    const bodyWrapper = createDOMElement({
      tag: "div",
      class: "body_wrapper",
      children: [createBodyTitle(), createPurchaseWrapper()]
    });
    const main = document.querySelector(".body_container");
    main.appendChild(bodyWrapper);
  },
  renderLottoList() {
    const lottoListWrapper = createDOMElement({
      tag: "div",
      class: "lotto_list_wrapper",
      children: [createLottoLength(), createLottoList(), createInputForm()]
    });
    const bodyWrapper = document.querySelector(".body_wrapper");
    bodyWrapper.appendChild(lottoListWrapper);
  },
  renderResultModal(result) {
    if (document.querySelector(".modal_backdrop")) return;
    const modalBackdrop = createDOMElement({
      tag: "div",
      class: "modal_backdrop",
      id: "modalBackdrop",
      children: [
        createDOMElement({
          tag: "div",
          class: "modal_container",
          children: [createCloseButton(), createModalBody(result)]
        })
      ]
    });
    document.body.appendChild(modalBackdrop);
  },
  disableButtons() {
    const purchaseButton = document.getElementById("purchaseButton");
    purchaseButton.disabled = true;
    const resultButton = document.getElementById("resultButton");
    resultButton.disabled = true;
  },
  appendLottoList(lottos) {
    const lottoListWrapper = document.querySelector(".lotto_list_wrapper");
    const lottoList = lottoListWrapper.querySelector(".lotto_list");
    lottos.forEach((lotto) => {
      const lottoElement = createLottoListElement(lotto);
      lottoList.appendChild(lottoElement);
    });
    const lottoLength = lottoListWrapper.querySelector(".body_text");
    lottoLength.textContent = `총 ${LottoState$1.getLottos().length}개를 구매하였습니다.`;
  },
  resetMain() {
    const bodyContainer = document.querySelector(".body_container");
    while (bodyContainer.firstChild) {
      bodyContainer.removeChild(bodyContainer.firstChild);
    }
  }
};
class WebController {
  constructor() {
    __privateAdd(this, _WebController_instances);
  }
  init() {
    WebOutput.renderBodyWrapper();
  }
  handlePurchase(event) {
    try {
      event.preventDefault();
      const purchaseMoney = WebInput.getPurchaseMoney();
      const lottoMachine = new LottoMachine();
      const lottos = lottoMachine.drawLotto(purchaseMoney);
      __privateMethod(this, _WebController_instances, updateLottoList_fn).call(this, lottos, purchaseMoney);
    } catch (error) {
      alert(error.message);
    }
  }
  handleResult(event) {
    try {
      event.preventDefault();
      const result = __privateMethod(this, _WebController_instances, calculateResult_fn).call(this);
      WebOutput.renderResultModal(result);
      WebOutput.disableButtons();
    } catch (error) {
      alert(error.message);
    }
  }
  handleRestart() {
    __privateMethod(this, _WebController_instances, modalClose_fn).call(this);
    __privateMethod(this, _WebController_instances, restart_fn).call(this);
  }
  handleCloseModal() {
    __privateMethod(this, _WebController_instances, modalClose_fn).call(this);
  }
}
_WebController_instances = new WeakSet();
updateLottoList_fn = function(lottos, purchaseMoney) {
  const lottoList = document.querySelector(".lotto_list");
  if (lottoList) {
    LottoState$1.addLottos(lottos);
    LottoState$1.addPurchaseMoney(purchaseMoney);
    WebOutput.appendLottoList(lottos);
  } else {
    LottoState$1.setLottos(lottos);
    LottoState$1.setPurchaseMoney(purchaseMoney);
    WebOutput.renderLottoList();
  }
};
calculateResult_fn = function() {
  const winningNumbers = WebInput.getWinningNumbers();
  const bonusNumber = WebInput.getBonusNumber(winningNumbers);
  const lottos = LottoState$1.getLottos();
  const purchaseMoney = LottoState$1.getPurchaseMoney();
  const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
  const result = lottoCalculator.calculateResult(lottos, purchaseMoney);
  return result;
};
modalClose_fn = function() {
  const modalBackdrop = document.querySelector(".modal_backdrop");
  modalBackdrop.remove();
};
restart_fn = function() {
  WebOutput.resetMain();
  this.init();
};
class EventDelegation {
  constructor({ rootElement, actions, eventType }) {
    this.rootElement = rootElement;
    this.actions = actions;
    this.rootElement.addEventListener(
      eventType,
      (event) => this.handleEvent(event)
    );
  }
  handleEvent(event) {
    const targetElement = event.target.closest("[id]");
    if (targetElement && this.actions[targetElement.id]) {
      this.actions[targetElement.id](event);
    }
  }
}
class ClickEventHandler {
  constructor(controller2) {
    this.controller = controller2;
    new EventDelegation({
      rootElement: document.body,
      actions: {
        purchaseButton: this.controller.handlePurchase.bind(this.controller),
        resultButton: this.controller.handleResult.bind(this.controller),
        modalRestartButton: this.controller.handleRestart.bind(this.controller),
        modalCloseButton: this.controller.handleCloseModal.bind(
          this.controller
        ),
        modalBackdrop: this.controller.handleCloseModal.bind(this.controller)
      },
      eventType: "click"
    });
  }
}
class InputEventHandler {
  constructor() {
    __privateAdd(this, _InputEventHandler_instances);
    __publicField(this, "NUMBER_MAX_LENGTH", 2);
    new EventDelegation({
      rootElement: document.body,
      actions: {
        ...__privateMethod(this, _InputEventHandler_instances, generateWinningNumberActions_fn).call(this),
        bonusNumberInput: __privateMethod(this, _InputEventHandler_instances, limitInputLength_fn).bind(this)
      },
      eventType: "input"
    });
  }
}
_InputEventHandler_instances = new WeakSet();
generateWinningNumberActions_fn = function() {
  return Array.from(
    { length: 6 },
    (_, index) => `winningNumberInput${index}`
  ).reduce((actions, id) => {
    actions[id] = __privateMethod(this, _InputEventHandler_instances, limitInputLength_fn).bind(this);
    return actions;
  }, {});
};
limitInputLength_fn = function(event) {
  if (event.target.value.length > this.NUMBER_MAX_LENGTH) {
    event.target.value = event.target.value.slice(0, this.NUMBER_MAX_LENGTH);
  }
};
const controller = new WebController();
new ClickEventHandler(controller);
new InputEventHandler();
controller.init();
