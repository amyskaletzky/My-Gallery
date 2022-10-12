'use strict'

var gQuests = [
    {id: 1, opts:['An aeroplane', 'A pool'], correctOptIndex: 1, img: 'photos/1.jpg'},
    {id: 2, opts:['A forest', 'A river'], correctOptIndex: 0, img: 'photos/2.jpg'},
    {id: 3, opts:['An elephant', 'A hot air balloon'], correctOptIndex: 1, img: 'photos/3.jpg'},
]

var gCurrQuestIdx = 0
var elButtons = document.querySelectorAll('div button')
var gImg = document.querySelector('img')

// <!-- <img src="photos/2.jpg" alt='forest'>
// <img src="photos/3.jpg" alt='hot air balloon'> -->
function onLoad() {
    // for (var i = 0; i < elButtons.length; i++) {
        
    // }
}

function checkAnswer(optIdx) {

    if (gCurrQuestIdx < gQuests.length - 1) {
        if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
            gCurrQuestIdx++
            renderQuest()
        }
    
    } else {
        if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
            alert('Congratulations! You\'ve completed the game :)')
            createQuests()
        }
    }
        
    
}

function createQuests() {
    gQuests.push( {
        id: gQuests.length + 1,
        opts:['A car', 'A family'],
        correctOptIndex: 1,
        img: 'photos/4.jpg',
    } )
    
}

function renderQuest() {
    gImg.src = gQuests[gCurrQuestIdx].img
            for (var i = 0; i < elButtons.length; i++) {
                elButtons[i].innerText = gQuests[gCurrQuestIdx].opts[i]
            }
}


function restartGame() {
    gCurrQuestIdx = 0
    renderQuest()
}

    
   