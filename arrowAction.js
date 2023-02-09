// 추후 사용자 입력하여 테이블 사이즈 조절
let table_length = 0;
let empty_list = [];
let score = 0;
let isGameOver = false;

const init = () => {
    score = 0;
    initTable();
}

const makeTable = () => {
    table_length = 5;
    let table = new Array(table_length);
    for(let i = 0; i < table_length; i++) {
        table[i] = new Array(table_length);
    }
    Array.from($(".column")).forEach(function(column, index) {
        let row = parseInt($(column).attr("id")[1]);
        let col = parseInt($(column).attr("id")[3]);
        let num = $(column).attr("class").includes("num") ? parseInt($(column).attr("class").split(" ")[1].split("-")[1]) : 0;
        
        table[row][col] = num;
    });

    return table
}

const initTable = () => {
    $(function() {
        $("#score").text(`${score}`);
    })
    Array.from($(".column")).forEach(function(column, index) {
        $(column).attr("class", "column");
        $(column).text("");
    });
}

const drawTable = (table) => {
    initTable();
    $(function() {
        $("#score").text(`${score}`);
    })
    for(let r = 0; r < table_length; r++) {
        for(let c = 0; c < table_length; c++) {
            if (table[r][c] !== 0) {
                $(`#r${r}c${c}`).addClass(`num-${table[r][c]}`).text(`${table[r][c]}`);
            }
        }
    }
}

const transpose = (table) => {
    let tmp = Array.from({ length: table.length }, () => new Array(table[0].length).fill(0));
    for(let r = 0; r < table.length; r++) {
        for(let c = 0; c < table[r].length; c++) {
            tmp[c][r] = table[r][c];
        }
    }
    return tmp;
}

const calcTable = (table, arrow) => {
    // LEFT, UP     : arrow = 0
    // RIGHT, DOWN  : arrow = 1
    for(let r = 0; r < table.length - 1; r++) {
        for(let c = 0; c < table[r].length - 1; c++) {
            if(table[r][c] === table[r][c + 1]) {
                table[r][c] *= 2;
                table[r][c + 1] = 0;
            }
        }
    }
}

const arrowAction = async (direction) => {

    if (isGameOver === true) {
        alert("Press the Retry Button");
        return;
    }
    /*
    *\@param direction
    * 0 : LEFT
    * 1 : RIGHT
    * 2 : UP
    * 3 : DOWN
    */
    /*
        process
        1. Sort the table
        2. Calculate the table
        3. add the element
        4. Game Over Status Check
    */

    /*
    makeTable
    [
        [ 2,  4,  0,  0,  0]
        [ 0,  8,  0,  2,  0],
        [ 0,  0,  0, 16,  0],
        [ 0,  0,  0,  0,  0],
        [ 0,  0,  0,  8,  0]
    ]
    */
    let table = await makeTable();

    empty_list = [];

    // DEBUG : console.log(table);

    if (direction === 0) {
        // LEFT 
        for(let r = 0; r < table_length; r++) {
            table[r] = await table[r].filter((col) => col > 0);
            for(let c = 0; c < table[r].length - 1; c++) {
                if(table[r][c] === table[r][c + 1]) {
                    score += table[r][c];
                    table[r][c] *= 2;
                    table[r][c + 1] = 0;
                }
            }
            table[r] = await table[r].filter((col) => col > 0);
            if (table[r].length !== table_length) {
                table[r] = await table[r].concat(Array.from({length: (table_length - table[r].length)}, () => 0));
            }
        }  
    }
    else if (direction === 1) {
        // RIGHT
        for(let r = 0; r < 5; r++) {
            table[r] = await table[r].filter((col) => col > 0);
            for(let c = 0; c < table[r].length - 1; c++) {
                if(table[r][c] === table[r][c + 1]) {
                    score += table[r][c];
                    table[r][c] *= 2;
                    table[r][c + 1] = 0;
                }
            }
            table[r] = await table[r].filter((col) => col > 0);
            if (table[r].length !== table_length) {
                table[r] = await Array.from({length: (table_length - table[r].length)}, () => 0).concat(table[r]);
            }
        }
    }
    else if (direction === 2) {
        // UP
        table = await transpose(table);
        for(let r = 0; r < 5; r++) {
            table[r] = await table[r].filter((col) => col > 0);
            for(let c = 0; c < table[r].length - 1; c++) {
                if(table[r][c] === table[r][c + 1]) {
                    score += table[r][c];
                    table[r][c] *= 2;
                    table[r][c + 1] = 0;
                }
            }
            table[r] = await table[r].filter((col) => col > 0);
            if (table[r].length !== table_length) {
                table[r] = await table[r].concat(Array.from({length: (table_length - table[r].length)}, () => 0));
            }
        }
        table = await transpose(table);
    }
    else if (direction === 3) {
        // DOWN
        table = await transpose(table);
        for(let r = 0; r < 5; r++) {
            table[r] = await table[r].filter((col) => col > 0);
            for(let c = 0; c < table[r].length - 1; c++) {
                if(table[r][c] === table[r][c + 1]) {
                    score += table[r][c];
                    table[r][c] *= 2;
                    table[r][c + 1] = 0;
                }
            }
            table[r] = await table[r].filter((col) => col > 0);
            if (table[r].length !== table_length) {
                table[r] = await Array.from({length: (table_length - table[r].length)}, () => 0).concat(table[r]);
            }
        }
        table = await transpose(table);
    }

    drawTable(table);

    console.log(score);

    setTimeout(() => {
        for(let r = 0; r < table_length; r++) {
            for(let c = 0; c < table[r].length; c++) {
                if(table[r][c] === 0) empty_list.push([r, c]);
            }
        }

        if (empty_list.length === 0) {
            isGameOver = true;
            alert("Game Over");
            return;
        }

        // console.log(empty_list);
    
        let randomValue = Math.floor(Math.random() * empty_list.length);
        let addElem = empty_list[randomValue];

        
    
        table[addElem[0]][addElem[1]] = 2;
    
        drawTable(table);
    }, 100)
    // Add Element to Empty Column

    

    
};