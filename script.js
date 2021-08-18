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
document.querySelector('.mode').addEventListener('click', changeMode);
document.querySelector('.closeSettings').addEventListener('click', closeSettings);
document.querySelector('.options').addEventListener('click', openSettings);
document.querySelector('.chartSwitch').addEventListener('input', toggleChart);


function closeSettings() {
    document.querySelector('.settings').style.display = 'none';
}

function openSettings() {
    document.querySelector('.settings').style.display = 'flex';
}

function toggleChart() {
    chartSwitch = document.querySelector('.chartSwitch');
    if (chartSwitch.checked == false) {
        localStorage.setItem('chart', 'false');
        console.log(document.getElementsByTagName('canvas'))
        canvases = document.getElementsByTagName('canvas');
        for (i=0; i < canvases.length; i++){
            canvases[i].style.display = 'none';
        }
    } else {
        localStorage.setItem('chart', 'true');
        location.reload()
    }
}


function noScroll() {
    window.scrollTo(0, 0);
}


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

if (localStorage.getItem('chart') === 'true') {
    document.querySelector('.chartSwitch').checked = true;
} else {
    document.querySelector('.chartSwitch').checked = false;
}


document.onclick = function (e) {
    if (e.target.tagName == 'LI') {

        currencySearch = e.target.innerText.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-');
        var regExp = /\(([^)]+)\)/;
        currency = e.target.innerText.replace(/ *\([^)]*\) */g, "");;
        symbol = regExp.exec(e.target.innerText)[1];
        fetch('https://api.coingecko.com/api/v3/coins/' + currency.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-').replace(/\s+/g, '-').toLowerCase() + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
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
                deleteDiv.onclick = function () {
                    let currencies;
                    if (localStorage.getItem('currencies') === null) {
                        currencies = [];
                    } else {
                        currencies = JSON.parse(localStorage.getItem('currencies'));
                    }
                    myIndex = currencies.indexOf(this.parentElement.childNodes[1].innerText)
                    currencies.splice(currencies.indexOf(this.parentElement.childNodes[1].innerText), 1);
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
                cyrptoPrice.innerText = data.market_data.current_price.usd;
                cyrptoPrice.classList.add('price');
                cryptoDiv.appendChild(cyrptoPrice);

                if (localStorage.getItem('chart') == 'true') {
                    canvas = document.createElement('canvas');
                    chartId = 'chart' + 1;
                    canvas.id = chartId;
                    var ctx = canvas.getContext('2d');
                    canvas.height = '70'
                    canvas.width = '180'
                    fetch('https://api.coingecko.com/api/v3/coins/' + currency.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-').replace(/\s+/g, '-').toLowerCase() + '/market_chart?vs_currency=usd&days=max')
                        .then(response => response.json())
                        .then(data => {
                            xs = []
                            ys = []
                            for (i = 0; i < data.prices.length; i++) {
                                time = data.prices[i][0]
                                date = new Date(time)
                                day = date.getDay()
                                month = date.getMonth()
                                year = date.getFullYear()
                                price = data.prices[i][1]
                                finalDate = day + '/' + month + '/' + year
                                xs.push(finalDate)
                                ys.push(price)
                            }
                            window[chartId] = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: xs,
                                    datasets: [{
                                        label: false,
                                        data: ys,
                                        borderColor: 'gray',
                                        borderWidth: 2.5
                                    }]
                                },
                                options: {
                                    elements: {
                                        point: {
                                            radius: 0
                                        }
                                    },

                                    plugins: {
                                        legend: false
                                    },
                                    responsive: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            display: false
                                        },
                                        x: {
                                            display: false
                                        }
                                    }
                                },
                            });
                        })
                    cryptoDiv.appendChild(canvas)
                }


                cryptoChange = document.createElement('div');
                try {
                    newData = data.market_data.price_change_percentage_24h
                } catch {
                    location.reload()
                }
                if (newData == null || newData == undefined) {
                    cryptoChange.innerText = 'unknown';
                    cryptoChange.style.backgroundColor = 'grey';
                    cryptoChange.style.padding = '3px';
                    cryptoChange.style.color = 'white';
                    cryptoDiv.style.borderLeft = '10px solid grey'
                } else {
                    cryptoChange.innerText = newData.toFixed(2);

                    cryptoChange.classList.add('change');
                    if (cryptoChange.innerText.includes("-")) {
                        cryptoChange.style.backgroundColor = 'red';
                        cryptoDiv.style.borderLeft = '10px solid red'
                    } else {
                        cryptoChange.style.backgroundColor = 'lime';
                        cryptoDiv.style.borderLeft = '10px solid lime'
                    }
                }
                cryptoChange.classList.add('change');
                cryptoDiv.appendChild(cryptoChange);

            })
    }
}



function searchBarFunction() {
    if (searchBar.style.display == "inline") {
        window.removeEventListener('scroll', noScroll);
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
        window.addEventListener('scroll', noScroll);
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
    currencies.forEach(function (currency, ind) {

        fetch('https://api.coingecko.com/api/v3/coins/' + currency.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-').replace(/\s+/g, '-').toLowerCase() + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
            .then(response => response.json())
            .then(data => {

                newCryptoDiv = document.createElement('div');
                newCryptoDiv.classList.add('crypto');
                document.querySelector('.cryptos').appendChild(newCryptoDiv);

                newDeleteDiv = document.createElement('span');
                newDeleteDiv.classList.add('deleteButton');
                newDeleteDiv.classList.add('material-icons');
                newDeleteDiv.innerHTML = 'delete';
                newDeleteDiv.onclick = function () {
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
                newCryptoSymbol.innerText = data.symbol.toUpperCase();
                newCryptoSymbol.classList.add('symbol');
                newCryptoDiv.appendChild(newCryptoSymbol);

                newCyrptoPrice = document.createElement('div');
                newCyrptoPrice.innerText = data.market_data.current_price.usd;
                newCyrptoPrice.classList.add('price');
                newCryptoDiv.appendChild(newCyrptoPrice);


                if (localStorage.getItem('chart') == 'true') {
                    newCanvas = document.createElement('canvas');
                    chartId = 'chart' + ind;
                    newCanvas.id = chartId;
                    var ctx = newCanvas.getContext('2d');
                    newCanvas.height = '70'
                    newCanvas.width = '180'
                    fetch('https://api.coingecko.com/api/v3/coins/' + currency.replace(/ *\([^)]*\) */g, "").replace(/\./g, '-').replace(/\s+/g, '-').toLowerCase() + '/market_chart?vs_currency=usd&days=max')
                        .then(response => response.json())
                        .then(data => {
                            xs = []
                            ys = []
                            for (i = 0; i < data.prices.length; i++) {
                                time = data.prices[i][0]
                                date = new Date(time)
                                day = date.getDay()
                                month = date.getMonth()
                                year = date.getFullYear()
                                price = data.prices[i][1]
                                finalDate = day + '/' + month + '/' + year
                                xs.push(finalDate)
                                ys.push(price)
                            }
                            window[chartId] = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: xs,
                                    datasets: [{
                                        label: false,
                                        data: ys,
                                        borderColor: 'gray',
                                        borderWidth: 2.5
                                    }]
                                },
                                options: {
                                    elements: {
                                        point: {
                                            radius: 0
                                        }
                                    },

                                    plugins: {
                                        legend: false
                                    },
                                    responsive: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            display: false
                                        },
                                        x: {
                                            display: false
                                        }
                                    }
                                },
                            });
                        })
                    newCryptoDiv.appendChild(newCanvas)
                }

                newCryptoChange = document.createElement('div');
                if (data.market_data.price_change_percentage_24h == null || data.market_data.price_change_percentage_24h == undefined) {
                    newCryptoChange.innerText = 'unknown';
                    newCryptoChange.style.backgroundColor = 'grey';
                    newCryptoChange.style.padding = '3px';
                    newCryptoChange.style.color = 'white';
                    newCryptoDiv.style.borderLeft = '10px solid grey'
                } else {
                    newCryptoChange.innerText = data.market_data.price_change_percentage_24h.toFixed(2);

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
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
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