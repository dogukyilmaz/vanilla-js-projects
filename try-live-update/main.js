const main = document.getElementById("added");
const button = document.getElementsByClassName("button");


const getCredentials = () => {
  const item = {
    todo: document.querySelector('[name="todo"]').value,
    done: document.querySelector('[name="done"]').value
  };

  return item;
};

const addEventListener = (selector, event, handler) => {
  document.addEventListener(event, async ev => {
    if(ev.target.closest(selector)) {
      handler(ev);
    }
  });
};

addEventListener('#add', 'click', async (ev) => {
  ev.preventDefault();
  const credentials = getCredentials();
  console.log(credentials)
  main.innerHTML += `
  <li style="background: gray; border-radius: 10px; padding: 5px 10px; list-style-type: none; margin-top: 1px">
    <h3>${credentials.todo}</h3>
    <span>${credentials.done}</span>
  </li>`;

  document.querySelector('[name="todo"]').value = "";
  document.querySelector('[name="done"]').value = "";
});