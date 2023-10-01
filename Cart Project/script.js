const formItem = document.getElementById('item-form');
const inputItem = document.getElementById('item-input');
const itemList = document.getElementById('item-list');


function addItem(e){
e.preventDefault();
    if(inputItem.value===''){
        alert('fill the input form');
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputItem.value));
    // console.log(li);
    const button = createButton('remove-item btn-link text-red');
    // console.log(button);
    li.appendChild(button);

    // console.log(li);

    itemList.appendChild(li);
    inputItem.value='';

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
formItem.addEventListener('submit',addItem);