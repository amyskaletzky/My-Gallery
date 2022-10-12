'use strict'
const STORAGE_KEY = 'bookDB'
const gTitles = ['Learning Laravel', 'Beginning with Laravel', 'Java for developers', 'Harry Potter and the Sorcerer\'s Stone', 'The Hunger Games', 'Twilight', 'The Alchemist', 'Ramona and Beezus', 'Looking for Alaska', 'Pride and Prejudice', 'White Darkness', 'The Great Gatsby', 'Hamlet']
const PAGE_SIZE = 5


var gFilterBy = { title: '', maxPrice: 0, minRate: 0 }
var gBooks
var gPageIdx = 0


function getTitles() {
    return gTitles
}

_createBooks()

function getBooks() {
    // Filtering:
    var books = gBooks.filter(book => book.title.toLowerCase().includes(gFilterBy.title.toLowerCase()) &&
        book.price >= gFilterBy.maxPrice && book.rate >= gFilterBy.minRate)

    // Paging:
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}


function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price: getRandomDecimals(5.50, 40.00, 2),
        desc: makeLorem(),
        rate: 0
    }
}


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            var title = gTitles[getRandomIntInclusive(0, gTitles.length - 1)]
            books.push(_createBook(title))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function prevPage() {
    console.log(gPageIdx)
    if (gPageIdx <= 0) {
        document.getElementById('prev-page').disabled = true
    } else {
        document.getElementById('prev-page').disabled = false
        gPageIdx--
    }
    console.log(gPageIdx)
 
}

function nextPage() {
    console.log(gPageIdx)

    if (gPageIdx >= 3){
        document.getElementById('next-page').disabled = true
    } else {
        document.getElementById('next-page').disabled = false
        gPageIdx++
    }
    console.log(gPageIdx)

}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {
    const book = _createBook(name)
    book.price = price
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book

}

function updateBook(bookId, bookPrice) {
    const book = gBooks.find(book => bookId === book.id)
    book.price = bookPrice
    _saveBooksToStorage()
    return book
}

function setBookFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    return gFilterBy
}

function updateBookRate(rate, bookId) {
    const book = gBooks.find(book => bookId === book.id)
    book.rate = rate
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}