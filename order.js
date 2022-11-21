export class Order {
  constructor({ orderType, price, priceStart, level, targetPips, lotSize }) {
    this.level = level;
    this.lotSize = lotSize;
    this.orderType = orderType;
    this.price = price;
    this.priceEnd = this.calculatePriceEnd(priceStart, targetPips, orderType);
    this.pipDiff = 0;
    this.profit = 0;
    // pips
    // profit
  }
  // (Bottom price * 10) + ((sum of absolute pip amount of each order / number of orders) * 10) +- (((pip target amount / (number of orders / 2)) / 2) * 10)

  calculatePriceEnd(priceStart, targetPips, orderType) {
    const lastOrderPrice = this.price;
    // Find pip sum using summation formula to calculate 1 to n (i.e. number of levels) instead of using a loop
    const pipSum = ((this.level * (this.level + 1)) / 2) * 250;
    let pipSumAverage = pipSum / (this.level + 1);
    let targetPipAverage = targetPips / (this.level + 1);

    pipSumAverage = orderType === "sell" ? -pipSumAverage : pipSumAverage;
    targetPipAverage =
      orderType === "sell" ? -targetPipAverage : targetPipAverage;

    return Math.round(lastOrderPrice + pipSumAverage + targetPipAverage);
  }
}
