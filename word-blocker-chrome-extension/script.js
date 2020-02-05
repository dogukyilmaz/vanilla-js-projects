const word = "word";
replaceText(document.body);

function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText)
  }
  else if (element.nodeType === Text.TEXT_NODE) {
    if(element.textContent.match(`/${word}/gi`)) {
      // element.parentElement.style.color = 'black';
      // element.parentElement.style.backgroundColor = 'black';
      const newElement = document.createElement('span');
      newElement.innerHTML = element.textContent.replace(`/${word}/gi`, '<span class="text-attention">$1</span>')
      element.replaceWith(newElement)
    }
    // element.textContent =  element.textContent.replace(/lorem/gi, 'yarasa');
  }
}