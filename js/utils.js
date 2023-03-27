'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    if(value === GHOST) elCell.style.color = value.color
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  
  function findRandomEmptyCell() {
    const emptyLocations = []
    for (var i = 1; i < BOARD_SIZE - 2; i++) {
        for (var j = 1; j < BOARD_SIZE - 2; j++) {
            const cell = gBoard[i][j]
            if (cell === EMPTY) {
                const pos = { i, j }
                emptyLocations.push(pos)
            }
        }
    }

    const randIdx = getRandomIntInclusive(0, emptyLocations.length)
    return emptyLocations[randIdx]

}