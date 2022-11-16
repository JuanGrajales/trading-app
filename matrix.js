import { Order } from "./order.js";
export class Matrix {
  constructor({
    forexPairKey,
    orderType = "sell",
    pipStartPriceAdjustment = false,
    priceStart,
    user = "Bydzyne",
    targetPips = 20,
  }) {
    const priceStartFormatted = Math.round(priceStart * 100000);
    this.closeLevel = 0;
    this.forexPair = this.findForexPair(forexPairKey);
    this.isOfficialMatrix = user = "Bydzyne" ? true : false;
    this.orders = this.createOrders(priceStartFormatted, orderType, targetPips);
    this.orderType = orderType;
    this.pipStartPriceAdjustment = pipStartPriceAdjustment;
    this.pipSum = 0;
    this.priceEnd = 0;
    this.priceEndEstimate = 0;
    this.priceMax = 0;
    this.priceMin = 0;
    this.priceStart = priceStartFormatted;
    this.timeEnd = "";
    this.timeStart = new Date();
    this.user = user;
    // In the future, perhaps we can keep track of how many times the price hits each level. So if touches level 2 twice then we want to know. This means we can maybe create a strategy for closing multiple times with the same signal
  }

  createOrders(priceStart, orderType, targetPips) {
    const pipDiff = 250;

    return [...new Array(9)].map((el, index) => {
      const orderPrice =
        orderType === "sell"
          ? priceStart + pipDiff * index
          : priceStart - pipDiff * index;
      return new Order({
        price: orderPrice,
        priceStart,
        level: index,
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
}
