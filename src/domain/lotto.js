import { sortArrayAscending } from "../util/sorting";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = sortArrayAscending(numbers);
  }

  countNumbersMatch(numbers) {
    return numbers.reduce((acc, number) => acc + this.isMatch(number), 0);
  }

  isMatch(number) {
    return this.#numbers.includes(number);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
