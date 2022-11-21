import { Matrix } from "./matrix.js";
import { Signal } from "./signal.js";

const createSignal = ({
  forexPairKey,
  orderTypeKey,
  priceStartOfficial,
  priceStartUser,
}) => {
  const officialMatrix = new Matrix({
    forexPairKey,
    priceStart: priceStartOfficial,
    orderTypeKey,
  });
  const userMatrix = new Matrix({
    forexPairKey,
    priceStart: priceStartUser,
    orderTypeKey,
  });
  const signal = new Signal({ officialMatrix, userMatrix });
  return signal;
};

const signal = createSignal({
  forexPairKey: "c",
  priceStartOfficial: 0.73133,
  priceStartUser: 0.73386,
  orderTypeKey: "b",
  time: "11/14/2022",
});

signal.officialMatrix.orders[1].price = 72834;
signal.officialMatrix.orders[2].price = 72394;
signal.officialMatrix.orders[3].price = 72139;
signal.officialMatrix.orders[4].price = 71835;
signal.officialMatrix.orders[5].price = 71227;
signal.officialMatrix.orders[6].price = 70967;
signal.officialMatrix.orders[7].price = 70720;
signal.officialMatrix.orders[8].price = 71000;

signal.userMatrix.orders[1].price = 73180;
signal.userMatrix.orders[2].price = 72928;
signal.userMatrix.orders[3].price = 72678;
signal.userMatrix.orders[4].price = 72427;
signal.userMatrix.orders[5].price = 72178;
signal.userMatrix.orders[6].price = 71928;
signal.userMatrix.orders[7].price = 71677;
signal.userMatrix.orders[8].price = 71419;
signal.userMatrix.orders[9].price = 71177;
signal.userMatrix.orders[10].price = 70923;

// console.log(signal.officialMatrix);
// console.log(signal.userMatrix);
// console.log("price end", signal.officialMatrix.calculatePriceEnd());
// console.log("price end", signal.userMatrix.calculatePriceEnd());

// signal.userMatrix.orders.splice(5, 3);
// signal.userMatrix.orders.splice(0, 2);

// console.log("price end", signal.userMatrix.calculatePriceEnd());
// console.log(neededMatrix);

// average pair rate 0.85 ~ 1.0
//
// margin = (pair rate * lot units for pair) / leverage (i.e 100) = 1450
// margin level = ((balance / (losses or profit or same thing?)) / margin) * 100
const pairRateEstimate = 1.0;
const lotUnitsEstimate = 145000; // 145 micros -> 14.5 minis -> 1.45 lots
const leverage = 100;
const margin = (pairRateEstimate * lotUnitsEstimate) / 100;
// console.log("pairRateEstimate", pairRateEstimate);
// console.log("lotUnitsEstimate", lotUnitsEstimate);
// console.log(
//   "lotUnitsEstimate * pairRateEstimate",
//   lotUnitsEstimate * pairRateEstimate
// );

const balance = 18417;
const losses = 900;

const marginLevel = ((balance - losses) * 100) / margin;
// console.log("margin", margin);
// console.log("marginLevel", marginLevel);

// (size of a single pip value / currency rate) * lot size
const pipValue = (0.0001 / 0.73386) * 6000; // I think this is correct
console.log("pipValue", pipValue);
console.log("pipValue", pipValue * 221); // single pip value * pipSumForOrder = total profit (this can be negative, which would be it's loss)

// total profit steps:
// add lot size to orders class DONE
// calculate profit for each order in matrix class. for this loop you will need to pass the current price or use the predicted closing price and find the pip diff for order. Then use the pipValue formula to get the profit amount (this might be another property in the orders class)
// sum profit to get each total profit in matrix class

signal.userMatrix.calculateCurrent(71342);
console.log(signal.userMatrix.orders);
