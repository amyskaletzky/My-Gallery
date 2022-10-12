'use strict'


var gProjs = [{
    id: "minesweeper", //change all ids to name of game/app
    name: "Minesweeper",
    title: "Try not to explode!",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/minesweeper",
    publishedAt: getFormattedTimeDate(Date.now()).date,
    labels: ["JS Vanilla", "keyboard events"],
}, {
    id: "bookshop",
    name: "Books Shop",
    title: "Digital book shop",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/sokoban",
    publishedAt: getFormattedTimeDate(Date.now()).date,
    labels: ["MVC", "CRUDL"],
}, {
    id: "guess-me",
    name: "Guess Me",
    title: "Can you beat the genie?",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/sokoban",
    publishedAt: getFormattedTimeDate(Date.now()).date,
    labels: ["Data structure", "jQuery", "MVC"],
}, {
    id: "inpicture",
    name: "In-Picture",
    title: "What's in the picture?",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/sokoban",
    publishedAt: getFormattedTimeDate(Date.now()).date,
    labels: ["JS Vanilla", "keyboard events"],
}
]

function getProjsForDisplay() {
    var projs = gProjs
    return projs
}

function getFormattedTimeDate(ts) {
    var t = new Date(ts)
    return {
        time: t.toLocaleTimeString(),
        date: t.toLocaleDateString()
    }
}