'use strict';

/**
 * Crown and Anchor game
 * version 0.0.1
 */

(function (global) {

    const buildStyles = function () {
        let style = document.createElement('style');
        style.appendChild(
            document.createTextNode(
                'body {background-color: #4bb260;}'
                + 'table'
                + '{'
                + 'border: 4px solid #6fc280;'
                + 'margin-left: 10%;'
                + 'margin-right: 10%;'
                + 'margin-top: 2%;'
                + 'border-spacing: 0px;'
                + 'float: left;'
                + '}'
                + 'td'
                + '{'
                + 'width: 120px;'
                + 'height: 120px;'
                + 'border: 2px solid rgba(255, 255, 255, 0.2);'
                + 'text-align: center;'
                + 'padding: 0px;'
                + '}'
                + 'td:hover'
                + '{'
                + 'background: rgba(111,245,81, 0.3);'
                + '}'
                + '.icon'
                + '{'
                + 'text-align: center;'
                + 'width: 50%;'
                + 'height: auto;'
                + 'cursor: pointer;'
                + '}'
                + '.bet-info{'
                + 'font-size: 20px;'
                + 'color: #fff7b3;'
                + 'margin-top: 10px;'
                + 'font-weight: 600;'
                + '}'
                + '#balance{'
                + 'font-size: 28px;'
                + 'color: #fff;'
                + 'margin-left: 10%;'
                + 'margin-top: 2%;'
                + 'font-weight: 600;'
                + '}'
                + '#table-random'
                + '{float: none;}'
                + '.random-td{'
                + 'width: 120px;'
                + 'height: 100px;'
                + 'border: 1px solid rgba(255, 255, 255, 0.2);'
                + 'background-color: rgba(255, 255, 255, 0.02);'
                + 'text-align: center;'
                + '}'
                + '.random-td:hover{'
                + 'background-color: rgba(255, 255, 255, 0.02);'
                + '}'
                + '.td-button-table{height: 40px; border: none;}'
                + 'button{'
                + 'padding: 10px 0;'
                + 'width: 100%;'
                + 'height: 100%;'
                + 'background-color: #0e6554;'
                + 'border: none;'
                + 'color: #fff6b8;'
                + 'font-size: 20px;'
                + 'font-weight: 600;'
                + 'font-family: serif;'
                + 'cursor: pointer;'
                + '}'
                + 'button:hover { background-color: #91ca36; color: #0e6554; transition: background-color 0.5s;}'
                + '.random-img'
                + '{'
                + 'text-align: center;'
                + 'width: 50%;'
                + 'height: auto;'
                + '-webkit-transition: background-image 1s ease-in-out;'
                + 'transition: background-image 1s ease-in-out;'
                + '}'
                + '.fill-color'
                + '{'
                + 'background: #376320;'
                + 'opacity: 0.2; transition: opacity 0.5s;'
                + '}'
                + '.text-info-game{'
                + 'width: auto;'
                + 'height: 40px;'
                + 'border: none;'
                + 'text-align: left;'
                + 'padding-left: 20px;'
                + 'font-size: 18px;'
                + 'color: #fff7b3;'
                + 'margin-top: 10px;'
                + 'font-weight: 600;'
                + 'border: 1px solid rgba(255, 255, 255, 0.2);'
                + '}'
            )
        );

        document.getElementsByTagName('head')[0].appendChild(style);
    };

    /**
     * @returns {Element} <div id='board'>...</div>
     */
    const buildView = function () {
        /**
         * @param {String} src
         * @param {String} id
         * @returns {Element}
         */
        let buildIconeButton = function (src, id) {
            let td = document.createElement('td');
            let img = document.createElement('img');
            let bet = document.createElement('div');
            img.setAttribute('src', src);
            img.setAttribute('data-event-handler-name', 'betsOnclick');
            img.setAttribute('id', id);

            img.setAttribute('class', 'icon');
            bet.appendChild(document.createTextNode('0 \u0024'));
            bet.setAttribute('class', 'bet-info');
            td.appendChild(img);
            td.appendChild(bet);
            return td;
        };

        let buildHtmlForRandomIcon = function () {
            let td = document.createElement('td');
            td.setAttribute('class', 'random-td');
            let img = document.createElement('img');
            img.setAttribute('class', 'random-img');
            td.appendChild(img);
            return td;
        };

        let boardWrapperDiv = document.createElement('div');
        boardWrapperDiv.setAttribute('id', 'board');
        boardWrapperDiv.setAttribute('data-event-handler-name', 'board-icons');

        let balanceWrapperDiv = document.createElement('div');
        balanceWrapperDiv.appendChild(document.createTextNode('Your balance: 100 \u0024'));
        balanceWrapperDiv.setAttribute('id', 'balance');

        boardWrapperDiv.appendChild(balanceWrapperDiv);


        let table = document.createElement('table');
        table.setAttribute('id', 'table-board');

        let tr = document.createElement('tr');
        tr.appendChild(buildIconeButton('public/img/crown.svg', 'crown'));
        tr.appendChild(buildIconeButton('public/img/anchor.svg', 'anchor'));
        table.appendChild(tr);

        let tr2 = document.createElement('tr');
        tr2.appendChild(buildIconeButton('public/img/heart.svg', 'heart'));
        tr2.appendChild(buildIconeButton('public/img/spade.svg', 'spade'));
        table.appendChild(tr2);

        let tr3 = document.createElement('tr');
        tr3.appendChild(buildIconeButton('public/img/club.svg', 'club'));
        tr3.appendChild(buildIconeButton('public/img/diamond.svg', 'diamond'));
        table.appendChild(tr3);

        boardWrapperDiv.appendChild(table);


        let table2 = document.createElement('table');
        table2.setAttribute('id', 'table-random');

        let trForTable2 = document.createElement('tr');
        trForTable2.appendChild(buildHtmlForRandomIcon('', ''));
        trForTable2.appendChild(buildHtmlForRandomIcon('', ''));
        trForTable2.appendChild(buildHtmlForRandomIcon('', ''));
        table2.appendChild(trForTable2);

        let trForTable3 = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute('colspan', 3);
        td.setAttribute('class', 'text-info-game');
        td.setAttribute('id', 'round-td-id');
        td.appendChild(document.createTextNode('Round: 1'));
        trForTable3.appendChild(td);
        table2.appendChild(trForTable3);

        let trForTable5 = document.createElement('tr');
        let td3 = document.createElement('td');
        td3.setAttribute('colspan', 3);
        td3.setAttribute('class', 'text-info-game');
        td3.setAttribute('id', 'round-winnings');
        td3.appendChild(document.createTextNode('Your winnings:  0 \u0024'));
        trForTable5.appendChild(td3);

        table2.appendChild(trForTable5);

        let trForTable4 = document.createElement('tr');

        let td2 = document.createElement('td');
        td2.setAttribute('colspan', 3);
        td2.setAttribute('class', 'td-button-table');

        let playbutton = document.createElement('button');
        playbutton.setAttribute('id', 'play-game');
        playbutton.appendChild(document.createTextNode('PLAY'));
        td2.appendChild(playbutton);

        trForTable4.appendChild(td2);

        table2.appendChild(trForTable4);

        boardWrapperDiv.appendChild(table2);

        document.body.appendChild(boardWrapperDiv);

        return boardWrapperDiv;
    };

    /**
     * @param {Element} view <div id='board'>...</div>
     */
    let attachClickEventToViewBoardIcons = function (view) {

        addEventsTd('#board');
        addEventsButton('#play-game');

        function rand(m, n) {
            return m + Math.floor((n - m + 1) * Math.random());
        }

        function randFace() {
            return ( ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond'][rand(0, 5)]);
        }

        class dynamicVariables {
            constructor(){
                this.funds = 100;
                this.bets = {crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0};
                this.game = 1;
                this.round = 1;
            }

            nextGame(){
                this.game++;
                alert(`Start new Game ${this.game}`);
                this.funds = 100;
                this.round = 1;
                gameVariables.showInnerHTML('round-td-id', `Round: ${this.round}`);
                gameVariables.showInnerHTML('balance', `Your balance: ${this.funds} \u0024`);
            }
            nextRound(){
                this.round++;
                gameVariables.showInnerHTML('round-td-id', `Round: ${this.round}`);
            }
            showInnerHTML(id, text)
            {
                document.getElementById(id).innerHTML = text;
            }
        }
        let gameVariables = new dynamicVariables();




        function boardClass(classaction) {
            let boardtd = document.getElementById('table-board').getElementsByTagName('td');
            if(classaction === 'remove') {
                for (let td = 0; td < 6; td++) {
                    boardtd[td].classList.remove('fill-color');}
            }
            else if(classaction === 'add') {
                for (let td = 0; td < 6; td++) {
                    boardtd[td].className = 'fill-color';
                }
            }
        }

        function addEventsTd(element){
            document.querySelector(element).addEventListener('click', function (e)
            {
                if(e.target.tagName === 'IMG' && gameVariables.funds > 0){
                    let face = e.target.id;
                    placeBets(face);
                }

            });
        }


        function addEventsButton(element){
            document.querySelector(element).addEventListener('click', function (e)
            {
                if(true === isBetPlaced()){
                    boardClass('add');
                    throwBones();
                }
            });
        }

        function placeBets(face) {
            let remaining = 10;
            do
            {
                let bet = 10;
                gameVariables.bets[face] = gameVariables.bets[face] + bet;
                remaining = remaining - bet;
                gameVariables.funds = gameVariables.funds - bet;
            }
            while (remaining > 0);
            document.getElementById(face).nextSibling.innerHTML = `${gameVariables.bets[face]} \u0024`;
            gameVariables.showInnerHTML('balance', `Your balance: ${gameVariables.funds} \u0024`);
        }



        function isBetPlaced() {
            for (let bet in gameVariables.bets) {
                if (gameVariables.bets[bet] > 0) {
                    return true;
                }
            }
            alert('Please, plased bets');
            return false;
        }

        function throwBones() {
            let hand = [];
            for (let roll = 0; roll < 3; roll++) {
                hand.push(randFace());
            }

            drawRandomImg(hand);
            showRandomImgOnBoard(hand);
        }

        function showRandomImgOnBoard(hand) {
            for (let roll = 0; roll < 3; roll++) {
                let boardtd = document.getElementById(hand[roll]).parentNode;
                boardtd.classList.remove('fill-color');
            }
        }

        function drawRandomImg(hand) {
            let img = document.getElementsByClassName('random-img');
            for (let roll = 0; roll < 3; roll++) {
                img[roll].src = 'public/img/' + hand[roll] + '.svg';
            }

            gameVariables.funds += calculateWinAmount(hand, gameVariables.bets);
            document.getElementById('balance').innerHTML = `Your balance: ${gameVariables.funds} \u0024`;
            setTimeout(endRaund, 2000);

        }

        function calculateWinAmount(hand, bets) {
            let winnings = 0;
            for (let i = 0; i < hand.length; i++) {
                let face = hand[i];
                if (bets[face] > 0) {
                    winnings = winnings + bets[face];
                }
            }
            document.getElementById('round-winnings').innerHTML = `Your winnings: ${winnings} \u0024`;
            return winnings;
        }

        function endRaund() {
            gameVariables.bets = {crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0};
            gameVariables.nextRound();
            boardClass('remove');
            for (let bet in gameVariables.bets) {
                document.getElementById(bet).nextSibling.innerHTML = '0 \u0024';
            }
            if (gameVariables.funds <= 0) {
                gameVariables.nextGame();
            }
        }

    };


    // Constructor
    function CrownAndAnchorGame() {
        const self = this;
        this.version = '0.0.1';
        this.view = '';
        this.getView = function () {
            return this.view;
        };

        this.init = function () {
            buildStyles();
            self.view = buildView();

            attachClickEventToViewBoardIcons(self.view);
        };
    }



    global.crownAndAnchorGame = new CrownAndAnchorGame();

})(window);



