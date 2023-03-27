'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍔'
const CHERRY = '🍒'
const BOARD_SIZE = 10

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gElGameOver
var gFoodCountOnBoard
var gCherryAppearanceInterval

function onInit() {
    gElGameOver = document.querySelector('.game-over')
    gElGameOver.style.display = 'none'
    document.querySelector('.game-over .victory').style.visibility = 'hidden'
    gFoodCountOnBoard = 0
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryAppearanceInterval = setInterval(placeCherry, 10000)
}

function buildBoard() {
    
    const board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            if (i === 0 || i === BOARD_SIZE - 1 ||
                j === 0 || j === BOARD_SIZE - 1 ||
                (j === 3 && i > 4 && i < BOARD_SIZE - 2)) {
                board[i][j] = WALL
                continue
            }
            board[i][j] = FOOD
            gFoodCountOnBoard++ 
        }
    }
    board[1][1] = SUPERFOOD
    board[BOARD_SIZE - 2][BOARD_SIZE - 2] = SUPERFOOD
    board[1][BOARD_SIZE - 2] = SUPERFOOD
    board[BOARD_SIZE - 2][1] = SUPERFOOD
    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score

}

function gameOver(isVictory=false) {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gPacmanSuperFoodInterval) 
    clearInterval(gCherryAppearanceInterval)
    gGame.isOn = false
    gElGameOver.style.display = 'block'
   if(isVictory){
      document.querySelector('.game-over .victory').style.visibility = 'visible'
   } else  renderCell(gPacman.location ,'🪦')
}

function onPlayAgain(){
    onInit()
}

function placeCherry() {
    const emptyCell = findRandomEmptyCell()
    if (!emptyCell || !emptyCell.i)
    {
        debugger
    }
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
    gFoodCountOnBoard++
}
