const formItem = document.getElementById('item-form');
const inputItem = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

const filter = document.getElementById('filter');


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
    checkUI();n 
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


function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('are you sure !!')){

            e.target.parentElement.parentElement.remove();
        }
    };
    checkUI();
    // e.target.remove();
}
itemList.addEventListener('click',removeItem);

function clearAll(e){
    // itemList.innerHTML=''; // this is also works
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild); //this is faster
    }
    checkUI();
}
clearBtn.addEventListener('click',clearAll);


function checkUI(){
    const lists = document.querySelectorAll('li'); //all list element
    if(lists.length==0){
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        filter.style.display = 'block';

    }
}

checkUI();