const darkBtn = document.querySelector("h1 > img")
const result_box = document.querySelector(".result .text")
const cells = document.querySelectorAll(".cell")
const box = document.querySelector(".box")
const socket = io('ws://localhost:3000');

socket.on('gameend', data => {
    result_box.parentElement.style.display = "flex"
    if (data != 'none'){
        str = "Winner is: " + data
    }
    else {
        str = "That was a tie" 
    }
    result_box.innerHTML = str
    box.classList.add('finished')
});

socket.on('ai', (x, y, aiSign) => {
    tick(x, y, aiSign)
});

board = [['', '', ''], ['', '', ''], ['', '', '']]
inverse = [['', '', ''], ['', '', ''], ['', '', '']]
sign = 'X'

function darkMode() {
    status = document.querySelector("body").classList.toggle("dark")
    localStorage.setItem("darkmode", status)
    if (status == "true") {
        darkBtn.src = "images/sun-icon.webp"
        return status
    }
    darkBtn.src = "images/moon-icon.webp"
    return status
}

function tick(x, y, tickSign) {
    console.log(inverse)
    cell = cells[x * 3 + y]
    console.log(x * 3 + y)
    if (cell.innerHTML == "") {
        cell.innerHTML = tickSign
        board[x][y] = tickSign
        inverse[y][x] = tickSign
        socket.emit('tick', board, inverse, tickSign);
    }
}

if (localStorage.getItem('darkmode') == "true") {
    darkMode()
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
        if (this.innerHTML == ""){       
            xCord = Math.floor(i/3)
            yCord = i % 3
            tick(xCord, yCord, sign)
        }
    })
}

