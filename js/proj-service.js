'use strict'


var gProjs = [{
    id: "1", //change all ids to name of game/app
    name: "Minesweeper",
    title: "Try not to explode!",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/Minesweeper",
    publishedAt: 1448693940000,
    labels: ["JS Vanilla", "keyboard events"],
}, 
{
    id: "2",
    name: "In-Picture",
    title: "What's in the picture?",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/sokoban",
    publishedAt: 1448693940000,
    labels: ["JS Vanilla", "keyboard events"],
}, 
{
    id: "3",
    name: "Books Shop",
    title: "Digital book shop",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/sokoban",
    publishedAt: 1448693940000,
    labels: ["MVC", "CRUDL"],
}, 
{
    id: "4",
    name: "Guess Me",
    title: "Can you beat the genie?",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "projs/sokoban",
    publishedAt: 1448693940000,
    labels: ["Data structure", "jQuery", "MVC"],
}
]

function getProjsForDisplay() {
    var projs = gProjs
    return projs
}