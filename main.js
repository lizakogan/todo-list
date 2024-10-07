(() => {
  
  let toDoListArray = JSON.parse(localStorage.getItem('toDoList')) || [];

  const form = document.querySelector(".form"); 
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList"); 

  window.addEventListener('load', () => {
    toDoListArray.forEach(item => addItemToDOM(item.itemId, item.toDoItem));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let itemId = String(Date.now());
    let toDoItem = input.value;

    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);

    input.value = '';
  });
  
  ul.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      let id = e.target.parentElement.getAttribute('data-id');
      if (!id) return;

      removeItemFromDOM(id);
      removeItemFromArray(id);
    }
  });
  
  function addItemToDOM(itemId, toDoItem) {    
    const li = document.createElement('li');
    li.setAttribute("data-id", itemId);

    // יצירת תיבת סימון
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    // יצירת אלמנט טקסט
    const textSpan = document.createElement('span');
    textSpan.className = 'toDoText';
    textSpan.innerText = toDoItem;

    // הוספת תיבת סימון וטקסט לרשימה
    li.appendChild(checkbox);
    li.appendChild(textSpan);

    ul.appendChild(li);
  }
  
  function addItemToArray(itemId, toDoItem) {
    toDoListArray.push({ itemId, toDoItem });
    updateLocalStorage();
  }
  
  function removeItemFromDOM(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    ul.removeChild(li);
  }
  
  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    updateLocalStorage();
  }
  
  // פונקציה לעדכון ה-localStorage
  function updateLocalStorage() {
    localStorage.setItem('toDoList', JSON.stringify(toDoListArray));
  }

})();