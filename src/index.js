//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
const STEP = 5;
const STEP_AIM = 9;

let catOpt;
let aimOpt;
let cat;
let aim;

let mousePositionX = 0;
let mousePositionY = 0;
let lastAimPositionX = 0;
// let this.lifeOfcat = 3;
let lastAimPositionY = 0;
let shot = 0;
let run;



function endBtn() {
    document.location = 'menu.html';
}


/*function listerr() {
    brn2 = document.getElementById('exit');
    brn2.addEventListener('click', endBtn);
}*/


class Cat {

    constructor(life) {
        this.lifeOfCat = life;
    }
    
    startCatPos() {

        this.lastCatPositionX = size[1]/2-catOpt.width/2;
        this.lastCatPositionY = size[0]/2-catOpt.height/2;
    
        cat.style.left = `${this.lastCatPositionX}px`;//Позиция от левого края поля
        cat.style.top = `${this.lastCatPositionY}px`;
    }

    //ЕГО МОЖНО ПОДСТРЕЛИТЬ
    hit() {
        shots();
        if (isReadyToHit()) {
            switch (--this.lifeOfCat) {
                case 2:
                    document.getElementById('heart3').src = `${document.getElementsByTagName('script')[0].src.slice(0, -8)}photo/deadHeart.png`;
                    break;
                case 1:
                    document.getElementById('heart2').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
                    break;
                case 0:
                    document.getElementById('heart1').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
                    break;
                default:
                    break;
            }
        }
    }

    //ОН УМЕЕТ БЕГАТЬ
    run() {

        //Новые пути
        let newPathX = getRandomInt();
        let newPathY = getRandomInt();
        //Следующая позиция
        // let time = 0;

        for (let time = 0; time < 300; time+=50) {

            //Передвижение
            setTimeout(() => {
                let newCatPositionX = this.lastCatPositionX + newPathX;
                let newCatPositionY = this.lastCatPositionY + newPathY;
  //granicy
                while (newCatPositionX < 0 || newCatPositionX > size[1] - catOpt.width) {
                    newPathX = getRandomInt();
                    newCatPositionX = this.lastCatPositionX + newPathX;
                }
                
                while (newCatPositionY < 0 || newCatPositionY > size[0] - catOpt.height) {
                    newPathY = getRandomInt();
                    newCatPositionY = this.lastCatPositionY + newPathY;
                }

                cat.style.left = `${newCatPositionX}px`;
                cat.style.top = `${newCatPositionY}px`;

                this.lastCatPositionX = newCatPositionX;
                this.lastCatPositionY = newCatPositionY;
                
                catOpt = cat.getBoundingClientRect();
            }, time);
        }      
    }

    //ОН УМЕЕТ УМИРАТЬоз
    isDead() {
        if (this.lifeOfCat <= 0) {
            return true;
        } 
    }
}

//СОЗДАЮ ЭКЗМЕПЛЯР ПЕРСОНАЖА
let onlyCat = new Cat(3);

//GAME

function GameStart() {
    if (onlyCat.isDead()) {
        GameStop();
        return;
    }
    onlyCat.run();
}


function GameStop() {
    clearInterval(run);
    document.getElementById('field').removeEventListener("click", shots);
    document.getElementById('field').removeEventListener("keydown", keyboardControl);
    document.getElementById('field').removeEventListener("click", aimHIT);

    document.getElementById('catIMG').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/ghost.gif`;
    document.getElementById('life').innerHTML = 'GAME OVER!';
    getRestart();
}

function getRestart() {
    let resDiv = document.createElement('div');
    resDiv.id = 'restart';
    resDiv.style.width = '300px'
    resDiv.style.margin = '5vh auto';
    resDiv.style.textAlign = 'center';
    resDiv.style.fontSize = '30px';
    resDiv.style.color = 'white';
    let resDivText = document.createElement('p');
    resDivText.innerHTML = 'Restart Game!' 
    resDivText.style.cursor = 'pointer';
    resDivText.id = 'restartText';

    document.body.appendChild(resDiv);
    document.getElementById('restart').appendChild(resDivText);
    document.getElementById('restartText').addEventListener('click', restart);
}



//НОВЫЙ ПУТЬ

function getRandomInt() {
    let nextPos = [-STEP, 0, STEP];
    return nextPos[Math.floor(Math.random() * 3)];
}

//ГОТОВНОСТЬ К УДАРУ

function isReadyToHit() {
    
    return aimOpt.left > catOpt.left - aimOpt.width/2 &&
    aimOpt.right < catOpt.right + aimOpt.width/2 &&
    aimOpt.top > catOpt.top - aimOpt.height/2 &&
    aimOpt.bottom < catOpt.bottom + aimOpt.height/2;
}

function restart() {
    location.reload();
}

function keyboardControl(event) {

    switch (event.key) {
        case 'w':
        case 'ц':
            aimUP();
            break;
        case 'a':
        case 'ф':
            aimLEFT();
            break;
        case 'd':
        case 'в':
            aimRIGHT();
            break;
        case 's':
        case 'ы':
            aimDOWN();
            break;
        case ' ':
            aimHIT();
            break;
    }
}

function aimUP() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionY - STEP_AIM  > size[3]) {
        lastAimPositionY -= STEP_AIM;
        aim.style.top = `${lastAimPositionY}px`;

    } else if (lastAimPositionY != size[3]) {
        lastAimPositionY = size[3];
        aim.style.top = `${lastAimPositionY}px`;
    }
}

function aimLEFT() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionX - STEP_AIM > size[2]) {
        lastAimPositionX -= STEP_AIM;
        aim.style.left = `${lastAimPositionX}px`;
    } else if (lastAimPositionX != size[2]) {
        lastAimPositionX = size[2];
        aim.style.left = `${lastAimPositionX}px`;
    }
}

function aimRIGHT() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionX + STEP_AIM < size[2]+size[1]-aimOpt.width) {
        lastAimPositionX += STEP_AIM;
        aim.style.left = `${lastAimPositionX}px`;
    } else if (lastAimPositionX != size[2]+size[1]) {
        lastAimPositionX = size[2]+size[1];
        aim.style.left = `${lastAimPositionX}px`;
    }
}

function aimDOWN() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionY + STEP_AIM < size[3]+size[0]-aimOpt.height) {
        lastAimPositionY += STEP_AIM;
        aim.style.top = `${lastAimPositionY}px`;
    }  else if (lastAimPositionY != size[3]+size[0]) {
        lastAimPositionY = size[3]+size[0];
        aim.style.top = `${lastAimPositionY}px`;
    }
}

function aimHIT() {
    onlyCat.hit();
}

//Считает количество выстрелов
function shots() {
    if (!onlyCat.isDead()){
        document.getElementById('shotNum').innerHTML = ++shot;
    }
}

//Вычисление позиции курсора
//Курсор вычисляется относительно всего окна
function mousePosition(event) {
    aimOpt = aim.getBoundingClientRect();
    document.getElementById('field').style.cursor = 'none';
    mousePositionX = event.offsetX;
    mousePositionY = event.offsetY;
    lastAimPositionX = mousePositionX+size[2]-aimOpt.width/2;
    lastAimPositionY = mousePositionY+size[3]-aimOpt.height/2;
    aim.style.left = `${lastAimPositionX}px`;
    aim.style.top = `${lastAimPositionY}px`;
}

//Вычисление размера окна
function size() {
    let size2 = document.getElementById('field');
    let height = size2.getBoundingClientRect().height;
    let width = size2.getBoundingClientRect().width;
    let startX = size2.getBoundingClientRect().left;
    let startY = size2.getBoundingClientRect().top;
    let size = [height, width, startX, startY];
    return size;
}



function eventsListeners() {
  

    cat = document.getElementById('cat');
    aim = document.getElementById('aim');
    catOpt = cat.getBoundingClientRect();
    aimOpt = aim.getBoundingClientRect();
    size = size();

    //Ставим начальную позицию 
    onlyCat.startCatPos();
    //Обработка события ОБЯЗАТЕЛЬНО ВНУТРИ ПОЛЯ, иначе будет отсчитывать от всего окна
    //Следим за курсором 
    document.getElementById('field').addEventListener("mousemove", mousePosition);
    //Следим за кликом мышки
    document.getElementById('field').addEventListener('click', aimHIT);
    //Следим за вводом с клавиатуры
    document.addEventListener('keydown', keyboardControl);
    brn2 = document.getElementById('exit');
    brn2.addEventListener('click', endBtn); 
    
    run = setInterval(GameStart, 500);
  

}

document.addEventListener('DOMContentLoaded', eventsListeners);
