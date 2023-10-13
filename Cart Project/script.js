const formItem = document.getElementById('item-form');
const inputItem = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let isEditMode = false;
const formBtn = formItem.querySelector('button'); //selectiong button from form 


function displayItems(){
    const itemsStorage = getItemsFromStorage();
    itemsStorage.forEach(element => {
        addItem(element);
        checkUI();
    });
}
//New Item addition
function onSubmitItem(e){
e.preventDefault();
const newItem = inputItem.value;
    if(newItem===''){
        alert('fill the input form');
        return;
    }

    if(isEditMode){
        const itemtoEdit = itemList.querySelector('.edit-mode');
        removeFromStorage(itemtoEdit.textContent);
        itemtoEdit.classList.remove('.edit-mode');
        itemtoEdit.remove();
        isEditMode = false;
    }
    addItem(newItem);
    addItemsToStorage(newItem);
    checkUI();
    newItem= '';

}
function addItem(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

}
//adding  inoput data to local storage

function addItemsToStorage(item){
    const itemsStorage=getItemsFromStorage();

    itemsStorage.push(item);

    // Convert to JSON string and get to Local Storage

    localStorage.setItem('items',JSON.stringify(itemsStorage));
}

function getItemsFromStorage(){
    let itemsStorage;
    if(localStorage.getItem('items')===null){
        itemsStorage=[];
    }else{
        itemsStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsStorage;
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark fa-xs');
    // console.log(icon);
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}



//Item remove
function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
  

            passValue(e.target.parentElement.parentElement);
    
    }
    else{
        setItemtoEdit(e.target);
    }

    // e.target.remove();
}

function setItemtoEdit(item){
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(item =>item.classList.remove('edit-mode'));
    //changing item color
    // item.style.color = '#ccc';
    //we can change color using a css class also like below
    item.classList.add('edit-mode'); //using css class named 'edit-mode'

    //changing the button in edit mode

        formBtn.innerHTML = '<i class= "fa-solid fa-pen"></i>  Update Item';
        formBtn.style.backgroundColor = '#228B22';
        inputItem.value = item.textContent;

}
function removeFromStorage(item){
    let itemsStorage = getItemsFromStorage();
    itemsStorage = itemsStorage.filter(i => i !== item);

    localStorage.setItem('items',JSON.stringify(itemsStorage));
}
function passValue(item){
    if(confirm('Are you Sure ? ')){
        // remove from storage

        item.remove(); //from DOM
        removeFromStorage(item.textContent);
        checkUI();
    }
}

function clearAll(e){
    // itemList.innerHTML=''; // this is also works
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild); //this is faster
    }
    // clear from local storage
    localStorage.removeItem('items');
    checkUI();
}


// function filterItems(e) {
//     const items = itemList.querySelectorAll('li');
//     const text = e.target.value.toLowerCase();
  
//     items.forEach((item) => {
//       const itemName = item.firstChild.textContent.toLowerCase();
  
//       if (itemName.indexOf(text) != -1) {
//         item.style.display = 'flex';
//       } else {
//         item.style.display = 'none';
//       }
//     });
//   }

// itemFilter.addEventListener('input', filterItems);
function checkUI(){ 

    inputItem.value ='';
    // console.log('checking');
    const lists = document.querySelectorAll('li'); //all list element
    if(lists.length===0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';

    }

    formBtn.innerHTML = '<i class ="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

// initialize app
function init(){

    formItem.addEventListener('submit',onSubmitItem);
    itemList.addEventListener('click',removeItem);
    clearBtn.addEventListener('click',clearAll);
    // itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded',displayItems);
    checkUI();
}
init();