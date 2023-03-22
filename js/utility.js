/* Fixing the height of the application window on iPhone */
const setAppHeight = () => {
  document.documentElement.style.setProperty(
    '--app-height',
    `${window.innerHeight}px`
  );
};
window.addEventListener('resize', setAppHeight);
setAppHeight();

/* Creates a new HTML element with the specified tag name, id,  classes and text content */
function createChild(tagName, id, classes, text) {
  const newElement = document.createElement(tagName);
  newElement.innerHTML = text;
  newElement.setAttribute('id', id);
  addClasses(newElement, classes);
  return newElement;
}

/* Adds the specified classes to the given HTML element */
function addClasses(element, classes) {
  for (const _class of classes) {
    element.classList.toggle(_class);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


