 export class PopupUtils {
    
    static openPopupArticle(filePath, dialogTitle){
            const dialog = document.getElementById("algorithm-info");
            const iframe = document.getElementById("algorithmIframe");
            const dialogHeaderTitle = document.querySelector(".dialog-header > h2");
            iframe.src = filePath;
            dialogHeaderTitle.textContent = dialogTitle;
            dialog.showModal();
        }

    static closePopupArticle() {
            const dialog = document.getElementById("algorithm-info");
            const iframe = document.getElementById("algorithmIframe");
            dialog.close();
            iframe.src = ""; 
        }
    }

    window.PopupUtils = PopupUtils;