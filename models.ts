import { ICitta, IMezzo, IUtente, MetodoPagamento, StatoMezzo, TipoMezzo } from "./interfaces";

export class MezzoGiaInUsoError extends Error {
    constructor() {
        super("Mezzo già in uso.");
        this.name = "MezzoGiaInUsoError";
    }
}

export class MezzoGiaDisponibileError extends Error {
    constructor() {
        super("Mezzo già disponibile.");
        this.name = "MezzoGiaDisponibileError";
    }
}

export class EmailNonValidaError extends Error {
    constructor() {
        super("Email non valida.");
        this.name = "EmailNonValidaError";
    }
}

export class CampoNonValidoError extends Error {
    constructor(campo: string) {
        super(`${campo} non valido`);
        this.name = "CampoNonValidoError";
    }
}

export class Validator {
    static validaEmail(email: string): void {
        if (!email.includes("@")) {
            throw new EmailNonValidaError();
        }
    }

    static validaStringaNonVuota(valore: string, campo: string): void {
        if (!valore || valore.trim() === "") {
            throw new CampoNonValidoError(campo);
        }
    }
}

export class Mezzo implements IMezzo {
    private id: string;
    private tipo: TipoMezzo;
    _stato: StatoMezzo;
    _utenteAssegnato: IUtente | null;

    constructor(id: string, tipo: TipoMezzo) {
        Validator.validaStringaNonVuota(id, "ID");
        this.id = id;
        this.tipo = tipo;
        this._stato = "disponibile";
        this._utenteAssegnato = null;
    }

    getId(): string {
        return this.id;
    }

    getTipo(): TipoMezzo {
        return this.tipo;
    }

    assegnaUtente(utente: IUtente): void {
        MezzoService.assegnaUtente(this, utente);  
    }

    liberaMezzo(): void {
        MezzoService.liberaMezzo(this);
    }

    isDisponibile(): boolean {
        return this._stato === "disponibile";
    }

    toString(): string {
        return `Mezzo ${this.id} (${this.tipo}) - stato: ${this._stato}`;
    }
}

export class MezzoService {
    static assegnaUtente(mezzo: Mezzo, utente: IUtente): void {
        if(!mezzo.isDisponibile()) {
            throw new MezzoGiaInUsoError();
        }

        mezzo._utenteAssegnato = utente;
        mezzo._stato = "in_uso";
    }

    static liberaMezzo(mezzo: Mezzo): void {
        if(mezzo.isDisponibile()) {
            throw new MezzoGiaDisponibileError();
        }
        mezzo._utenteAssegnato = null;
        mezzo._stato = "disponibile";
    }
}

export class Utente implements IUtente {
    private nome: string;
    private cognome: string;
    private email: string;
    private metodoPagamento: MetodoPagamento;
    
    constructor(nome: string, cognome: string, email: string, metodoPagamento: MetodoPagamento) {
        Validator.validaStringaNonVuota(nome, "Nome");
        Validator.validaStringaNonVuota(cognome, "Cognome");
        Validator.validaEmail(email);
        this.nome = nome;
        this.cognome = cognome;
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