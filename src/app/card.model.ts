// card.model.ts
export interface Card {
    name: string;
    [key: string]: any; // Index signature allowing any property
  }
  