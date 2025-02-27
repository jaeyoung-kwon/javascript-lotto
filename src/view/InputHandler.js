import readLineAsync from "../util/readLineAsync.js";
import OutputView from "./outputView.js";

export const InputHandler = async ({ inputMessage, parser, validator }) => {
  try {
    const input = await readLineAsync(inputMessage);
    const parsedInput = parser ? parser(input) : input;
    validator(parsedInput);
    return parsedInput;
  } catch (error) {
    OutputView.printError(error);
    return InputHandler({ inputMessage, parser, validator });
  }
};

export const WebInputHandler = ({ elementIds, parser, validator }) => {
  try {
    if (typeof elementIds === "string") {
      const input = document.getElementById(elementIds).value;
      const parsedInput = parser ? parser(input) : input;
      validator(parsedInput);
      return parsedInput;
    }
    if (Array.isArray(elementIds)) {
      const inputs = elementIds.map((id) => document.getElementById(id).value);
      const parsedInputs = inputs.map((input) =>
        parser ? parser(input) : input
      );
      validator(parsedInputs);
      return parsedInputs;
    }
  } catch (error) {
    alert(error.message);
  }
};
