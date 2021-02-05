let current_state = [['.', '.', '.', '.'],
                    ['.', '.', '.', '.'],
                    ['.', '.', '.', '.'],
                    ['.', '.', '.', '.']]

let message = ''

function is_valid(px, py){
    return current_state[px][py] === '.';
}

function is_end(){
    // Vertical win
    for (let i=0; i<4; i++)
        if (current_state[0][i] !== '.' && current_state[0][i] === current_state[1][i] &&
            current_state[1][i] === current_state[2][i] && current_state[2][i] === current_state[3][i])
            return current_state[0][i]

    // Horizontal win
    for (let i=0; i<4; i++) {
        if (current_state[i][0] === 'X' && current_state[i][1] === 'X' &&
            current_state[i][2] === 'X' && current_state[i][3] === 'X')
            return 'X'
        else if (current_state[i][0] === 'O' && current_state[i][1] === 'O' &&
            current_state[i][2] === 'O' && current_state[i][3] === 'O')
            return 'O'
    }

    // Main diagonal win
    if (current_state[0][0] !== '.' && current_state[0][0] === current_state[1][1] &&
        current_state[0][0] === current_state[2][2] && current_state[0][0] === current_state[3][3])
        return current_state[0][0]

    // Second diagonal win
    if (current_state[0][3] !== '.' && current_state[0][3] === current_state[1][2] &&
        current_state[0][3] === current_state[2][1] && current_state[0][3] === current_state[3][0])
        return current_state[0][3]

    // Is whole board full?
    for (let i=0; i<4; i++)
        for (let j=0; j<4; j++)
            // There's an empty field, we continue the game
            if (current_state[i][j] === '.')
                return null

    return '.'
}

function max_alpha_beta(alpha, beta){
    let maxv = -2
    let px = null
    let py = null

    let result = is_end()

    if (result === 'X')
        return [-1, 0, 0]
    else if (result === 'O')
        return [1, 0, 0]
    else if (result === '.')
        return [0, 0, 0]

    for (let i=0; i<4; i++)
        for (let j=0; j<4; j++)
            if (current_state[i][j] === '.'){
                current_state[i][j] = 'O'
                let [m, min_i, in_j] = min_alpha_beta(alpha, beta)
                if (m > maxv) {
                    maxv = m
                    px = i
                    py = j
                }
                current_state[i][j] = '.'

                // Next two ifs in Max and Min are the only difference between regular algorithm and minimax
                if (maxv >= beta)
                    return [maxv, px, py]

                if (maxv > alpha)
                    alpha = maxv
            }
    return [maxv, px, py]
}

function min_alpha_beta(alpha, beta) {
    let minv = 2
    let qx = null
    let qy = null

    let result = is_end()

    if (result === 'X')
        return [-1, 0, 0]
    else if (result === 'O')
        return [1, 0, 0]
    else if (result === '.')
        return [0, 0, 0]

    for (let i=0; i<4; i++)
        for (let j=0; j<4; j++)
            if (current_state[i][j] === '.'){
                current_state[i][j] = 'X'
                let [m, max_i, max_j] = max_alpha_beta(alpha, beta)
                if (m < minv) {
                    minv = m
                    qx = i
                    qy = j
                }
                current_state[i][j] = '.'

                if (minv <= alpha)
                    return [minv, qx, qy]

                if (minv < beta)
                    beta = minv
            }
    return [minv, qx, qy]
}

function play(px, py){
    if (is_valid(px, py)){
        current_state[px][py] = 'X'
        let id = 4 * px + py
        let box = document.getElementById(id)
        box.classList.add('clicked')
        let gly = document.createTextNode('X')
        box.appendChild(gly)
        // console.log(current_state)

        let result = is_end()
        if (result !== null){
            console.log("X've done")
            if (result === 'X')
                message = 'The winner is X!'
            else if (result === 'O')
                message = 'The winner is O!'
            else if (result === '.')
                message = "It's a tie!"
            setTimeout(function() {
                alert(message);
            },2)
            location.reload()
        }
        else {
            let [m, x, y] = max_alpha_beta(-2, 2)
            current_state[x][y] = 'O'
            id = 4 * x + y
            box = document.getElementById(id)
            gly = document.createTextNode('O')
            box.appendChild(gly)

            result = is_end()
            if (result !== null) {
                console.log("O've done")
                if (result === 'X')
                    message = 'The winner is X!'
                else if (result === 'O')
                    message = 'The winner is O!'
                else if (result === '.')
                    message = "It's a tie!"
                setTimeout(function() {
                    alert(message);
                },2)
                location.reload()
            }
        }
    }
}

function clicked(id){
    let px = Math.floor(id / 4)
    let py = id % 4
    play(px, py)
}
