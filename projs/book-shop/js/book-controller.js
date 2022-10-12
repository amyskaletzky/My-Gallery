'use strict'
const elContainer = document.querySelector('.books-container')
const elTable = document.querySelector('table')


function onInit() {
    renderBooks(1)
}

function renderBooks(diff) {
    var elThead = document.querySelector('thead')
    var elTbody = document.querySelector('tbody')
    var books = getBooks()
    
    
    if (diff === -1) {
        elTbody.innerHTML = ''                                          // add classlist so i can change all functions according to grid/table layout
        elThead.innerHTML = ''
        document.getElementById('table').classList.remove('on')
        elTable.classList.remove('table')

        var strHTML = books.map(book => `
        <article class="book-preview">
            <button class="btn-remove" onclick="onRemoveBook('${book.id}')">X</button>
            <h4>${book.title}</h4>
            <h5>Price of book: <span>${book.price}</span></h5>
            <h5>Rating: <span>${book.rate}</span></h5>
            <button id="details-btn" onclick="onReadBook('${book.id}')">Details</button>
            <button id="update-btn" onclick="onUpdateBook('${book.id}')">Update</button>                        
        </article> 
        `
        )
        elContainer.innerHTML = strHTML.join('')
        elContainer.classList.add('grid')
        document.getElementById('grid').classList.add('on')
        
    } else {
        document.getElementById('grid').classList.remove('on')
        document.getElementById('table').classList.add('on')
        elContainer.classList.remove('grid')
        elContainer.innerHTML = ''
        var strHTML = `
        <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Price</th>
        <th colspan="3">Actions</th>
        <th>Rating</th>
        </tr>`
        elThead.innerHTML = strHTML
        
        strHTML = books.map(book => `
        <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td><button onclick="onReadBook('${book.id}')" class="read">Read</button></td>
        <td><button onclick="onUpdateBook('${book.id}')" class="update">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')" class="delete">Delete</button></td>
        <td>${book.rate}</td>
        
        </tr>`
        )
        elTbody.innerHTML = strHTML.join('')
        elTable.classList.add('table')
    }
    
}

function buttonsHandler(diff) {
    renderBooks(diff)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        title: queryStringParams.get('title') || '',
        maxPrice: +queryStringParams.get('maxPrice') || 0,
        minRate: +queryStringParams.get('minRate') || 0
    }

    if (!filterBy.title && !filterBy.maxPrice && !filterBy.minRate) return

    document.querySelector('.filter-search-bar').value = filterBy.title
    document.querySelector('.filter-max-price').value = filterBy.maxPrice
    document.querySelector('.filter-min-rate').value = filterBy.minRate
    setBookFilter(filterBy)
}

function onPrevPage() {
    prevPage()
    if (elTable.classList.contains('table')) {
        renderBooks(1)
    } else if (elContainer.classList.contains('grid')) {
        renderBooks(-1)
    }
}
function onNextPage() {
    nextPage()
    if (elTable.classList.contains('table')) {
        renderBooks(1)
    } else if (elContainer.classList.contains('grid')) {
        renderBooks(-1)
    }
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    if (elTable.classList.contains('table')) {
        renderBooks(1)
    } else if (elContainer.classList.contains('grid')) {
        renderBooks(-1)
    }
}

function onAddBook() {
    var name = prompt('Name of book')
    var price = prompt('Price of book')
    addBook(name, price)
    if (elTable.classList.contains('table')) {
        renderBooks(1)
    } else if (elContainer.classList.contains('grid')) {
        renderBooks(-1)
    }

}

function onUpdateBook(bookId) {
    var price = prompt('State new price of book')
    updateBook(bookId, price)
    if (elTable.classList.contains('table')) {
        renderBooks(1)
    } else if (elContainer.classList.contains('grid')) {
        renderBooks(-1)
    }
}

function onReadBook(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
    var strHTML = `<h3>Rate this book: </h3><button onclick="onChangeRate(-1, '${book.id}')">-</button>
    <input type="number" value="0" min="0" max="10">
    <button onclick="onChangeRate(1, '${book.id}')">+</button>`
    document.querySelector('.rate').innerHTML = strHTML
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    if (elTable.classList.contains('table')) {
        renderBooks(1)
    } else if (elContainer.classList.contains('grid')) {
        renderBooks(-1)
    }

    const queryStringParams = `?title=${filterBy.title}&maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onChangeRate(diff, bookId) {
    var rate = +document.querySelector('.modal input').value
    if (rate >= 10 && diff > 0) return
    if (rate <= 0 && diff < 0) return
    rate += diff

    document.querySelector('.modal input').value = rate
    updateBookRate(rate, bookId)

}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
    if (elTable.classList.contains('table')) {
        renderBooks(1)
    } else if (elContainer.classList.contains('grid')) {
        renderBooks(-1)
    }
}


// {/* <img onerror="this.src='img/fiat.png'" src="img/${book.}.png" alt="Car by ${car.vendor}"> */}
