const theme = document.querySelector("#theme-link");
document.addEventListener('DOMContentLoaded', getTitle);
document.addEventListener('DOMContentLoaded', getText);

function refresh() {
    elems = document.querySelectorAll('.addItemBtn')
    for (var i = 0; i < elems.length; i++) {
        elems[i].onclick = function () {
            if (document.getElementById('itemInput') != null) {
                for (var t = 0; t < document.querySelectorAll('.item-input').length; t++) {
                    document.querySelectorAll('.item-input')[t].style.display = 'none';
                    document.querySelectorAll('.areaButtons')[t].style.display = 'none';
                }
                // document.getElementById('itemInput').style.display = 'none';
                for (var k = 0; k < document.querySelectorAll('.addItemBtn').length; k++) {
                    document.querySelectorAll('.addItemBtn')[k].style.display = 'inline';
                }
            }


            this.style.display = 'none';
            newItemInput = document.createElement('textarea');
            newItemInput.classList.add('item-input');
            newItemInput.id = 'itemInput';
            newItemInput.placeholder = 'Item Here';
            newItemInput.cols = '30';
            newItemInput.rows = '5';
            newItemInput.addEventListener('keypress', (e) => {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) { //Enter keycode
                    if (/\S/.test(newItemInput.value)) {
                        newItemInput.style.display = 'none';
                        addButton.style.display = 'none';
                        cancelButton.style.display = 'none';
                        textareaButtons.style.display = 'none';
                        itemCard = document.createElement('div');
                        itemCard.classList.add('item-card');
                        this.parentNode.parentElement.insertBefore(itemCard, this.parentNode)
                        itemText = document.createElement('p');
                        itemText.innerText = newItemInput.value;
                        itemText.classList.add('item-text');
                        itemCard.appendChild(itemText);
                        newItemInput.value = '';
                        this.style.display = 'inline';
                        threeDots = document.createElement('span');
                        threeDots.innerHTML = 'delete';
                        threeDots.classList.add('three-dots');
                        threeDots.classList.add('material-icons');
                        threeDots.onclick = function () {
                            let title = this.parentElement.parentElement.firstElementChild.innerText;
                            if (localStorage.getItem(title) === null) {
                                titles = [];
                            } else {
                                titles = JSON.parse(localStorage.getItem(title))
                            }
                            titles.splice(titles.indexOf(this.parentElement.firstElementChild.innerText), 1)
                            localStorage.setItem(title, JSON.stringify(titles));
                            this.parentElement.remove()
                        }
                        itemCard.appendChild(threeDots);
                        //save item text here
                        saveText(itemText.innerText, this)
                    } else {
                        newItemInput.style.display = 'none';
                        addButton.style.display = 'none';
                        cancelButton.style.display = 'none';
                        textareaButtons.style.display = 'none';
                        this.style.display = 'inline';
                    }
                }
            });
            this.parentElement.appendChild(newItemInput);
            textareaButtons = document.createElement('div');
            textareaButtons.classList.add('areaButtons');
            this.parentElement.appendChild(textareaButtons);
            addButton = document.createElement('button');
            addButton.classList.add('add-item-button');
            addButton.innerText = 'Add Item';
            cancelButton = document.createElement('button');
            cancelButton.classList.add('cancel-item-button');
            cancelButton.innerText = 'X';
            textareaButtons.appendChild(addButton);
            textareaButtons.appendChild(cancelButton);
            newItemInput.focus();
            cancelButton.onclick = function () {
                newItemInput.style.display = 'none';
                addButton.style.display = 'none';
                cancelButton.style.display = 'none';
                textareaButtons.style.display = 'none';
                this.style.display = 'none';
                for (var k = 0; k < document.querySelectorAll('.addItemBtn').length; k++) {
                    document.querySelectorAll('.addItemBtn')[k].style.display = 'inline';
                }
            }
            addButton.onclick = function () {
                if (/\S/.test(newItemInput.value)) {
                    newItemInput.style.display = 'none';
                    addButton.style.display = 'none';
                    cancelButton.style.display = 'none';
                    textareaButtons.style.display = 'none';
                    itemCard = document.createElement('div');
                    itemCard.classList.add('item-card');
                    this.parentElement.parentElement.parentElement.insertBefore(itemCard, this.parentElement.parentElement)
                    itemText = document.createElement('p');
                    itemText.innerText = newItemInput.value;
                    itemText.classList.add('item-text');
                    itemCard.appendChild(itemText);
                    newItemInput.value = '';
                    for (var k = 0; k < document.querySelectorAll('.addItemBtn').length; k++) {
                        document.querySelectorAll('.addItemBtn')[k].style.display = 'inline';
                    }
                    threeDots = document.createElement('span');
                    threeDots.innerHTML = 'delete';
                    threeDots.classList.add('three-dots');
                    threeDots.classList.add('material-icons');
                    threeDots.onclick = function () {
                        let title = this.parentElement.parentElement.firstElementChild.innerText;
                        if (localStorage.getItem(title) === null) {
                            titles = [];
                        } else {
                            titles = JSON.parse(localStorage.getItem(title))
                        }
                        titles.splice(titles.indexOf(this.parentElement.parentElement.firstElementChild.innerText), 1)
                        localStorage.setItem(title, JSON.stringify(titles));
                        this.parentElement.remove()
                    }
                    itemCard.appendChild(threeDots);
                    //save item text here
                    saveText(itemText.innerText, this.parentElement)
                } else {
                    newItemInput.style.display = 'none';
                    addButton.style.display = 'none';
                    cancelButton.style.display = 'none';
                    textareaButtons.style.display = 'none';
                    this.style.display = 'none';
                    for (var k = 0; k < document.querySelectorAll('.addItemBtn').length; k++) {
                        document.querySelectorAll('.addItemBtn')[k].style.display = 'inline';
                    }
                }
            }
        }
    }
}
refresh()

document.getElementById('addCardBtn').onclick = function () {
    document.getElementById('addCardBtn').disabled = true;
    document.getElementById('addCardBtn').style.cursor = 'not-allowed';
    newCard = document.createElement('div');
    newCard.classList.add('card')
    cardDelete = document.createElement('div');
    cardDelete.innerHTML = 'delete';
    cardDelete.classList.add('material-icons');
    cardDelete.classList.add('delete-card-button');
    cardDelete.onclick = function(){
        // this.parentElement.parentElement.remove()
        title = this.parentElement.parentElement.firstElementChild.innerText;
        let titles;
        if (localStorage.getItem('xbt@p0$SW%&j1P%l%PHh') === null) {
            titles = [];
        } else {
            titles = JSON.parse(localStorage.getItem('xbt@p0$SW%&j1P%l%PHh'));
        }
        console.log(titles.indexOf(titles))
        this.parentElement.parentElement.remove()
        titles.splice(titles.indexOf(title), 1)
        console.log(titles)
        localStorage.setItem('xbt@p0$SW%&j1P%l%PHh', JSON.stringify(titles));
        localStorage.removeItem(title)
    }
    this.parentNode.insertBefore(newCard, this)
    newAddBtn = document.createElement('button');
    newAddBtn.id = 'addItemBtn';
    newAddBtn.classList.add('addItemBtn');
    newAddBtn.innerText = 'Add Item +';
    newTitleInput = document.createElement('input');
    addTitleButton = document.createElement('button');
    addTitleButton.innerText = 'Add Card';
    addTitleButton.classList.add('add-item-button');
    cancelTitleButton = document.createElement('button');
    cancelTitleButton.innerText = 'X';
    cancelTitleButton.onclick = function(){
        newCard.remove()
        document.getElementById('addCardBtn').disabled = false;
        document.getElementById('addCardBtn').style.cursor = 'pointer';
    }
    cancelTitleButton.classList.add('cancel-item-button');
    addTitleButton.onclick = function(){
        var isThere = 0;
        elemTitle = document.querySelectorAll('.title')
        for (var z = 0; z < elemTitle.length; z++) {
            if (newTitleInput.value == elemTitle[z].innerText) {
                isThere++;
            }
            if (newTitleInput.value === 'xbt@p0$SW%&j1P%l%PHh'){
                isThere++;
            }
        }
        document.getElementById('addCardBtn').disabled = false;
        document.getElementById('addCardBtn').style.cursor = 'pointer';

        if (/\S/.test(newTitleInput.value) && isThere == 0) {
            document.getElementById('addCardBtn').parentElement.insertBefore(newCard, document.getElementById('addCardBtn'));
            newTitle = document.createElement('p');
            newTitle.innerText = newTitleInput.value;
            newTitle.classList.add('title');
            newTitleInput.remove();
            this.remove()
            cancelTitleButton.remove()
            addCancelButton.remove()
            newCard.appendChild(newTitle);
            newCard.appendChild(newAddBtn);
            anotherDiv = document.createElement('div')
            newCard.appendChild(anotherDiv);
            anotherDiv.appendChild(newAddBtn)
            anotherDiv.classList.add('delete-add-buttons')
            anotherDiv.appendChild(cardDelete)
            saveTitle(newTitleInput.value);
            refresh();
        } else {
            newCard.remove()
            document.getElementById('noTitle').style.display = 'inline';
        }
    }
    addCancelButton = document.createElement('div');
    addCancelButton.classList.add('add-cancel-buttons')
    addCancelButton.style.marginTop = '.5rem'
    newTitleInput.classList.add('title-input');
    newTitleInput.placeholder = 'Title:';
    newCard.appendChild(newTitleInput)
    newCard.appendChild(addCancelButton);
    addCancelButton.appendChild(addTitleButton)
    addCancelButton.appendChild(cancelTitleButton);
    newTitleInput.focus()
    newTitleInput.addEventListener('keypress', (e) => {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            cancelTitleButton.remove()
            addTitleButton.remove()
            addCancelButton.remove()
            var isThere = 0;
            elemTitle = document.querySelectorAll('.title')
            for (var z = 0; z < elemTitle.length; z++) {
                if (newTitleInput.value == elemTitle[z].innerText) {
                    isThere++;
                }
                if (newTitleInput.value === 'xbt@p0$SW%&j1P%l%PHh'){
                    isThere++;
                }
            }
            document.getElementById('addCardBtn').disabled = false;
            document.getElementById('addCardBtn').style.cursor = 'pointer';

            if (/\S/.test(newTitleInput.value) && isThere == 0) {
                this.parentNode.insertBefore(newCard, this);
                newTitle = document.createElement('p');
                newTitle.innerText = newTitleInput.value;
                newTitle.classList.add('title');
                newTitleInput.remove();
                newCard.appendChild(newTitle);
                newCard.appendChild(newAddBtn);
                anotherDiv = document.createElement('div')
                newCard.appendChild(anotherDiv);
                anotherDiv.appendChild(newAddBtn)
                anotherDiv.classList.add('delete-add-buttons')
                anotherDiv.appendChild(cardDelete)
                saveTitle(newTitleInput.value);
                refresh();
            } else {
                newCard.remove()
                document.getElementById('noTitle').style.display = 'inline';
            }
        }
    })
}

document.getElementById('okayMsgBtn').onclick = function () {
    document.getElementById('noTitle').style.display = 'none';
}


function saveTitle(title) {
    //Check if there is already things in there
    let titles;
    if (localStorage.getItem('xbt@p0$SW%&j1P%l%PHh') === null) {
        titles = [];
    } else {
        titles = JSON.parse(localStorage.getItem('xbt@p0$SW%&j1P%l%PHh'));
    }
    titles.push(title);
    localStorage.setItem('xbt@p0$SW%&j1P%l%PHh', JSON.stringify(titles));
}


function getTitle() {
    //Check if there is already things in there
    let titles;
    if (localStorage.getItem('xbt@p0$SW%&j1P%l%PHh') === null) {
        titles = [];
    } else {
        titles = JSON.parse(localStorage.getItem('xbt@p0$SW%&j1P%l%PHh'));
    }


    titles.forEach(function (title) {
        newDiv = document.createElement('div');
        newDiv.classList.add("card");
        cardDelete = document.createElement('div');
        cardDelete.innerHTML = 'delete';
        cardDelete.classList.add('material-icons');
        cardDelete.classList.add('delete-card-button');
        cardDelete.onclick = function(){
            // this.parentElement.parentElement.remove()
            title = this.parentElement.parentElement.firstElementChild.innerText;
            let titles;
            if (localStorage.getItem('xbt@p0$SW%&j1P%l%PHh') === null) {
                titles = [];
            } else {
                titles = JSON.parse(localStorage.getItem('xbt@p0$SW%&j1P%l%PHh'));
            }
            console.log(titles.indexOf(titles))
            this.parentElement.parentElement.remove()
            titles.splice(titles.indexOf(title), 1)
            console.log(titles)
            localStorage.setItem('xbt@p0$SW%&j1P%l%PHh', JSON.stringify(titles));
            localStorage.removeItem(title)
        }
        document.getElementById('cards').insertBefore(newDiv, document.getElementById('addCardBtn'))
        newTitle = document.createElement('p');
        newTitle.classList.add('title');
        newTitle.innerText = title;
        newDiv.appendChild(newTitle);
        newAddBtn = document.createElement('button');
        newAddBtn.id = 'addItemBtn';
        newAddBtn.classList.add('addItemBtn');
        newAddBtn.innerText = 'Add Item +';
        anotherDiv = document.createElement('div')
        anotherDiv.classList.add('delete-add-buttons')
        newDiv.appendChild(anotherDiv);
        anotherDiv.appendChild(newAddBtn)
        anotherDiv.appendChild(cardDelete)
        refresh();
    })
}

function saveText(text, thisElement) {
    finalThisElement = thisElement.parentElement.parentElement.firstElementChild.innerText;
    console.log(thisElement.parentElement.parentElement.firstElementChild)
    let texts;
    if (localStorage.getItem(finalThisElement) === null) {
        texts = [];
    } else {
        texts = JSON.parse(localStorage.getItem(finalThisElement));
    }
    texts.push(text);
    localStorage.setItem(finalThisElement, JSON.stringify(texts));

}


function getText() {
    titleClass = document.querySelectorAll('.title')
    for (var x = 0; x < titleClass.length; x++) {
        let titleClasses = titleClass[x].innerText;
        if (localStorage.getItem(titleClasses) === null) {
            titleClasses = [];
            // remove empty card
            // titleClass[x].parentElement.remove()
            // let titles;
            // if (localStorage.getItem('xbt@p0$SW%&j1P%l%PHh') === null) {
            //     titles = [];
            // } else {
            //     titles = JSON.parse(localStorage.getItem('xbt@p0$SW%&j1P%l%PHh'));
            // }
            // titles.splice(titles.indexOf(titleClass[x].innerText), 1)
            // localStorage.setItem('xbt@p0$SW%&j1P%l%PHh', JSON.stringify(titles));

        } else {
            titleClasses = JSON.parse(localStorage.getItem(titleClasses))
        }
        titleClassesFinal = titleClasses.reverse();
        titleClassesFinal.forEach(function (text) {
            newItemCard = document.createElement('div');
            newItemCard.classList.add('item-card');
            titleClass[x].parentElement.insertBefore(newItemCard, titleClass[x].parentElement.children[1])
            newItemCardText = document.createElement('p');
            newItemCardText.innerText = text;
            newItemCardText.classList.add('item-text');
            newItemCard.appendChild(newItemCardText);
            newThreeDots = document.createElement('span')
            newThreeDots.innerHTML = 'delete';
            newThreeDots.classList.add('three-dots');
            newThreeDots.classList.add('material-icons');
            newThreeDots.onclick = function () {
                let title = this.parentElement.parentElement.firstElementChild.innerText;
                if (localStorage.getItem(title) === null) {
                    titles = [];
                } else {
                    titles = JSON.parse(localStorage.getItem(title))
                }
                titles.splice(titles.indexOf(this.parentElement.firstElementChild.innerText), 1)
                localStorage.setItem(title, JSON.stringify(titles));
                this.parentElement.remove()
            }
            newItemCard.appendChild(newThreeDots);

        })
    }
}



document.getElementById('modeChange').addEventListener("click", function () {
    if (theme.getAttribute("href") == "light.css") {
        theme.href = "dark.css";
        document.getElementById('modeChange').innerText = 'light_mode';
        localStorage.setItem('current', 'dark');
    } else {
        theme.href = "light.css";
        document.getElementById('modeChange').innerText = 'dark_mode';
        localStorage.setItem('current', 'light');
    }
});



if (localStorage.getItem('current') === 'dark') {
    theme.href = "dark.css";
    document.getElementById('modeChange').innerText = 'light_mode';
} else {
    theme.href = "light.css";
    document.getElementById('modeChange').innerText = 'dark_mode';
}
