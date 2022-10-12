'use strict'

const PACMAN = 'ᗤ'
var gPacman


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCount--
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    console.log(nextCell);
    if (nextCell === FOOD) {
        updateScore(1) //-- food count
        gFoodCount--
    } else if (nextCell === GHOST){
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else {
            for (var i = 0; i < gGhosts.length; i++) {
                var ghost = gGhosts[i] 
                
                if (ghost.i === nextLocation.i && ghost.j === nextLocation.j) {
                    gDeadGhosts.push(ghost)
                    gGhosts.splice(i, 1)
                }
            }
            
        
        }
    } else if (nextCell === CHERRY) {
        console.log('hi');
        updateScore(10)

    } else if (nextCell === POWER_FOOD) {
        if (!gPacman.isSuper) {
            updateScore(1)
            gPacman.isSuper = true
            gFoodCount--
            setTimeout(function() {
                   gPacman.isSuper = false
                   resurrectGhosts()
            }, 5000)
        } else {
            return
        }

    } 
    if (!gFoodCount) {
        victory()
    }
    
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    
    
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}