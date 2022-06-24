import { World, Product, Pallier } from "../world"

const pallierInit: Pallier = {
    name: '',
    logo: '',
    seuil: 0,
    idcible: 0,
    ratio: 0,
    typeratio: '',
    unlocked: false,
}

const productInit: Product = {
    id: 0,
    name: '',
    logo: '',
    cout: 0,
    croissance: 0,
    revenu: 0,
    vitesse: 0,
    quantite: 0,
    timeleft: 0,
    lastupdate: 0,
    managerUnlocked: false,
    palliers: [pallierInit],
}

const WorldInit: World = {
    name: '',
    logo: '',
    money: 4,
    score: 0,
    totalangels: 0,
    activeangels: 0,
    angelbonus: 0,
    lastupdate: '',
    products: [productInit],
    allunlocks: [pallierInit],
    upgrades: [pallierInit],
    angelupgrades: [pallierInit],
    managers: [pallierInit],
}

export { WorldInit, productInit, pallierInit }