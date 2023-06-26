// Background content script 
const article = document.querySelector('button');
console.log("Starting PGen app..")

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = 'Sign Up';

  // Image link for pgen
  const badge = document.createElement('a');
  badge.classList.add('color-secondary-text', 'type--caption');
  badge.textContent = `Generate a PGen password`;
  const url = chrome.runtime.getURL('popup.html');
  console.log(url)
  
  const matches = [];

  for (const button of document.querySelectorAll('button')) {
    if (button.textContent.includes(text)) {
      matches.push(button);
      button.insertAdjacentHTML("afterend", "<a id=" + "my link " + "href=" + url + " >Generate a PGen password</a>")
    }
  }
  console.log(matches);
}