export interface IMezzo {
    assegnaUtente(utente: IUtente): void,
    liberaMezzo(): void,
    isDisponibile(): boolean;
};

export type TipoMezzo = "bici" | "scooter" | "monopattino";
export type StatoMezzo = "disponibile" | "in_uso";

export interface IUtente {
    prenotaMezzo(mezzo: IMezzo): void,
};

export type MetodoPagamento = "carta" | "paypal" | "apple_pay";

export interface ICitta {
    nome: string,
    aggiungiMezzo(mezzo: IMezzo): void;
    getMezziDisponibili(): IMezzo[];
}