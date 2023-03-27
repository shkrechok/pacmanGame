'use strict'

const PACMAN = '😷'
var gPacman
var gPacmanSuperFoodInterval

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCountOnBoard--

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                //TODO: find ghost to a function
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    //Can't eat ghost on super food while pacman is super
                    if(gGhosts[i].currCellContent === SUPERFOOD) return
                        
                    if (gGhosts[i].currCellContent === FOOD ) {
                        updateScore(1)
                        gFoodCountOnBoard--
                    }
                    if (gGhosts[i].currCellContent === CHERRY) {
                        updateScore(10)
                        gFoodCountOnBoard--
                    }
                    gGhosts.splice(i, 1)
                    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
                    renderCell(gPacman.location, EMPTY)
                    gBoard[nextLocation.i][nextLocation.j] = PACMAN
                    renderCell(nextLocation, PACMAN)
                }
            }
        } else {
            console.log(gPacman,nextCell)
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCountOnBoard--
        console.log('gFoodCountOnBoard:', gFoodCountOnBoard)
    }

    if (nextCell === SUPERFOOD && gPacman.isSuper === true) return

    if (nextCell === SUPERFOOD) {
        updateScore(1)
        gFoodCountOnBoard--
        SwitchGhostsColorIsDead(true)

        gPacman.isSuper = true
        console.log('gPacman.isSuper:', gPacman.isSuper)
        gPacmanSuperFoodInterval = setTimeout(function () {
            gPacman.isSuper = false
            console.log('gPacman.isSuper:', gPacman.isSuper)
            SwitchGhostsColorIsDead(false)
        }, 5000)
    }

    if (nextCell === CHERRY) {
        updateScore(10)
        gFoodCountOnBoard--
        console.log('gFoodCountOnBoard:', gFoodCountOnBoard)
    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
    if (gFoodCountOnBoard === 0)  gameOver(true)
}

function getNextLocation(eventKeyboard) {
    console.log('eventKeyboard:', eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    // DONE: figure out nextLocation
    return nextLocation
}
