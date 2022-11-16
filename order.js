export class Order {
  constructor({ price, priceStart, level, targetPips }) {
    this.price = price;
    this.level = level;
    this.priceEnd = this.calculatePriceEnd(priceStart, targetPips);
    // pips
    // profit
  }
  // (Bottom price * 10) + ((sum of absolute pip amount of each order / number of orders) * 10) +- (((pip target amount / (number of orders / 2)) / 2) * 10)

  calculatePriceEnd(priceStart, targetPips) {
    // const pipSum = [...new Array(this.level + 1)].reduce(
    //   (accum, curr, index) => {
    //     return accum + 25 * index;
    //   },
    //   0
    // );

    // Find pip sum using summation formula to calculate 1 to n
    // n is the number of levels
    const pipSum = ((this.level * (this.level + 1)) / 2) * 25;
    const lastOrderPrice = this.price;
    const pipAverage = (pipSum / (this.level + 1)) * 10;
    // const somePipCalculation = (20 / ((this.level + 1) / 2) / 2) * 10;
    // const somePipCalculation = ((20 * 2) / ((this.level + 1) * 2)) * 10;
    const somePipCalculation = (targetPips / (this.level + 1)) * 10;
    return Math.round(lastOrderPrice + pipAverage + somePipCalculation);
  }
}
