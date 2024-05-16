const MY_COPY_TEXT = "\n\n© 202X by MyCompany\nAll rights reserved.";
/***************************************************************************************
 * Extend copy with selected text - without framework - Simple version
 ***************************************************************************************/
(function (window, document) {
    window.onload = function () {
        document.addEventListener('copy', function (e) {
            e.clipboardData.setData('text/plain', MY_COPY_TEXT);
            e.clipboardData.setData('text/html', MY_COPY_TEXT);
            e.preventDefault();
        });
    }
}(window, document));
/***************************************************************************************
 Extend copy with selected text - without framework
 ***************************************************************************************/
(function (window, document) {
    window.onload = function () {
        document.addEventListener("copy", function (e) {
            const winSelection = window.getSelection();
            const newDiv = document.createElement("div");
            newDiv.style.position = "absolute";
            newDiv.style.left = "-99999px";

            let htmlContent = "";
            if (typeof window.getSelection != "undefined") {
                const sel = window.getSelection();
                if (sel.rangeCount) {
                    let container = document.createElement("div");
                    for (let i = 0; i < sel.rangeCount; i++) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    htmlContent = container.innerHTML;
                    container = null;
                }
            } else if (typeof document.selection !== "undefined") {
                if (document.selection.type === "Text") {
                    htmlContent = document.selection.createRange.htmlText;
                }
            }

            newDiv.innerHTML = `${htmlContent} ${MY_COPY_TEXT}`;

            document.body.appendChild(newDiv);

            winSelection.selectAllChildren(newDiv);
            setTimeout(() => {
                document.body.removeChild(newDiv);
                htmlContent = "";
            }, 100);
        });
    }
}(window, document));