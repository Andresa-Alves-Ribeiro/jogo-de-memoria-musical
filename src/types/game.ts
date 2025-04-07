export interface Card {
    id: number;
    name: string;
    audio: string;
    image: string;
}

export interface GameState {
    cards: Card[];
    selectedCards: Card[];
    matchedCards: Card[];
    showInstrumentModal: boolean;
    matchedInstrument: Card | null;
} 