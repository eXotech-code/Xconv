let lastCopied = "";

browser.menus.create({
    id: "convert-clipboard",
    title: browser.i18n.getMessage("context_menu_clipboard"),
    contexts: ["selection"]
});

browser.menus.create({
    id: "convert-svg",
    title: browser.i18n.getMessage("context_menu_svg"),
    contexts: ["selection"]
});

browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "convert-clipboard":
            convertAndSave(info.selectionText);
            break;
        case "convert-svg":
            convertToSVG(info.selectionText, tab);
            break;
    }
});

// Replaces all "\\" with "$$", so the library can process existential quantifiers.
const replaceBullshit = (equation) => {
    return equation.replaceAll("\\/", "$$$$");
}

// Uses a library to convert ASCII math to LaTeX equation.
const convert = (equation) => {
    return `\\( ${AMTparseAMtoTeX(replaceBullshit(equation))} \\)`;
}

const convertAndSave = (equation) => {
    const converted = convert(equation);
    
    // Save resulting LaTeX equation to clipboard.
    navigator.clipboard.writeText(converted);
    
    lastCopied = converted;
}

const convertToSVG = (equation, tab) => {
    browser.tabs.sendMessage(tab.id, {equation: convert(equation)});
}

const giveCopy = (message) => {
    if (message.getCopy) { navigator.clipboard.writeText(lastCopied) };
}

browser.runtime.onMessage.addListener(giveCopy);
