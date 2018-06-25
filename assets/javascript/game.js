$(document).ready(() => {

    let obi = new Player('obi', 120, 10, 10, false);
    let luke = new Player('luke', 100, 14, 7, false);
    let sidious = new Player('sidious', 150, 4.5, 13, false);
    let maul = new Player('maul', 180, 2.5, 16, false);
    let player1;
    let currentEnemy;
    let enemiesDefeated = 0;
    let attackIteration = 1;
    let dmgFactor = [];
    let themeMusic = new Audio('./assets/sounds/theme.mp3');
    let obiSelect = new Audio('./assets/sounds/obi.mp3');
    let lukeSelect = new Audio('./assets/sounds/luke.mp3');
    let sidiousSelect = new Audio('./assets/sounds/sidious.mp3');
    let maulSelect = new Audio('./assets/sounds/maul.mp3');
    let lsOn = new Audio('./assets/sounds/light-saber-on.mp3');


    // This short section of code had to be written to defeat Chrome's user interaction requirement to have autoplay functionality.
    /////////////////////////////////////////////////////////////////////////////////////////

    document.addEventListener('keyup', function (event) {
        themeMusic.play();
    });

    var myInterval = (Math.floor(Math.random() * 100) + 100);
    
    setTimeout(() => {
        var evt1 = new KeyboardEvent('keydown', { 'keyCode': 32, 'which': 32 });
        document.dispatchEvent(evt1);

        var evt2 = new KeyboardEvent('keyup', { 'keyCode': 32, 'which': 32 });
        document.dispatchEvent(evt2);

    }, myInterval);

    /////////////////////////////////////////////////////////////////////////////////////////

    themeMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    $('#char1').hide();
    $('#char2').hide();
    $('#char3').hide();
    $('#char4').hide();
    $('#csChar').hide();

    $('#em1').hide();
    $('#em2').hide();
    $('#em3').hide();
    $('#em4').hide();
    $('#csEnmy').hide();

    $('#def1').hide();
    $('#def2').hide();
    $('#def3').hide();
    $('#def4').hide();
    $('#def').hide();

    $('.attack').hide();
    $('.win').hide();
    $('.lose').hide();

    $('.attack').click(() => {
        attack(player1, currentEnemy);
    });

    $('.start').click(() => {

        themeMusic.pause();
        themeMusic.currentTime = 0;
        enemiesDefeated = 0;
        obi.wp = false;
        luke.wp = false;
        sidious.wp = false;
        maul.wp = false;
        obi.hp = 120;
        luke.hp = 100;
        sidious.hp = 150;
        maul.hp = 180;
        obi.ap = 10;
        luke.ap = 14;
        sidious.ap = 4.5;
        maul.ap = 2.5;
        attackIteration = 1;
        player1 = '';
        currentEnemy = '';
        dmgFactor = [];

        $('.hp1').html(120);
        $('.hp2').html(100);
        $('.hp3').html(150);
        $('.hp4').html(180);

        $('.win').hide();
        $('.lose').hide();
        $('.start').hide();

        $('#char1').show();
        $('#char2').show();
        $('#char3').show();
        $('#char4').show();
        $('#csChar').show();

        $('#char1').click(() => {
            if (player1 === '') {
                $('#char2').hide();
                $('#char3').hide();
                $('#char4').hide();
                $('#em2').show();
                $('#em3').show();
                $('#em4').show();
                $('#csChar').hide();
                $('#csEnmy').show();

                player1 = obi;
                obi.wp = true;
                obiSelect.play();
            }
        });

        $('#char2').click(() => {
            if (player1 === '') {
                $('#char1').hide();
                $('#char3').hide();
                $('#char4').hide();
                $('#em1').show();
                $('#em3').show();
                $('#em4').show();
                $('#csChar').hide();
                $('#csEnmy').show();

                player1 = luke;
                luke.wp = true;
                lukeSelect.play();
            }
        });

        $('#char3').click(() => {
            if (player1 === '') {
                $('#char2').hide();
                $('#char1').hide();
                $('#char4').hide();
                $('#em2').show();
                $('#em1').show();
                $('#em4').show();
                $('#csChar').hide();
                $('#csEnmy').show();

                player1 = sidious;
                sidious.wp = true;
                sidiousSelect.play();
            }
        });

        $('#char4').click(() => {
            if (player1 === '') {
                $('#char2').hide();
                $('#char3').hide();
                $('#char1').hide();
                $('#em2').show();
                $('#em3').show();
                $('#em1').show();
                $('#csChar').hide();
                $('#csEnmy').show();

                player1 = maul;
                maul.wp = true;
                maulSelect.play();
            }
        });

        $('#em1').click(() => {
            $('#em1').hide();
            $('#em2').hide();
            $('#em3').hide();
            $('#em4').hide();
            $('#def1').show();
            $('#def').show();
            $('.attack').show();
            $('#csEnmy').hide();

            obi.wp = true;
            currentEnemy = obi;
            obiSelect.play();
        });

        $('#em2').click(() => {
            $('#em1').hide();
            $('#em2').hide();
            $('#em3').hide();
            $('#em4').hide();
            $('#def2').show();
            $('#def').show();
            $('.attack').show();
            $('#csEnmy').hide();

            luke.wp = true;
            currentEnemy = luke;
            lukeSelect.play();
        });

        $('#em3').click(() => {
            $('#em1').hide();
            $('#em2').hide();
            $('#em3').hide();
            $('#em4').hide();
            $('#def3').show();
            $('#def').show();
            $('.attack').show();
            $('#csEnmy').hide();

            sidious.wp = true;
            currentEnemy = sidious;
            sidiousSelect.play();
        });

        $('#em4').click(() => {
            $('#em1').hide();
            $('#em2').hide();
            $('#em3').hide();
            $('#em4').hide();
            $('#def4').show();
            $('#def').show();
            $('.attack').show();
            $('#csEnmy').hide();
            maul.wp = true;
            currentEnemy = maul;
            maulSelect.play();
        });



    });

    function attack(p1, cEnmy) {

        lsOn.play();
        dmgFactor.push(p1.ap);
        cEnmy.hp -= p1.ap;
        p1.hp -= cEnmy.cap;
        p1.ap += dmgFactor[0];

        switch (p1.nm) {
            case 'obi':
                $('.hp1').html(p1.hp.toFixed());
                break;
            case 'luke':
                $('.hp2').html(p1.hp.toFixed());
                break;
            case 'sidious':
                $('.hp3').html(p1.hp.toFixed());
                break;
            case 'maul':
                $('.hp4').html(p1.hp.toFixed());
                break;
        }
        switch (cEnmy.nm) {
            case 'obi':
                $('.hp1').html(cEnmy.hp.toFixed());
                break;
            case 'luke':
                $('.hp2').html(cEnmy.hp.toFixed());
                break;
            case 'sidious':
                $('.hp3').html(cEnmy.hp.toFixed());
                break;
            case 'maul':
                $('.hp4').html(cEnmy.hp.toFixed());
        }

        if (cEnmy.hp <= 0) {
            enemyDefeated();
            enemiesDefeated++;

            if (enemiesDefeated === 3 && p1.hp > 0) {
                win();
            } else {

                $('#csEnmy').show();
                $('.attack').hide();
                switch (cEnmy.nm) {
                    case 'obi':
                        $('#def1').hide();
                        $('#def').hide();
                        break;
                    case 'luke':
                        $('#def2').hide();
                        $('#def').hide();
                        break;
                    case 'sidious':
                        $('#def3').hide();
                        $('#def').hide();
                        break;
                    case 'maul':
                        $('#def4').hide();
                        $('#def').hide();
                        break;
                }
                if (!obi.wp) {
                    $('#em1').show();
                }
                if (!luke.wp) {
                    $('#em2').show();
                }
                if (!sidious.wp) {
                    $('#em3').show();
                }
                if (!maul.wp) {
                    $('#em4').show();
                }
            }
        }
        if (p1.hp <= 0) {
            lose();
        }
    }

    function enemyDefeated() {
        $('.message').show();
        $('.message').html('Enemy Defeated!!!');
        $('.message').css('background', '#ffffff');
        setTimeout(() => {
            $('.message').hide();
        }, 1500);
    }

    function lose() {
        $('#def').hide();
        $('#def1').hide();
        $('#def2').hide();
        $('#def3').hide();
        $('#def4').hide();
        $('#em1').hide();
        $('#em2').hide();
        $('#em3').hide();
        $('#em4').hide();
        $('.attack').hide();
        $('#csEnmy').hide();
        $('.lose').html('Game Over');
        $('.lose').show();
        $('.start').show();
    }

    function win() {
        $('#def').hide();
        $('#def1').hide();
        $('#def2').hide();
        $('#def3').hide();
        $('#def4').hide();
        $('.attack').hide();
        $('#csEnmy').hide();
        $('.win').html('You win!!!');
        $('.win').show();
        $('.start').show();
    }

    function Player(name, healthPoints, attackPower, ctrAttackPower, wasPicked) {
        this.nm = name;
        this.hp = healthPoints;
        this.ap = attackPower;
        this.cap = ctrAttackPower;
        this.wp = false;
    }
});