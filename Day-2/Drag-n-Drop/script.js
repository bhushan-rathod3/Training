let itemDragged = null;

document.querySelectorAll("li").forEach((item) => {
  item.addEventListener("dragstart", () => (itemDragged = item));
  item.addEventListener("dragover", (e) => e.preventDefault());
  item.addEventListener("drop", (e) => {
    let list = document.getElementById("list");
    let rect = item.getBoundingClientRect();
    let offset = e.clientY - rect.top;

    if (offset < rect.height / 2) {
      list.insertBefore(itemDragged, item);
    } else {
      list.insertBefore(itemDragged, item.nextSibling);
    }
  });
});
