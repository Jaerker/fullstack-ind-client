type Character = {
    defense : number,
    gender : string,
    hp : number,
    name : string,
    race : string,
    speed : number,
    strength : number
    img: string,
}


//Enemy types
type Enemy = {
	id: number,
	name: string,
	hp: number,
    maxHp: number,
	agility: number,
	defense: number,
	strength: number,
	speed: number,
	abilities: Ability[],
	exp: 50,
	drops: Drops,
    img: string,
}

type Ability = {
    name: string,
    description: string,
    damage: number,
    effect: Effect
}
type Effect = {
    type: string,
    duration: number
}

type Drops = {
    currency: DroppedItem[],
    consumables: DroppedItem[],
    weapons: DroppedItem[],
    armor: DroppedItem[]
}

type DroppedItem = {
    type: string
    amount: number,
    probability: number
}

//Drop item
type Loot = {
    item: Item,
    amount:number,
}

type Item = {
    type: string,
    value: number,
}

export {Character, Enemy, Loot};

//https://0rqex4xui0.execute-api.eu-north-1.amazonaws.com/loot/:id