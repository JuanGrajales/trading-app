import { Order } from "./order.js";
export class Matrix {
  constructor({
    forexPairKey,
    orderTypeKey = "s",
    // pipStartPriceAdjustment = false,
    priceStart,
    targetPips = 200,
    user = "Bydzyne",
  }) {
    const priceStartFormatted = Math.round(priceStart * 100000);
    const orderType = orderTypeKey === "s" ? "sell" : "buy";

    // this.closeLevel = 0;
    this.forexPair = this.findForexPair(forexPairKey);
    this.isOfficialMatrix = user = "Bydzyne" ? true : false;
    this.orders = this.createOrders(priceStartFormatted, orderType, targetPips);
    this.orderType = orderType;
    // this.pipStartPriceAdjustment = pipStartPriceAdjustment;
    // this.pipSum = 0;
    // this.priceEnd = 0;
    // this.priceEndEstimate = 0;
    // this.priceMax = 0;
    // this.priceMin = 0;
    this.priceStart = priceStartFormatted;
    this.targetPips = targetPips;
    // this.timeEnd = "";
    // this.timeStart = new Date();
    this.user = user;
    // In the future, perhaps we can keep track of how many times the price hits each level. So if touches level 2 twice then we want to know. This means we can maybe create a strategy for closing multiple times with the same signal
  }

  calculatePriceEnd() {
    const lastOrderPrice = this.orders[this.orders.length - 1].price;
    const pipSum = this.orders.reduce((accum, curr) => {
      const pipDifference = Math.abs(curr.price - lastOrderPrice);
      return accum + pipDifference;
    }, 0);

    let pipSumAverage = pipSum / this.orders.length;
    let targetPipAverage = this.targetPips / this.orders.length;

    pipSumAverage = this.orderType === "sell" ? -pipSumAverage : pipSumAverage;
    targetPipAverage =
      this.orderType === "sell" ? -targetPipAverage : targetPipAverage;

    return Math.round(lastOrderPrice + pipSumAverage + targetPipAverage);
  }

  calculateCurrent() {
    const lastOrderPrice = this.orders[this.orders.length - 1].price;
    const pipSum = this.orders.reduce((accum, curr) => {
      const pipDifference = Math.abs(curr.price - lastOrderPrice);
      return accum + pipDifference;
    }, 0);

    let pipSumAverage = pipSum / this.orders.length;
    let targetPipAverage = this.targetPips / this.orders.length;

    pipSumAverage = this.orderType === "sell" ? -pipSumAverage : pipSumAverage;
    targetPipAverage =
      this.orderType === "sell" ? -targetPipAverage : targetPipAverage;

    return Math.round(lastOrderPrice + pipSumAverage + targetPipAverage);
  }

  createOrders(priceStart, orderType, targetPips) {
    const pipDiff = 250;

    return [...new Array(9)].map((el, index) => {
      const orderPrice =
        orderType === "sell"
          ? priceStart + pipDiff * index
          : priceStart - pipDiff * index;

      const lotSize = this.getOrderLotSize(index);

      return new Order({
        level: index,
        lotSize,
        orderType,
        price: orderPrice,
        priceStart,
        targetPips,
      });
    });
  }

  findForexPair(forexPairKey) {
    const forexPairs = {
      e: "EURUSD",
      a: "AUDCAD",
      u: "USDCAD",
      n: "NZDCAD",
      c: "CADCHF",
    };
    return forexPairs[forexPairKey];
  }

  getOrderLotSize(orderIndex, levelsPerIncrease = 4) {
    switch (Math.floor(orderIndex / levelsPerIncrease)) {
      case 2:
        return 8000;
      case 1:
        return 7000;
      default:
        return 6000;
    }
  }
}
