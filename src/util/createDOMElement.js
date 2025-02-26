export const createDOMElement = (tag, props = {}) => {
  if (!tag) throw new Error("Tag is required");

  const element = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === "class") {
      if (typeof value === "string") {
        element.classList.add(value);
      } else {
        value.forEach((className) => {
          element.classList.add(className);
        });
      }
    }

    element[key] = value;
  });

  return element;
};
