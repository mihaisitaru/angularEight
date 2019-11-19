export class Ingredient {
  public name: string;
  public amount: number;
  public displayRemoveBtn: boolean;
  public isInShoppingList: boolean;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
    this.displayRemoveBtn = false;
    this.isInShoppingList = false;
  }
}
