var vm = new Vue({
    el: '.wrapper',
    data: {
        isRunning: false,
        playerBlood: 100,
        monsterBlood: 100,
        logsData: [],
        judgeFlge: false,
    },
    methods: {
        newGame() {
            this.isRunning = false;
            this.playerBlood = 100;
            this.monsterBlood = 100;
            this.logsData = [];
            this.judgeFlge = false;
        },
        attack() {
            if (this.judgeFlge) {
                return false;
            }
            var oRandomPlay = this.createRandom(5, 11);
            this.playerBlood -= oRandomPlay;
            var oRandomMonster = this.createRandom(2, 8);
            this.monsterBlood -= oRandomMonster;
            this.judgement();
            this.pushData(oRandomPlay,oRandomMonster);
        },
        specialAttack() {
            if (this.judgeFlge) {
                return false;
            }
            var oRandomPlay = this.createRandom(2, 8);
            this.playerBlood -= oRandomPlay;
            var oRandomMonster = this.createRandom(6, 11);
            this.monsterBlood -= oRandomMonster;
            this.judgement();
            this.pushData(oRandomPlay,oRandomMonster);
        },
        heal() {
            var oRandomPlay = this.createRandom(1, 6);
            this.playerBlood += oRandomPlay;
            this.judgement();
            if(!(this.playerBlood >= 100)) {
                this.logsData.unshift({
                    log: 'You add ' + oRandomPlay + ' blood',
                    heal: true,
                })
            }
            
        },
        giveUp() {
            this.newGame();
        },
        createRandom(min, max) {
            return Math.floor(Math.max(Math.random() * (++max), min));
        },
        judgement() {
            if (this.playerBlood < 0) {
                this.judgeFlge = true;
                this.playerBlood = 0;
                setTimeout(() => {
                    alert('YOU LOST!');
                    this.newGame();
                }, 500);
                return true;
            } else if (this.playerBlood >= 100) {
                this.playerBlood = 100
            }
            if (this.monsterBlood < 0) {
                this.monsterBlood = 0;
                this.judgeFlge = true;
                setTimeout(() => {
                    alert('YOU WIN!');
                    this.newGame();
                }, 500);
                return true;
            }
        }
        ,pushData(oRandomPlay,oRandomMonster){
            this.logsData.unshift({
                log: 'Monster hit the you ' + oRandomPlay + ' blood',
                bgc: true,
            },
            {
                log: 'You hit the monster ' + oRandomMonster + ' blood',
                bgc: false,
            })
        }
    }
})