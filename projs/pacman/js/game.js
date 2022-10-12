'use strict'

const WALL = '▭'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍔'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gElModal = document.querySelector('.modal')
var gElBtn = document.querySelector('div button')
var gFoodCount = 0
var gInterval 

function init() {
    clearInterval(gInterval)
    gElModal.style.display = 'none'

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0

    gInterval = setInterval(addCherry, 2000)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            gFoodCount++
            board[i][j] = FOOD //++ to the food count

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gFoodCount--
            } 
            
            if ((i === 1) && (j === i) || 
                (i === 1) && (j === 8) ||
                (i === 8) && (j === 1) ||
                (j === 8) && (i === j)) {
                    board[i][j] = POWER_FOOD
                }
        }
    } 
    board[1][1] = POWER_FOOD //change to this
    return board
}

function addCherry() {

	const emptyCells = getEmptyCells()

    if(!emptyCells || !emptyCells.length) return
    // console.log(emptyCells);
	const randomIdx = getRandomIntInclusive(0, emptyCells.length - 1)
	const cell = emptyCells[randomIdx]


	renderCell(cell, CHERRY)

}

function getEmptyCells() {
	var emptyCells = []

	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[i].length; j++) {
			if (gBoard[i][j] === EMPTY){
				emptyCells.push({ i, j })
			}
		}
	}
	return emptyCells
}



function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
  
}


function gameOver() {
    
    var strHTML = ''
    
    strHTML += `<p>Game Over</p>`
    var elModalContent = document.querySelector('.modal-content')
    elModalContent.innerHTML = strHTML
    endGame()
}


function victory() {
    var strHTML = ''
    
    strHTML += `<p>You won! :)</p>`
    var elModalContent = document.querySelector('.modal-content')
    elModalContent.innerHTML = strHTML
    endGame()
}

function endGame() {
    // console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    showModal()
}

function showModal() {
    gElModal.style.display = 'block'
    gElBtn.innerText = 'Play Again'
}




// function endGame() {
//     // console.log('Game Over')
//     gGame.isOn = false
//     clearInterval(gIntervalGhosts)
    
//     if (foodCount === 0) {
//         victory()
//     } else {
//         gameOver()
//     }

//     makeModalVisible()
// }