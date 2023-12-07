export interface hand {
  id: number;
  cards: string;
  valueCards?: number[];
  sortedCards?: number[];
  bid: number;
  type?: number;
  order?: number;
  points?: number;
}
