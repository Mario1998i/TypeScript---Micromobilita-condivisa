import { Citta, Mezzo, Utente } from "./models.js";

const roma = new Citta("Roma");

const monopattino = new Mezzo("M001", "monopattino");
const scooter = new Mezzo("S001", "scooter");
const bici = new Mezzo("B001", "bici");

roma.aggiungiMezzo(monopattino);
roma.aggiungiMezzo(scooter);
roma.aggiungiMezzo(bici);

const utente1 = new Utente("Luca", "Rossi", "luca@example.com", "paypal");

utente1.prenotaMezzo(monopattino);

roma.stampaStatoMezzi();

