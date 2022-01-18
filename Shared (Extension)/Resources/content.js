// Include the pre tags in MathJax render but remove other unnecessary shit.
MathJax = {
  options: {
    skipHtmlTags: [
        'script', 'noscript', 'style', 'textarea',
        'code', 'annotation', 'annotation-xml'
    ],
  }
};

// Intercept the message from background script and render the passed equation.
const acceptMessage = (message) => {
    const eq = message.equation;
    
    // Get element on which the selection has been made.
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    
    /* Remove the selected text and replace it with LaTeX equation
     * gotten from background scripts. */
    sel.deleteFromDocument();
    let equationNode = document.createTextNode(eq);
    range.insertNode(equationNode);
    
    // Rerender all math on the page.
    MathJax.typeset();
}

browser.runtime.onMessage.addListener(acceptMessage);
