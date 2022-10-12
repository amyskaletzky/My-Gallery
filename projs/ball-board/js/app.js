'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'

const BALL = 'BALL'
const GAMER = 'GAMER'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'

// Model:
var gBoard
var gGamerPos
var gInterval

var ballCount = 0

function initGame() {
	gGamerPos = { i: 2, j: 9 }
	gBoard = buildBoard()
	renderBoard(gBoard)
	
}

function buildBoard() {
	// TODO: Create the Matrix 10 * 12 
	const board = createMat(10, 12)

	// TODO: Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if (i === 0 || i === board.length - 1 ||
				j === 0 || j === board[i].length - 1) {
				board[i][j] = { type: WALL, gameElement: null }
			} else {
				board[i][j] = { type: FLOOR, gameElement: null }
			}
		}
	}
	// TODO: Place the gamer and two balls
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
	board[4][6].gameElement = BALL
	board[6][3].gameElement = BALL

	gInterval = setInterval(renderRandomBall, 5000)
	// clearInterval(interval) //later on put in own func when game over
	
	console.log(board)
	return board
}


function getEmptyCells() {
	var emptyCells = []

	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[i].length; j++) {
			if (!gBoard[i][j].gameElement && gBoard[i][j].type === FLOOR) {
				emptyCells.push({ i, j })
			}
		}
	}
	return emptyCells
}



function renderRandomBall() {

	var emptyCells = getEmptyCells()

	var randomIdx = getRandomInt(0, emptyCells.length)
	var cell = emptyCells[randomIdx]

	gBoard[cell.i][cell.j].gameElement = BALL
	renderCell(cell, BALL_IMG)

}

// Render the board to an HTML table
function renderBoard(board) {

	const elBoard = document.querySelector('.board')
	var strHTML = ''

	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n'
		for (var j = 0; j < board[0].length; j++) {
			const currCell = board[i][j]

			var cellClass = getClassName({ i, j })

			if (currCell.type === FLOOR) cellClass += ' floor'
			else if (currCell.type === WALL) cellClass += ' wall'

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n'

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG
			}

			strHTML += '\t</td>\n'
		}
		strHTML += '</tr>\n'
	}
	// console.log('strHTML is:')
	// console.log(strHTML)
	elBoard.innerHTML = strHTML
}

// Move the player to a specific location
function moveTo(i, j) {
	const targetCell = gBoard[i][j]

	if (targetCell.type === WALL) return

	// Calculate distance to make sure we are moving to a neighbor cell
	const iAbsDiff = Math.abs(i - gGamerPos.i)
	const jAbsDiff = Math.abs(j - gGamerPos.j)

	// If the clicked Cell is one of the four allowed
	// if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
	if (iAbsDiff + jAbsDiff === 1) {

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!')
			ballCount++
			printBallCount(ballCount)
			// var audio = new Audio('')
			// audio.play()

		}

	
		// TODO: Move the gamer
		// Model
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null

		// DOM
		var selectorStr = getClassName(gGamerPos)
		var elCell = document.querySelector('.' + selectorStr)
		elCell.innerHTML = ''

		// Model
		gBoard[i][j].gameElement = GAMER
		gGamerPos = { i, j }

		// DOM
		selectorStr = getClassName(gGamerPos)
		elCell = document.querySelector('.' + selectorStr)
		elCell.innerHTML = GAMER_IMG
	
	} else console.log('Bad Move', iAbsDiff, jAbsDiff)

	checkIfGameOver()
}

function printBallCount(ballCount) {
	var strHTML = ''
	var elH2 = document.querySelector('h2')
	strHTML += ballCount
	elH2.innerText = 'Ball count: ' + strHTML

}

function checkIfGameOver() {
	var count = 0
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			if (gBoard[i][j].gameElement === BALL) {
				count++
				console.log('hi')
			}
		}
	}

	if (count === 0) {
		gameOver()
	} 
	
}

function gameOver() {
	var strHTML = ''
	clearInterval(gInterval)
	strHTML += `<button onclick= "restartGame()" class = "btn">Restart</button>`	
	var elDiv = document.querySelector('div')
	elDiv.innerHTML = strHTML


}

function restartGame() {
	initGame()
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	const cellSelector = '.' + getClassName(location)
	const elCell = document.querySelector(cellSelector)
	elCell.innerHTML = value
}

// Move the player by keyboard arrows
function handleKey(event) {

	const i = gGamerPos.i
	const j = gGamerPos.j

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1)
			break
		case 'ArrowRight':
			moveTo(i, j + 1)
			break
		case 'ArrowUp':
			moveTo(i - 1, j)
			break
		case 'ArrowDown':
			moveTo(i + 1, j)
			break
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	const cellClass = 'cell-' + location.i + '-' + location.j
	return cellClass
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}
