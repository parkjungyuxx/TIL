const openBtn = document.getElementById("openDialogBtn");
const dialog = document.getElementById("trashDialog");
const closeBtn = document.getElementById("closeDialogBtn");


openBtn.addEventListener("click", () => {
  dialog.showModal(); 
});


closeBtn.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("mousedown", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });