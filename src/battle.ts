import { Character, Enemy, Loot } from "./models/types";
import anime from '../js/anime.es.js';
import animations from "./services/animService.js";


const player: Character = JSON.parse(localStorage.getItem('character') as string) as Character;
let enemy: Enemy = JSON.parse(localStorage.getItem('enemy') as string) as Enemy;
let isProcessingMoves = false;

window.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    if(!enemy)
        enemy = await GetEnemy() as Enemy;
    SetupPlayerCard();
    SetupEnemyCard();
    SetupPlayerButtons();
    SetupResultButtons();
    setTimeout(() => {
        (document.querySelector('#gameContainer') as HTMLElement).classList.add('game-container--active');
    },500);
});


const GetEnemy = async (): Promise<Enemy | null> => {
    const response = await fetch('https://0rqex4xui0.execute-api.eu-north-1.amazonaws.com/enemy');
    
    if(response.ok){
        const data = await response.json() as Enemy;
        localStorage.setItem('enemy', JSON.stringify(data));
        return data;
    }
    else{
        return null;
    }
 }
const attackCircleAnimation = anime({ //Dessa 2 vet jag inte hur jag får "inte any", så jag hoppas jag inte blir bannad för det :((
    targets:`#attackCircle`,
    duration:10000,
    rotate:'360deg',
    easing:'linear',
    loop:true,
    autoplay:false,
});
const defenseCircleAnimation = anime({
    targets:`#defendCircle`,
    duration:10000,
    rotate:'360deg',
    easing:'linear',
    loop:true,
    autoplay:false,
});

const SetupPlayerCard = (): void => {
    if(!player){
        localStorage.removeItem('game-state');
        localStorage.removeItem('char-list-data');
        document.location.href = 'game.html';
    };
    
    (document.querySelector('#playerName') as HTMLElement).textContent = player.name;
    (document.querySelector('#playerImg') as HTMLImageElement).src = player.img;
    
    if(!localStorage.getItem('player-hp'))
        localStorage.setItem('player-hp', player.hp.toString());

    (document.querySelector('#hp') as HTMLElement).textContent = `${localStorage.getItem('player-hp')}/${player.hp.toString()}`;
    (document.querySelector('#str') as HTMLElement).textContent = player.strength.toString();
    (document.querySelector('#def') as HTMLElement).textContent = player.defense.toString();
    (document.querySelector('#spd') as HTMLElement).textContent = player.speed.toString();

}

const SetupEnemyCard = (): void => {
    (document.querySelector('#enemyName') as HTMLElement).textContent = enemy.name;
    (document.querySelector('#enemyImg') as HTMLImageElement).src = enemy.img;

    if(!localStorage.getItem('enemy-hp'))
        localStorage.setItem('enemy-hp', enemy.hp.toString());
    (document.querySelector('#enemyHealth') as HTMLElement).textContent = `${localStorage.getItem('enemy-hp')}/${enemy.hp.toString()}`;
    (document.querySelector('#enemyHealthBar') as HTMLElement).style.width = `${Number(localStorage.getItem('enemy-hp')) / enemy.hp*100}%`;
}

const SetupPlayerButtons = (): void => {

    const attackBtnRef = document.querySelector('#attackBtn') as HTMLElement;
    const defendBtnRef = document.querySelector('#defendBtn') as HTMLElement;
    attackBtnRef.addEventListener('mouseover', () : void => {
        if(!isProcessingMoves){
            attackCircleAnimation.play();
            animations.battlePage.buttons.mouseover(attackBtnRef);
        }
    });
    attackBtnRef.addEventListener('mouseout', () : void => {
        if(!isProcessingMoves){
            attackCircleAnimation.pause();
            animations.battlePage.buttons.mouseout(attackBtnRef);
        }
    });

    attackBtnRef.addEventListener('click', async (event: MouseEvent): Promise<void>  => GameLoop(event));
    defendBtnRef.addEventListener('click', async (event: MouseEvent): Promise<void>  => GameLoop(event));

    defendBtnRef.addEventListener('mouseover', () : void => {
        if(!isProcessingMoves){
            defenseCircleAnimation.play();
            animations.battlePage.buttons.mouseover(defendBtnRef);
        }
        
    });
    defendBtnRef.addEventListener('mouseout', () : void => {
        if(!isProcessingMoves){
            defenseCircleAnimation.pause();
            animations.battlePage.buttons.mouseout(defendBtnRef);

        }
        
    });
}

const SetupResultButtons = () : void => {
    (document.querySelector('#btnGoFurther') as HTMLElement)?.addEventListener('click', () : void => {
        localStorage.removeItem('enemy');
        localStorage.removeItem('enemy-hp');
        localStorage.setItem('game-state', 'ongoing');
        document.location.reload();
    });   
    (document.querySelector('#btnRestart') as HTMLElement)?.addEventListener('click', () : void => {
        localStorage.clear();
        document.location.href = '/';
    });   
    (document.querySelector('#btnTryAgain') as HTMLElement)?.addEventListener('click', () : void => {
        localStorage.setItem('game-state', 'game');
        localStorage.removeItem('enemy');
        localStorage.removeItem('enemy-hp');
        localStorage.removeItem('player-hp');
        document.location.href = 'game.html';
    });   
}

const GameLoop = async (event: MouseEvent) : Promise<void> => {
    //Stoppa inputs
    const id:string  = (event.currentTarget as HTMLElement).id;
    isProcessingMoves = true;
    attackCircleAnimation.pause();
    defenseCircleAnimation.pause();
    document.querySelectorAll('.btn').forEach((btn) : void => {
        btn.classList.toggle('btn--inactive');
    });
    


    anime({
        targets:`#${id}`,
        duration:500,
        scale:1,
        backgroundColor:'rgba(255,255,255,0)',
    });

    //Utför kalkyl

    const combatLogRef: HTMLElement = document.querySelector('#combatLog') as HTMLElement;
    const playerLogElement: HTMLParagraphElement = document.createElement('p');
    const enemyLogElement: HTMLParagraphElement = document.createElement('p');
    let playerHp: number = 0;
    let enemyHp: number = 0; 
    if(id === 'attackBtn'){

        const playerDmg = Math.floor(Math.random() * ((player.strength * (player.speed/2)) - enemy.defense)) + 1 > 0 ? Math.floor(Math.random() * ((player.strength * (player.speed/2)) - enemy.defense)) + 1 : 0;
        const enemyDmg = Math.floor(Math.random() * ((enemy.strength  * (enemy.agility)) - player.defense)) + 1 > 0 ? Math.floor(Math.random() * ((enemy.strength  * (enemy.agility)) - player.defense)) + 1 : 0;

        console.log(playerDmg, enemyDmg);
        playerHp = Number(localStorage.getItem('player-hp')) - enemyDmg;
        enemyHp = Number(localStorage.getItem('enemy-hp')) - playerDmg;
        localStorage.setItem('player-hp', String(playerHp));
        localStorage.setItem('enemy-hp', String(enemyHp));

        //Uppdatera UI
        
        playerLogElement.textContent = `You hit the ${enemy.name} for ${playerDmg} hp.`;
        enemyLogElement.textContent = `the ${enemy.name} hit you for ${enemyDmg} hp.`;
        combatLogRef.append(playerLogElement, enemyLogElement);

        
    }
    if(id === 'defendBtn'){
        const playerDmg = 0;
        const enemyDmg = Math.floor(Math.random() * ((enemy.strength  * (enemy.agility)) - player.defense*1.5)) + 1 > 0 ? Math.floor(Math.random() * ((enemy.strength  * (enemy.agility)) - player.defense)) + 1 : 0;

        console.log(playerDmg, enemyDmg);
        playerHp = Number(localStorage.getItem('player-hp')) - enemyDmg;
        enemyHp = Number(localStorage.getItem('enemy-hp')) - playerDmg;
        localStorage.setItem('player-hp', String(playerHp));
        localStorage.setItem('enemy-hp', String(enemyHp));

        //Uppdatera UI
        
        playerLogElement.textContent = `You shield yourself.`;
        enemyLogElement.textContent = `the ${enemy.name} hit you for ${enemyDmg} hp.`;
        combatLogRef.append(playerLogElement, enemyLogElement);

        }
        let isGameOver = false;
        
    if(playerHp <= 0){
        playerLogElement.textContent = `You lost.`;
        combatLogRef.append(playerLogElement);
        localStorage.setItem('game-state', 'lost');
        anime({
            targets:'#playerCard',
            opacity: 0,
            duration:1000,
            easing:'easeInOutSine',
            
        });
        isGameOver = true;
    }

    else if(enemyHp <= 0){
        playerLogElement.textContent = `You won.`;
        combatLogRef.append(playerLogElement);
        const loot: Loot[] = await GetLoot(enemy.id) as Loot[];
        const lootListRef = document.querySelector('#lootList') as HTMLUListElement;
        if(loot.length > 0){
            loot.forEach(x => {
                const itemElement =document.createElement('li');
                itemElement.textContent = `${x.amount}x ${x.item.type}`;
                lootListRef.append(itemElement);
            });
        }
        else{
            const itemElement =document.createElement('li');
            itemElement.textContent = `Nothing, sorry.`;
            lootListRef.append(itemElement);
        }

        localStorage.setItem('game-state', 'won');
        anime({
            targets:'#enemyCard',
            opacity: 0,
            duration:1000,
            easing:'easeInOutSine',
        });
        isGameOver = true;
    }
    
    if(isGameOver){
        setTimeout(() : void => {
            (document.querySelector('#resultsContainer') as HTMLElement).classList.toggle('results-container--inactive');
            
        }, 1000);
        setTimeout(() : void => {
            const item = localStorage.getItem('game-state');
            (document.querySelector(`#${item === 'won' ? 'won' : 'lost'}`) as HTMLElement)?.classList.toggle('results--inactive');
            (document.querySelector(`#pageBg`) as HTMLImageElement).classList.toggle('results-bg--inactive');
        },1550);
    }
    

    (document.querySelector('#enemyHealthBar') as HTMLElement).style.width = `${enemyHp / enemy.hp*100}%`;
    (document.querySelector('#enemyHealth') as HTMLElement).textContent = `${enemyHp} / ${enemy.hp}`;
    (document.querySelector('#hp') as HTMLElement).textContent = `${playerHp}/${player.hp.toString()}`;


    
    setTimeout(() : void => {
        isProcessingMoves = false;
        document.querySelectorAll('.btn').forEach((btn) : void => {
            btn.classList.toggle('btn--inactive');
        });
    },1000);
}

const GetLoot = async (enemyId:number) : Promise<Loot[] | null> => {
    const response: Response = await fetch(`https://0rqex4xui0.execute-api.eu-north-1.amazonaws.com/loot/${enemyId}`);
    if(response.ok){
        const data: Loot[] = await response.json();
        console.log(data);
        return data;
    }
    return null;
}