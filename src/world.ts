export type World ={
  name: string ,
  logo: string ,
  money: number,
  score: number,
  totalangels: number,
  activeangels: number,
  angelbonus: number,
  lastupdate: string ,
  products: Product[],
  allunlocks: Pallier[],
  upgrades: Pallier[],
  angelupgrades: Pallier[],
  managers: Pallier[],
 
}

export type Product= {
  id: number,
  name: string ,
  logo: string ,
  cout: number,
  croissance: number,
  revenu: number,
  vitesse: number,
  quantite: number,
  timeleft: number,
  lastupdate: number,
  managerUnlocked: boolean,
  palliers: Pallier[],

}

export type Pallier ={
  name: string ,
  logo: string ,
  seuil: number,
  idcible: number,
  ratio: number,
  typeratio: string ,
  unlocked: boolean,
}

