import anime from '../../js/anime.es.js';

const logoAnimations = {
    longAnim: () : void => anime({
        targets:'#gameLogo',    
        translateY:'10.5rem',
        translateX:'10.5rem',
        
        duration:1000,
        easing:"easeInOutQuad",
        delay:250,
    })
}

const titleAnimations = {
    
    longAnim: () : void => anime({
        targets:'#title',
        easing:'easeInOutSine',
        keyframes:[
            {
                translateY:'30vh',
                opacity: 0,
                delay:250,
            },
            {
                translateY:'30vh',
                opacity: 1,
                delay:250,
                duration:1000,
            },
            {
                translateY:0,
                duration:1500,
                easing:'easeInOutSine',
            }
        ],
    }),
    shortAnim: () : void => anime({
        targets:'#title',
        easing:'easeInOutSine',
        keyframes:[
            {
                translateY:'-10vh',
                opacity: 0,
                delay:250,

            },
            {
                translateY:0,
                opacity: 1,
                duration:500,
            }
        ],
    }),
}

const introPageAnimations = {
    longAnim: () : void => anime({
        targets:'#introMessage',
        easing:'easeInOutSine',
        keyframes:[
            {
                opacity:0,
                rotateY:'90deg',
                duration:50,
            },
            {
                opacity:1,
                rotateY:'0deg',
                duration:1000,
            }
        ],
        delay:2400
    }),
    shortAnim: () : void => anime({
        targets:'#introMessage',
        easing:'easeInOutSine',
        keyframes:[
            {
                opacity:0,
                rotateY:'90deg',
                duration:50,
            },
            {
                opacity:1,
                rotateY:'0deg',
                duration:1000,
            }
        ],
        delay:450
    }),
    open: () : void => anime({
        targets:'#introMessage',
        easing:'easeInOutSine',
        keyframes:[
            {
                opacity:0,
                rotateY:'90deg',
                duration:50,
            },
            {
                opacity:1,
                rotateY:'0deg',
                duration:1000,
            }
        ],
        delay:250,
    }),
    close: () : void => anime({
        targets:'#introMessage',
        easing:'easeInOutSine',
        opacity:0,
        rotateY:'90deg',
        duration:1000,
    }),
    
}
const descriptionAnimations= {
    shortAnim: () : void => anime({
        targets:'#descriptionMessage',
        easing:'easeInOutSine',
        keyframes:[
            {
                opacity:0,
                rotateY:'90deg',
                duration:50,
            },
            {
                opacity:1,
                rotateY:'0deg',
                duration:1000,
            }
        ],
        delay:450
    }),
    open: () : void => anime({
        targets:'#descriptionMessage',
        easing:'easeInOutSine',
        keyframes:[
            {
                opacity:0,
                rotateY:'90deg',
                duration:50,
            },
            {
                opacity:1,
                rotateY:'0deg',
                duration:1000,
            }
        ],
        delay:250,
    }),
    close: () : void => anime({
        targets:'#descriptionMessage',
        easing:'easeInOutSine',
        opacity:0,
        rotateY:'90deg',
        duration:1000,
        
    }),
}

const gameInProgressAnimations = {
    shortAnim: () : void => anime({
        targets:'#gameInProgressMessage',
        easing:'easeInOutSine',
        keyframes:[
            {
                opacity:0,
                rotateY:'90deg',
                duration:50,
            },
            {
                opacity:1,
                rotateY:'0deg',
                duration:1000,
            }
        ],
        delay:450
    }),
    open: () : void => anime({
        targets:'#gameInProgressMessage',
        easing:'easeInOutSine',
        keyframes:[
            {
                opacity:0,
                rotateY:'90deg',
                duration:50,
            },
            {
                opacity:1,
                rotateY:'0deg',
                duration:1000,
            }
        ],
        delay:250,
    }),
    close: () : void => anime({
        targets:'#gameInProgressMessage',
        easing:'easeInOutSine',
        opacity:0,
        rotateY:'90deg',
        duration:1000,
    }),
}

const pageAnimations = {
    intro: introPageAnimations,
    description: descriptionAnimations,
    gameInProgress: gameInProgressAnimations
}

const cardAnimations = {
    mouseover: (card: Element) : void => anime({
        targets:card,
        scale:1.05,
        duration:500
    }),
    mouseout: (card: Element) : void => anime({
        targets:card,
        scale:1,
        duration:500
        }),
    inactivateLastCard: (card: Element, cardInnerId: string) : void => {
        anime({
            targets:`#${cardInnerId}`,
            translateY:'0rem',
            translateX: '0rem',
            easing: 'easeOutSine',
            rotateY: '0deg',
        });
        anime({
            targets:card,
            scale:1,
            duration:500
        });
    },
    activateCard: (cardInnerId: string) : void => {
        anime({
            targets: `#${cardInnerId}`,
            translateY: '-30rem',
            translateX: cardInnerId === 'firstCardInner' ? '2rem' : cardInnerId === 'secondCardInner' ? '-15.5rem' : '-32rem',
            rotateY: '180deg',
            duration:500,
            easing: 'easeOutSine',
        });
    }
}

const gameContainerAnimations = {
    longAnim: () : void => anime({
        targets:'#gameContainer',
        duration:1000,
        delay:250,
        keyframes:[
            {
                top:0,
            },
            {
                scale:1.15
            }
        ],
        easing:'easeInOutQuad',
    }),
    close: () : void => anime({
        targets: '#gameContainer',
        opacity:0,
        duration:1000,
        easing:'easeInOutQuad',
    })
}
const charStartButtonAnimations = {
    mouseout: () : void => {
        anime({
            targets:'.start-btn--active',
            scale:1,
            translateY: 0,
        });
        anime({
            targets:'.start-btn--active #startText',
            translateY: '-3rem',
            opacity:0,
        });
    },
    mouseover: () : void => {
        anime({
            targets:'.start-btn--active',
            scale:1.3,
            translateY: '-1.5rem',
        });
        anime({
            targets:'.start-btn--active #startText',
            translateY: 0,
            opacity:1,
        });
    },
    activate: () : void => {
        anime({
            targets:'#start',
            duration:250,
            backgroundColor:'rgba(255,255,255, 0.3)',
            easing:'easeOutSine',
        });
        anime({
            targets:'#start',
            keyframes:[
                {
                    'box-shadow': '0 0 10px 2px white',
                },
                {
                    'box-shadow': '0 0 10px 10px white',
                },
            ],
            duration:1500,
            loop:true,
            direction:'alternate',
            easing:'easeOutSine',
        })
        anime({
            targets:'#startCircle',
            duration:10000,
            rotate:'360deg',
            easing:'linear',
            loop:true,
        });
    }
}

const charButtonAnimations = {
    start: charStartButtonAnimations,

}

const statsTableAnimations = {
    toggle: () : void => {
        anime({
            targets:'.character__stats-table',
            keyframes:[
                {
                    opacity:0,
                    duration:200,
                    easing:'easeOutSine',
                },{
                    opacity:1,
                    duration:200,
                    delay:100,
                    easing:'easeOutSine',
                }
            ]

        });
    }
}

const characterPageAnimations = {
    buttons: charButtonAnimations,
    cards: cardAnimations,
    statsTable: statsTableAnimations,
    gameContainer: gameContainerAnimations,
}

const indexPageAnimations = {
    pages: pageAnimations,

}

const battleAttackButtonAnimations = {
    
}

const battleButtonAnimations = {
    
    mouseover: (btnRef: Element) : void => {
        anime({
            targets:btnRef,
            duration:500,
            scale:1.2,
            backgroundColor:'rgba(255,255,255,.5)',
        })
    },
    mouseout: (btnRef: Element) : void => {
        anime({
            targets:btnRef,
            duration:500,
            scale:1,
            backgroundColor:'rgba(255,255,255,0)',
        })
    },
}

const battlePageAnimations = {
    buttons: battleButtonAnimations,
}

const animations = {
    characterPage: characterPageAnimations,
    indexPage: indexPageAnimations,
    battlePage: battlePageAnimations,
    logo: logoAnimations,
    title: titleAnimations,
}


export default animations;