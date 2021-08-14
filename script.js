fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
    .then(response => response.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {
            newLi = document.createElement('li');
            newLi.innerText = data[i].name + ' (' + data[i].symbol.toUpperCase() + ')';
            document.querySelector('.searchResults').appendChild(newLi)
        }
    })

searchBar = document.querySelector('.mainSearch');


document.addEventListener('DOMContentLoaded', getCurrencies);
document.querySelector('.addStock').addEventListener('click', searchBarFunction);
document.querySelector('.search').addEventListener('input', filterSearch);
document.querySelector('.mode').addEventListener('click', changeMode)

function changeMode() {
    if (this.innerText == 'dark_mode') {
        localStorage.setItem('mode', 'dark')
        this.innerText = 'light_mode'
        document.querySelector("#theme-link").href = "dark.css";
    } else {
        localStorage.setItem('mode', 'light')
        this.innerText = 'dark_mode'
        document.querySelector("#theme-link").href = "light.css";
    }
}

if (localStorage.getItem('mode') === 'dark') {
    document.querySelector("#theme-link").href = "dark.css";
    document.querySelector('.mode').innerText = 'light_mode'
} else {
    document.querySelector("#theme-link").href = "light.css";
    document.querySelector('.mode').innerText = 'dark_mode'
}


document.onclick = function (e) {
    if (e.target.tagName == 'LI') {

        currencySearch = e.target.innerText.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-');
        var regExp = /\(([^)]+)\)/;
        currency = e.target.innerText.split(" ")[0];
        symbol = regExp.exec(e.target.innerText)[1];
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + currencySearch.replace(/\s+/g, '-').toLowerCase() + '&vs_currencies=usd&include_24hr_change=true')
            .then(response => response.json())
            .then(data => {
                let currencies;
                if (localStorage.getItem('currencies') === null) {
                    currencies = [];
                } else {
                    currencies = JSON.parse(localStorage.getItem('currencies'));
                }
                currencies.push(e.target.innerText.replace(/ *\([^)]*\) */g, ""));
                localStorage.setItem('currencies', JSON.stringify(currencies));

                searchBar.classList.remove('topToBottom')
                searchBar.classList.add('bottomToTop')
                document.querySelector('.addStock').style.transform = "rotate(0deg)";
                searchBar.style.top = "-50%";
                setTimeout(function () {
                    document.querySelector('.searchInput').value = '';
                    searchBar.style.display = "none";
                    hiddenLi = 7;
                    document.querySelector('.searchResults').style.display = ''
                    li = document.querySelector('.searchResults').getElementsByTagName("li");
                    for (i = 0; i < li.length; i++) {
                        li[i].style.display = 'none';
                    }
                }, 300)
                cryptoDiv = document.createElement('div');
                cryptoDiv.classList.add('crypto');
                document.querySelector('.cryptos').appendChild(cryptoDiv);

                deleteDiv = document.createElement('span');
                deleteDiv.classList.add('deleteButton');
                deleteDiv.classList.add('material-icons');
                deleteDiv.innerHTML = 'delete';
                deleteDiv.onclick = function (currency) {
                    let currencies;
                    if (localStorage.getItem('currencies') === null) {
                        currencies = [];
                    } else {
                        currencies = JSON.parse(localStorage.getItem('currencies'));
                    }
                    currencies.splice(currencies.indexOf(currency), 1);
                    localStorage.setItem('currencies', JSON.stringify(currencies));
                    this.parentElement.remove()
                }
                cryptoDiv.appendChild(deleteDiv);

                cryptoName = document.createElement('div');
                cryptoName.innerText = e.target.innerText.replace(/ *\([^)]*\) */g, "");
                
                cryptoName.classList.add('name');
                cryptoDiv.appendChild(cryptoName);

                cryptoSymbol = document.createElement('div');
                cryptoSymbol.innerText = symbol;
                cryptoSymbol.classList.add('symbol');
                cryptoDiv.appendChild(cryptoSymbol);

                cyrptoPrice = document.createElement('div');
                cyrptoPrice.innerText = data[currencySearch.replace(/\s+/g, '-').toLowerCase()].usd;
                cyrptoPrice.classList.add('price');
                cryptoDiv.appendChild(cyrptoPrice);

                cryptoChange = document.createElement('div');
                try{newData = data[currencySearch].usd_24h_change}
                catch{location.reload()}
                if (newData == null || data[currencySearch].usd_24h_change == undefined) {
                    cryptoChange.innerText = 'unknown';
                    cryptoChange.style.backgroundColor = 'grey';
                    cryptoChange.style.padding = '3px';
                    cryptoChange.style.color = 'white';
                    newCryptoDiv.style.borderLeft = '10px solid grey'
                } else {
                    cryptoChange.innerText = data[currencySearch].usd_24h_change.toFixed(2);

                    cryptoChange.classList.add('change');
                    if (cryptoChange.innerText.includes("-")) {
                        cryptoChange.style.backgroundColor = 'red';
                        newCryptoDiv.style.borderLeft = '10px solid red'
                    } else {
                        cryptoChange.style.backgroundColor = 'lime';
                        newCryptoDiv.style.borderLeft = '10px solid lime'
                    }
                }
                cryptoChange.classList.add('change');
                cryptoDiv.appendChild(cryptoChange);

            })
    }
}



function searchBarFunction() {
    if (searchBar.style.display == "inline") {
        searchBar.classList.remove('topToBottom')
        searchBar.classList.add('bottomToTop')
        document.querySelector('.addStock').style.transform = "rotate(0deg)";
        searchBar.style.top = "-50%";
        setTimeout(function () {
            document.querySelector('.searchInput').value = '';
            searchBar.style.display = "none";
            hiddenLi = 7;
            document.querySelector('.searchResults').style.display = ''
            li = document.querySelector('.searchResults').getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                li[i].style.display = 'none';
            }
        }, 300)
    } else {
        searchBar.classList.remove('bottomToTop')
        searchBar.classList.add('topToBottom')
        searchBar.style.display = "inline";
        document.querySelector('.addStock').style.transform = "rotate(45deg) scale(1.5)";
        searchBar.style.top = "50%";
        document.querySelector('.searchInput').focus();
    }
}


function getCurrencies() {
    let currencies;
    if (localStorage.getItem('currencies') === null) {
        currencies = [];
    } else {
        currencies = JSON.parse(localStorage.getItem('currencies'));
    }
    currencies.forEach(function (currency) {
        fetch('https://api.coingecko.com/api/v3/coins/' + currency.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-').replace(/\s+/g, '-').toLowerCase() + '?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false')
            .then(response => response.json())
            .then(data => {
                currencySymbol = data.symbol;
            })
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + currency.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-').replace(/\s+/g, '-').toLowerCase() + '&vs_currencies=usd&include_24hr_change=true')
            .then(response => response.json())
            .then(data => {




                newCryptoDiv = document.createElement('div');
                newCryptoDiv.classList.add('crypto');
                document.querySelector('.cryptos').appendChild(newCryptoDiv);

                newDeleteDiv = document.createElement('span');
                newDeleteDiv.classList.add('deleteButton');
                newDeleteDiv.classList.add('material-icons');
                newDeleteDiv.innerHTML = 'delete';
                newDeleteDiv.onclick = function (currency) {
                    let currencies;
                    if (localStorage.getItem('currencies') === null) {
                        currencies = [];
                    } else {
                        currencies = JSON.parse(localStorage.getItem('currencies'));
                    }
                    currencies.splice(currencies.indexOf(currency), 1);
                    localStorage.setItem('currencies', JSON.stringify(currencies));
                    this.parentElement.remove()
                }
                newCryptoDiv.appendChild(newDeleteDiv);

                newCryptoName = document.createElement('div');
                newCryptoName.innerText = currency;
                newCryptoName.classList.add('name');
                newCryptoDiv.appendChild(newCryptoName);

                newCryptoSymbol = document.createElement('div');
                
                try{newCryptoSymbol.innerText = currencySymbol.toUpperCase();}
                catch{location.reload()}
                newCryptoSymbol.classList.add('symbol');
                newCryptoDiv.appendChild(newCryptoSymbol);

                newCyrptoPrice = document.createElement('div');
                newCurrency = currency.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-').replace(/\s+/g, '-').toLowerCase()
                newCyrptoPrice.innerText = data[newCurrency].usd;
                newCyrptoPrice.classList.add('price');
                newCryptoDiv.appendChild(newCyrptoPrice);

                newCryptoChange = document.createElement('div');
                if (data[newCurrency].usd_24h_change == null || data[newCurrency].usd_24h_change == undefined) {
                    newCryptoChange.innerText = 'unknown';
                    newCryptoChange.style.backgroundColor = 'grey';
                    newCryptoChange.style.padding = '3px';
                    newCryptoChange.style.color = 'white';
                    newCryptoDiv.style.borderLeft = '10px solid grey'
                } else {
                    newCryptoChange.innerText = data[newCurrency].usd_24h_change.toFixed(2);

                    newCryptoChange.classList.add('change');
                    if (newCryptoChange.innerText.includes("-")) {
                        newCryptoChange.style.backgroundColor = 'red';
                        newCryptoDiv.style.borderLeft = '10px solid red'
                    } else {
                        newCryptoChange.style.backgroundColor = 'lime';
                        newCryptoDiv.style.borderLeft = '10px solid lime'
                    }
                }
                newCryptoChange.classList.add('change');
                newCryptoDiv.appendChild(newCryptoChange);


            })

    })
}


function filterSearch() {
    var input, filter, ul, li, i, txtValue;
    input = document.querySelector('.searchInput')
    filter = input.value.toUpperCase();
    ul = document.querySelector('.searchResults')
    li = ul.getElementsByTagName("li");
    var allHiddenLiElements = 0
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        // if(li[i].innerText.indexOf('.') !== -1){
        //     li[i].style.display = "none";
        // }
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // console.log(li[i].innerText)
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
        if (li[i].style.display === "none") {
            allHiddenLiElements++
        }
        if (allHiddenLiElements == li.length || filter == "") {
            ul.style.display = 'none';
        } else {
            ul.style.display = "";
        }
    }
}

//chart:   https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max
