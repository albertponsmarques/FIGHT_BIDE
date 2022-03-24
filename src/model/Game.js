

export default class Game {
  constructor(id, name, scheduled, equip_local, equip_visitant, punts_local, punts_visitant, torneig){
    this.id = id; 
    this.name = name;
    this.scheduled = scheduled;
    this.equip_local = equip_local;
    this.equip_visitant = equip_visitant;
    this.punts_local = punts_local;
    this.punts_visitant = punts_visitant;
    this.torneig = torneig;
  }
}