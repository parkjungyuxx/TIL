import { fetchDocuments } from "./api.js";

window.addEventListener("DOMContentLoaded", async () => {
  const addPageBtn = document.getElementById("addPageBtn");
  const documentList = document.querySelector(".workSpce-document-list");

  async function renderDocumentList() {
    try {
      const documents = await fetchDocuments();
      documentList.innerHTML = "";

      documents.forEach((doc) => {
        const listItem = document.createElement("li");
        listItem.className = "document-item";

        listItem.innerHTML = `
          <a href="#/document/${doc.id}" class="document-link">
            <span class="document-title">${doc.title}</span>
          </a>
          <span class="document-options">⋮</span>
        `;

        documentList.appendChild(listItem);
      });
    } catch (error) {
      console.error("문서 목록을 불러오는데 실패했습니다:", error);
    }
  }

  addPageBtn.addEventListener("click", () => {
    const event = new CustomEvent("addPage");
    window.dispatchEvent(event);
  });

  renderDocumentList();
});
