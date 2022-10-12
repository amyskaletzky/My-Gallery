'use strict'


var gProjs = [{
    id: "minesweeper", //change all ids to name of game/app
    name: "Minesweeper",
    title: "Try not to explode!",
    desc: "The aim of the game is to not blow up, obviously! Squares that are 'safe' have numbers telling you how many mines are touching the square. If you click on a mine, you lose! If you think you know where a mine is, right-click and a flag will be placed on the square. Best of luck!",
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
    id: "pacman",
    name: "Pacman",
    title: "A work in progress, haha",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/pacman",
    publishedAt: getFormattedTimeDate(Date.now()).date,
    labels: ["JS Vanilla", "keyboard events"],
},  {
    id: "inpicture",
    name: "In-Picture",
    title: "Guess what's in the picture!",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/sokoban",
    publishedAt: getFormattedTimeDate(Date.now()).date,
    labels: ["JS Vanilla", "keyboard events"],
}, {
    id: "ball-board",
    name: "Ballboard",
    title: "Catch all the balls!",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/ball-board",
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