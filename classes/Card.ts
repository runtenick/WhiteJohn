class Card {
    value: number;
    suit: string;
    image: string;
  
    constructor(id: number, value: number, suit: string, image: string) {
      this.value = value;
      this.suit = suit;
      this.image = image;
    }

    toObject() {
      return {
        value : this.value, 
        suit : this.suit
      }
    }
}
 