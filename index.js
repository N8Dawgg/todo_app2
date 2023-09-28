//Element.offsetWidth
//Element.offsetHeight

const createPanel = () => {
  let container = document.createElement("div");
  container.classList.add("panel_container");

  let panelTitleBar = document.createElement("div");
  container.append(panelTitleBar);
  panelTitleBar.classList.add("panel_title_bar");
  panelTitleBar.addEventListener("mousedown", startDragging);

  let panelTitleEditor = document.createElement("div");
  panelTitleBar.append(panelTitleEditor);
  panelTitleEditor.textContent = "Title";
  panelTitleEditor.classList.add("title_text");
  panelTitleEditor.addEventListener("dblclick", toggleTitleEditor);

  let panelBody = document.createElement("div");
  container.append(panelBody);
  panelBody.classList.add("panel_body");

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

  let edittingTitle = false;

  function canDrag() {
    if (!edittingTitle) {
      return true;
    }
    return flase;
  }

  const MAX_TITLE_LENGTH = 25;

  function toggleTitleEditor() {
    if (!edittingTitle) {
      let newInput = document.createElement("input");
      newInput.value = thisObject.panelTitleEditor.textContent;
      thisObject.panelTitleBar.prepend(newInput);
      thisObject.panelTitleEditor.remove();
      thisObject.panelTitleEditor = newInput;
      // newInput.type = "text";
      newInput.select();
      newInput.setAttribute("maxlength", MAX_TITLE_LENGTH);
      newInput.addEventListener("focusout", toggleTitleEditor);
    } else {
      let newDiv = document.createElement("div");
      newDiv.textContent = thisObject.panelTitleEditor.value;
      newDiv.classList.add("title_text");
      thisObject.panelTitleBar.prepend(newDiv);
      thisObject.panelTitleEditor.remove();
      thisObject.panelTitleEditor = newDiv;
      newDiv.addEventListener("dblclick", toggleTitleEditor);
    }
    edittingTitle = !edittingTitle;
  }

  function startDragging(e) {
    if (canDrag()) {
      draggingPanel = thisObject;
      thisObject.offsetX = thisObject.posX - e.clientX;
      thisObject.offsetY = thisObject.posY - e.clientY;
    }
  }

  let thisObject = {
    container,
    panelTitleBar,
    panelTitleEditor,
    offsetX,
    offsetY,
    posX,
    posY,
    edittingTitle,
    updatePosition,
  };

  return thisObject;
};

let draggingPanel = null;

onmousemove = function (e) {
  if (draggingPanel != null) {
    draggingPanel.updatePosition(
      e.clientX + draggingPanel.offsetX,
      e.clientY + draggingPanel.offsetY
    );
  }
};

onmouseup = (e) => {
  draggingPanel = null;
};

document.body.append(createPanel().container);
