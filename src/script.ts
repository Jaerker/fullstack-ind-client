
import animations from './services/animService.js';

window.addEventListener('load', () : void => {

    SetupStartButtons();
    
    switch(localStorage.getItem('game-state')){
        case 'started':
            Setup('second-time');
            (document.querySelector('#introMessage') as HTMLElement).classList.toggle('page-message--inactive');

        break;
        case 'game':
            document.location.href = 'pages/game.html';
        break;
        case 'ongoing':
            Setup('ongoing');
            console.log('wohoo');
            (document.querySelector('#gameInProgressMessage') as HTMLElement).classList.toggle('page-message--inactive');
        break;

        default:
            Setup('first-time');
            (document.querySelector('#introMessage') as HTMLElement).classList.toggle('page-message--inactive');
    }
});

const Setup = (pageId: string): void => {
    switch(pageId){
        case 'first-time':
            document.querySelector('#title')?.classList.toggle('main-page-title--first-time');
            animations.title.longAnim();
            animations.indexPage.pages.intro.longAnim();
        break;
        case 'second-time':
            animations.title.shortAnim();
            animations.indexPage.pages.intro.shortAnim();
        break;

        case 'ongoing':
            animations.title.shortAnim();
            animations.indexPage.pages.gameInProgress.shortAnim();
        default:
            
        break;
    }

    SetupStartButtons();
    
}

const SetupStartButtons = () : void => {
    const btnGotItRef: HTMLButtonElement = document.querySelector('#btnGotIt') as HTMLButtonElement;

    const btnYesRef: HTMLButtonElement = document.querySelector('#btnYes') as HTMLButtonElement;
    const btnNoRef: HTMLButtonElement = document.querySelector('#btnNo') as HTMLButtonElement;

    const btnContinueRef: HTMLButtonElement = document.querySelector('#btnContinue') as HTMLButtonElement;
    const btnNewRef: HTMLButtonElement = document.querySelector('#btnNew') as HTMLButtonElement;


    btnNoRef.addEventListener('click', (): void => {
        animations.indexPage.pages.intro.close();
        animations.indexPage.pages.description.open();
       
        (document.querySelector('#descriptionMessage') as HTMLElement).classList.remove('page-message--inactive');
        (document.querySelector('#introMessage') as HTMLElement).classList.add('page-message--inactive');

    });

    btnGotItRef.addEventListener('click',  (): void => {
        animations.indexPage.pages.description.close();
        localStorage.setItem('game-state', 'game');
            setTimeout((): void => {
                document.location.href = 'pages/game.html';
            }, 1200);
    });


    btnYesRef.addEventListener('click',  (): void => {
        animations.indexPage.pages.intro.close();
        (document.querySelector('#introMessage') as HTMLElement).classList.add('page-message--inactive');
        localStorage.setItem('game-state', 'game');
        setTimeout((): void => {
            document.location.href = 'pages/game.html';
        }, 1200);
    });


    btnContinueRef.addEventListener('click',   (): void => {
        animations.indexPage.pages.gameInProgress.close();
        (document.querySelector('#gameInProgressMessage') as HTMLElement).classList.add('page-message--inactive');
        setTimeout((): void => {
            document.location.href = 'pages/battle.html';
        }, 1200);
    });

    
    btnNewRef.addEventListener('click', (): void => {
        animations.indexPage.pages.gameInProgress.close();
        (document.querySelector('#gameInProgressMessage') as HTMLElement).classList.add('page-message--inactive');
        localStorage.setItem('game-state', 'game');
        localStorage.removeItem('character');
        localStorage.removeItem('player-hp');
        localStorage.removeItem('enemy-hp');
        localStorage.removeItem('enemy');
        setTimeout((): void => {
            document.location.href = 'pages/game.html';
        }, 1200);
    });

}
