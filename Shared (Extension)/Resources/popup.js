const button = document.querySelector("[data-copy-button]");

const copyLast = () => {
    browser.runtime.sendMessage({getCopy: true});
}

button.addEventListener("click", copyLast);
