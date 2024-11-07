import { Character } from "./models/types";
import anime from '../js/anime.es.js';
import animations from "./services/animService.js";

let chosenCard: Element | null = null;
let chosenCardInnerId: string = '';
let characterListData: Character[] = [];
let chosenCharacter: Character | null = null;
window.addEventListener('load', () => {

    if(localStorage.getItem('game-state') === 'ongoing')
        document.location.href = 'battle.html';
    FetchData().then(() => {
        SetupEnvironment();
    });
    setTimeout((): void => {
        (document.querySelector('#gameContainer') as HTMLElement).classList.add('game-container--active');
    },500);
});

const FetchData = async (): Promise<void> => {
    if(!localStorage.getItem('char-list-data')){

        const response: Response = await fetch('https://0rqex4xui0.execute-api.eu-north-1.amazonaws.com/character');
        if(response.ok){
            characterListData = await response.json();
            localStorage.setItem('char-list-data', JSON.stringify(characterListData));
        }
    }
    else{
        characterListData = JSON.parse(localStorage.getItem('char-list-data') as string);
    }
}

const SetupEnvironment = async (): Promise<void> => {
    animations.characterPage.gameContainer.longAnim();

    const startBtnRef = document.querySelector('#start') as HTMLElement;
    startBtnRef.addEventListener('mouseover', () => {
        animations.characterPage.buttons.start.mouseover();
    });

    startBtnRef.addEventListener('mouseout', () => {
        animations.characterPage.buttons.start.mouseout();
    });

    startBtnRef.addEventListener('click', () => {
        if(startBtnRef.classList.contains('start-btn--active')){
            localStorage.setItem('character',JSON.stringify(chosenCharacter));
            localStorage.setItem('game-state','ongoing');
            localStorage.removeItem('char-list-data');
            startBtnRef.classList.remove('start-btn--active');

            animations.characterPage.gameContainer.close();
            setTimeout(() => {
                window.location.href = 'battle.html';
            },1200);
        }
    });

    anime({
        targets:'.character-cards-wrapper',
        keyframes:[
            {
                translateY: '-20rem'
            },
        ],
        duration:2500,
        delay:250
    });
    const cardsRef = document.querySelectorAll('.character-card');
    
        cardsRef.forEach((card, index) => {

            (card.querySelector('.character__image') as HTMLImageElement).src = characterListData[index]?.img as string;
            (card.querySelector('.character-name') as HTMLElement).textContent = characterListData[index]?.name as string;
            
    
            card.addEventListener('mouseover', () => {
                if(chosenCard !== card) animations.characterPage.cards.mouseover(card);
            });

            card.addEventListener('mouseout', () => {
                if(chosenCard !== card) animations.characterPage.cards.mouseout(card);
            });

            card.addEventListener('click', () => {
                
                if(chosenCard === null){
                    (document.querySelector('#start') as HTMLElement).classList.add('start-btn--active')
                    animations.characterPage.buttons.start.activate();
                }

                cardsRef.forEach(c => {
                    c.classList.toggle('character-card--inactive');
                    setTimeout(() => {
                        c.classList.toggle('character-card--inactive');
                    }, 750);
                });

                setTimeout(() => {
                    (document.querySelector('.character-cards-wrapper') as HTMLElement).classList.toggle('character-cards-wrapper-inactive');
                }, 500);
                if(chosenCard === card) return
                if(chosenCard !== null){
                    (chosenCard.querySelector('.character-card__inner') as HTMLElement).classList.toggle('character-card__inner--selected');
                    animations.characterPage.cards.inactivateLastCard(card, chosenCardInnerId);

                  
                }
                chosenCard = card;
                chosenCardInnerId = card.firstElementChild?.id as string; 
                animations.characterPage.cards.activateCard(chosenCardInnerId);
                
                (chosenCard.querySelector('.character-card__inner') as HTMLElement).classList.toggle('character-card__inner--selected');

                const statsTableRef: HTMLElement = document.querySelector('.character__stats-table') as HTMLElement;
                animations.characterPage.statsTable.toggle();

                setTimeout(() => {
                   (statsTableRef.querySelector('#hp') as HTMLTableCellElement).innerText = characterListData[index]?.hp.toString() as string;
                   (statsTableRef.querySelector('#str') as HTMLTableCellElement).innerText = characterListData[index]?.strength.toString() as string;
                   (statsTableRef.querySelector('#def') as HTMLTableCellElement).innerText = characterListData[index]?.defense.toString() as string;
                   (statsTableRef.querySelector('#spd') as HTMLTableCellElement).innerText = characterListData[index]?.speed.toString() as string;
                }, 200);
                chosenCharacter = characterListData[index] as Character;
            });
        });
    }

    
    