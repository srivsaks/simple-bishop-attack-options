import "./styles.css";

const x = 8;
const y = 8;
const total = x * y;

const app = document.querySelector("#app");
let hovered = null;
function createBlock(ele, color, child) {
  // ele.style.backgroundColor = `${color}`;
  ele.classList.add("block");
  ele.classList.add(color);
  const parent = app.children[child];
  parent.append(ele);
}

for (let i = 0; i < x; i++) {
  const div = document.createElement("div");
  div.classList.add("chess-row");
  div.style.display = "flex";
  app.append(div);
  for (let j = 0; j < y; j++) {
    const ele = document.createElement("div");
    ele.dataset.dimension = `x:${i} y:${j}`;
    createBlock(ele, (i + j) % 2 === 0 ? "black" : "white", i);
  }
}

function isValid(xPoint, yPoint) {
  console.log(xPoint, yPoint);
  if (xPoint >= 0 && xPoint <= x - 1 && yPoint >= 0 && yPoint <= y - 1)
    return true;
  return false;
}

function highlightDiagonal(row, col) {
  //if (row <= 0 || row >= x || col <= 0 || col >= y) return;
  //console.log(col);

  console.log(row, col);
  let i = row;
  let j = col;
  while (i > 0 && j > 0) {
    const ele = app.children[i - 1].children[j - 1];
    ele.classList.add("highlight");
    i--;
    j--;
  }
  i = row;
  j = col;
  while (i < x - 1 && j > 0) {
    const ele = app.children[i + 1].children[j - 1];
    ele.classList.add("highlight");
    j--;
    i++;
  }
  i = row;
  j = col;
  while (i > 0 && j < y - 1) {
    const ele = app.children[i - 1].children[j + 1];
    ele.classList.add("highlight");
    i--;
    j++;
  }
  i = row;
  j = col;
  while (i < x - 1 && j < y - 1) {
    const ele = app.children[i + 1].children[j + 1];
    ele.classList.add("highlight");
    i++;
    j++;
  }
  /*if (isValid(row - 1, col - 1) && !visited[row - 1][col - 1]) {
    const ele = app.children[row - 1].children[col - 1];
    ele.classList.add("highlight");
    visited[row - 1][col - 1] = 1;
    highlightDiagonal(row - 1, col - 1, visited);
  }
  if (isValid(row - 1, col + 1) && !visited[row - 1][col + 1]) {
    const ele = app.children[row - 1].children[col + 1];
    ele.classList.add("highlight");
    visited[row - 1][col + 1] = 1;
    highlightDiagonal(row - 1, col + 1, visited);
  }
  if (isValid(row + 1, col - 1) && !visited[row + 1][col - 1]) {
    const ele = app.children[row + 1].children[col - 1];
    ele.classList.add("highlight");
    visited[row + 1][col - 1] = 1;
    highlightDiagonal(row + 1, col - 1, visited);
  }
  if (isValid(row + 1, col + 1) && !visited[row + 1][col + 1]) {
    const ele = app.children[row + 1].children[col + 1];
    ele.classList.add("highlight");
    visited[row + 1][col + 1] = 1;
    highlightDiagonal(row + 1, col + 1, visited);
  }*/

  //console.log(app.childNodes[2],app.childNodes[0]);

  //console.log(app.children[yrow], app.children[xrow]);
}
app.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("block")) {
    console.log(e);
    if (hovered !== null && hovered !== e.target) {
      const children = app.children;
      Array.from(children).forEach((child) => {
        Array.from(child.children).forEach((inner) => {
          if (inner.classList.contains("highlight"))
            inner.classList.remove("highlight");
        });
      });
    }
    hovered = e.target;

    const dimensions = e.target.dataset.dimension.split(" ");
    const xDim = dimensions[0].split(":")[1];
    const yDim = dimensions[1].split(":")[1];

    //e.target.style.backgroundColor = "midnightblue";

    highlightDiagonal(parseInt(xDim), parseInt(yDim));
  } else {
  }
});
app.addEventListener("mouseout", (e) => {
  if (hovered) {
    const children = app.children;
    Array.from(children).forEach((child) => {
      Array.from(child.children).forEach((inner) => {
        if (inner.classList.contains("highlight"))
          inner.classList.remove("highlight");
      });
    });
  }
});
//app.style.gridTemplateColumns = `repeat(${y}, 1fr)`;
