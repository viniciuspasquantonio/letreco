const tileContainer = document.querySelector(".tile-container");
const firstRowContainer = document.querySelector("#first-row-container");
const secondRowContainer = document.querySelector("#second-row-container");
const thirdRowContainer = document.querySelector("#third-row-container");

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const hiddenWord = "VASCO";
const columns = 5;
const rows = 6;
let currentRow = 0;
let currentColumn = 0;
let guesses = [];

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(columns);
  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "row");
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const columnRow = document.createElement("div");
    columnRow.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    columnRow.setAttribute(
      "class",
      rowIndex === 0 ? "column typing" : "column disabled"
    );
    tileRow.append(columnRow);
    guesses[rowIndex][columnIndex] = "";
  }

  tileContainer.append(tileRow);
}

keysFirstRow.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleKeyOnClick(key));
  buttonElement.textContent = key;
  firstRowContainer.append(buttonElement);
});

keysSecondRow.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleKeyOnClick(key));
  buttonElement.textContent = key;
  secondRowContainer.append(buttonElement);
});

keysThirdRow.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleKeyOnClick(key));
  buttonElement.textContent = key;
  thirdRowContainer.append(buttonElement);
});
document.onkeydown = function (evt) {
  evt = evt || window.evt;
  if (evt.key === "Enter") {
    checkGuess();
  } else if ((evt.key = "Backspace")) {
    handleBackSpace();
  } else {
    handleKeyOnClick(evt.key.toUpperCase());
  }
};

const handleBackSpace = () => {
  if (currentColumn === 0) {
    return;
  }

  currentColumn--;
  guesses[currentRow][currentColumn] = "";
  const tile = getCurrentColumnEl();
  tile.textContent = "";
};

const getCurrentColumnEl = () => {
  return document.querySelector("#row" + currentRow + "column" + currentColumn);
};

const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess === hiddenWord) {
    window.alert("Simplesmente, o detetivão do entreterimento!!");
    return;
  } else {
    if (currentRow === rows - 1) {
      window.alert("Meteu essa?");
      return;
    } else {
      var currentColumns = document.querySelectorAll(".typing");
      for (let index = 0; index < currentColumns.length; index++) {
        currentColumns[index].removeAttribute("class");
        currentColumns[index].setAttribute("class", "column disabled");
      }
      currentRow++;
      currentColumn = 0;

      const currentRowEl = document.querySelector("#row" + currentRow);
      var currentColumns = currentRowEl.querySelectorAll(".column");
      for (let index = 0; index < currentColumns.length; index++) {
          currentColumns[index].removeAttribute("class");
        currentColumns[index].setAttribute("class", "column typing");
      }
    }
  }
};

const handleKeyOnClick = (key) => {
  if (currentRow > rows || currentRow > columns) {
    window.alert("Game over!!!");
    return;
  } else if (currentColumn === columns) {
    window.alert("Arrisca ai");
    return;
  }
  const currentColumnEl = getCurrentColumnEl();
  currentColumnEl.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;
};
