'use strict'
//change name to game later on




// all consts
const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''




// global variables
var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2,
}


var gGame
var gInterval
var elTimer = document.querySelector('.timer')




function initGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
    }

    document.getElementById("emoji").src = "img/regular.png"
    getSelectValue()
    gBoard = buildBoard()
    renderBoard(gBoard)
    // clearInterval(gInterval)
}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }

        }

    }
    addMine(board, gLevel.MINES, gLevel.SIZE)

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            setMinesNegsCount(board, i, j)

        }
    }

    return board
}

function addMine(board, mineNums, size) {

    for (var i = 0; i < mineNums; i++) {
        const i = getRandomInt(0, size)
        const j = getRandomInt(0, size)

        board[i][j].isMine = true

    }

    return board


}


function setMinesNegsCount(board, x, y) {
    var count = 0

    if (!board[x][y].isMine) {
        for (var i = x - 1; i <= x + 1; i++) {
            if (i < 0 || i >= gLevel.SIZE) continue
            for (var j = y - 1; j <= y + 1; j++) {
                if (j < 0 || j >= gLevel.SIZE) continue

                var currCell = board[i][j]
                if (currCell.isMine) count++

            }

        }
        if (count > 0) {
            board[x][y].minesAroundCount = count
        } else {
            board[x][y].minesAroundCount = ''
        }
    }

}


function cellClicked(elCell, i, j) {

    if (gGame.isOn && !gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
        if (gGame.shownCount === 0 && elTimer.innerText === '0:00') showTimer()
        revealCells(i, j)
        renderBoard(gBoard)
        if (gBoard[i][j].isMine) gameOver()


    } else return

    checkGameOver()

}


function revealCells(x, y) {
    if (gBoard[x][y].minesAroundCount === '') {
        for (var i = x - 1; i <= x + 1; i++) {
            if (i < 0 || i >= gLevel.SIZE) continue
            for (var j = y - 1; j <= y + 1; j++) {
                if (j < 0 || j >= gLevel.SIZE) continue

                if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                    gBoard[i][j].isShown = true
                    gGame.shownCount++ 
                    console.log(gGame.shownCount);
                    console.log(gGame.markedCount);
                   

                }
            }
        }
    } else {
        if (!gBoard[x][y].isShown) {
            gBoard[x][y].isShown = true
            gGame.shownCount++

        }
    }
}



function cellMarked(elCell, i, j) {
    if (gGame.isOn) {
        if (!gBoard[i][j].isMarked) {
            gBoard[i][j].isMarked = true
            if (gGame.markedCount === 0 && elTimer.innerText === '0:00') showTimer()
            gGame.markedCount++
            renderBoard(gBoard)
            checkGameOver()
            // console.log(gGame.markedCount)

        } else {
            gBoard[i][j].isMarked = false
            renderBoard(gBoard)
            gGame.markedCount--
        }

    }
    // console.log(gGame.markedCount)
    checkGameOver()
}

function getSelectValue() {
    var selectedValue = document.getElementById('list').value

    if (selectedValue === 'easy') {
        gLevel = {
            SIZE: 4,
            MINES: 2,
        }
        elTimer.innerText = '0:00'
        clearInterval(gInterval)
        gGame.shownCount = 0
        gGame.markedCount = 0
        gGame.isOn = true

    } else if (selectedValue === 'medium') {
        gLevel = {
            SIZE: 8,
            MINES: 14,
        }
        elTimer.innerText = '0:00'
        clearInterval(gInterval)
        gGame.shownCount = 0
        gGame.markedCount = 0
        gGame.isOn = true

    } else if (selectedValue === 'hard') {
        gLevel = {
            SIZE: 12,
            MINES: 32,
        }
        elTimer.innerText = '0:00'
        clearInterval(gInterval)
        gGame.shownCount = 0
        gGame.markedCount = 0
        gGame.isOn = true
    }
    return gLevel
}

function showTimer() {
    var initialTime = Date.now()
    gInterval = setInterval(function () {
        var differenceInTime = Date.now() - initialTime
        var correctFormat = convertTime(differenceInTime)
        elTimer.innerText = correctFormat
    }, 1000)


}

function convertTime(miliseconds) {
    var totalSeconds = Math.floor(miliseconds / 1000)
    var minutes = Math.floor(totalSeconds / 60)
    var seconds = totalSeconds - minutes * 60
    if (seconds < 10) {
        return minutes + ':0' + seconds
    } else {
        return minutes + ':' + seconds
    }
}

function gameOver() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) gBoard[i][j].isShown = true
        }
    }
    gGame.isOn = false
    clearInterval(gInterval)
    document.getElementById("emoji").src = "img/gameoveremoji.png"
    renderBoard(gBoard)

}

function checkGameOver() {
    if (gGame.shownCount === ((gLevel.SIZE * gLevel.SIZE) - gLevel.MINES) && gGame.markedCount === gLevel.MINES) victory()
}

function victory() {
    gGame.isOn = false
    clearInterval(gInterval)
    document.getElementById("emoji").src = "img/victoryemoji.png"
}

