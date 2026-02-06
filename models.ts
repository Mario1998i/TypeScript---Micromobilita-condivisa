import { ICitta, IMezzo, IUtente, MetodoPagamento, StatoMezzo, TipoMezzo } from "./interfaces";

export class Mezzo implements IMezzo {
    private id: string;
    private tipo: TipoMezzo;
    private stato: StatoMezzo;
    private utenteAssegnato: IUtente | null;

    constructor(id: string, tipo: TipoMezzo) {
        this.id = id;
        this.tipo = tipo;
        this.stato = "disponibile";
        this.utenteAssegnato = null;
    }

    assegnaUtente(utente: IUtente): void {
        if(this.stato === "in_uso") {
            throw new Error("Mezzo già in uso.");
        }
        this.utenteAssegnato = utente;
        this.stato = "in_uso";
    }

    liberaMezzo(): void {
        if(this.stato === "disponibile") {
            throw new Error("Mezzo già disponibile")
        }
        this.utenteAssegnato = null;
        this.stato = "disponibile";
    }

    isDisponibile(): boolean {
        return this.stato === "disponibile";
    }

    toString(): string {
        return `Mezzo ${this.id} (${this.tipo}) - stato: ${this.stato}`;
    }
}

export class Utente implements IUtente {
    private nome: string;
    private cognome: string;
    private email: string;
    private metodoPagamento: MetodoPagamento;
    
    constructor(nome: string, cognome: string, email: string, metodoPagamento: MetodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        if(!email.includes("@")) {
            throw new Error("Email non valida.");
        }
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }

    prenotaMezzo(mezzo: IMezzo): void {
        mezzo.assegnaUtente(this);
    }
}

export class Citta implements ICitta {
    public nome: string;
    private mezzi: IMezzo[];

    constructor(nome: string) {
        this.nome = nome;
        this.mezzi = [];
    };

    aggiungiMezzo(mezzo: IMezzo): void {
        this.mezzi.push(mezzo);
    };

    getMezziDisponibili(): IMezzo[] {
        return this.mezzi.filter(
            mezzo => mezzo.isDisponibile());
    }

    stampaStatoMezzi(): void {
        console.log(`Città: ${this.nome}`);
        this.mezzi.forEach(mezzo => {
            console.log(mezzo.toString());
        });
    }
}