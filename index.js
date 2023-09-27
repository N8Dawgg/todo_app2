const createPanel = () => {
  let container = document.createElement("div");
  container.classList.add("panel_container");
  container.addEventListener("mousedown", startDragging);
  // container.addEventListener("mouseup", endDragging);

  let offsetX = 0;
  let offsetY = 0;
  let posX = 0;
  let posY = 0;

  function updatePosition(x, y) {
    thisObject.posX = x;
    thisObject.posY = y;
    thisObject.container.style.left = thisObject.posX.toString() + "px";
    thisObject.container.style.top = thisObject.posY.toString() + "px";
  }

  function startDragging(e) {
    draggingPanel = thisObject;
    thisObject.offsetX = thisObject.posX - e.clientX;
    thisObject.offsetY = thisObject.posY - e.clientY;
  }

  let thisObject = { container, offsetX, offsetY, posX, posY, updatePosition };

  return thisObject;
};

let draggingPanel = null;

onmousemove = function (e) {
  // console.log("mouse location:", e.clientX, e.clientY);
  if (draggingPanel != null) {
    draggingPanel.updatePosition(
      e.clientX + draggingPanel.offsetX,
      e.clientY + draggingPanel.offsetY
    );
    // draggingPanel.container.style.top =
    //   (e.clientY + draggingPanel.offsetY).toString() + "px";
    // draggingPanel.container.style.left =
    //   (e.clientX + draggingPanel.offsetX).toString() + "px";
  }
};

onmouseup = (e) => {
  draggingPanel = null;
};

document.body.append(createPanel().container);
