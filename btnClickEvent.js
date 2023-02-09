/**
 * Jquery JavaScript
 * Button Cick Event
 */
$(function() {
    
    let table_size = 3;
    let isStart = false;
    const start = () => {
        isStart = true;
        let start_pos = new Set();
        while(start_pos.size < 3) {
            start_pos.add(Math.floor(Math.random() * ((table_size * table_size) - 1)));
        }
        let table = makeTable();
        let i = 0;
        for(let p of start_pos) {
            let isTwo = Math.floor(Math.random() * 2);
            table[Math.floor(p / 5)][p % 5] = (i++ === start_pos.size - 1) ? 4 : 2;
        }
        drawTable(table);
    }

    const retry = () => {
        init();
        start();
    }
    
    const startBtn = $("#startBtn");
    const retryBtn = $("#retryBtn");
    const clearBtn = $("#clearBtn");

    startBtn.on("click", () => {
        if(isStart === true) {
            alert("게임 진행중입니다.");
            return;
        }
        start();
    });
    retryBtn.on("click", () => {
        let chk = window.confirm("게임을 다시 시작하겠습니까?");
        if (chk) {
            retry();
        }
    });
    clearBtn.on("click", () => {
        init();
        isStart = false;
    });
    
    init();
});