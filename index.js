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
  forexPairKey: "e",
  priceStartOfficial: 1.01656,
  priceStartUser: 1.01689,
  orderTypeKey: "s",
  time: "11/14/2022",
});

signal.officialMatrix.orders[1].price = 101935;
signal.officialMatrix.orders[2].price = 102179;
signal.officialMatrix.orders[3].price = 102437;
signal.officialMatrix.orders[4].price = 102700;
signal.officialMatrix.orders[5].price = 102901;
signal.officialMatrix.orders[6].price = 103134;
signal.officialMatrix.orders[7].price = 103388;
signal.officialMatrix.orders[8].price = 103614;

signal.userMatrix.orders[1].price = 101895;
signal.userMatrix.orders[2].price = 102140;
signal.userMatrix.orders[3].price = 102389;
signal.userMatrix.orders[4].price = 102640;
signal.userMatrix.orders[5].price = 102889;
signal.userMatrix.orders[6].price = 103144;
signal.userMatrix.orders[7].price = 103390;
signal.userMatrix.orders[8].price = 103563;

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

// (single pip value / currency rate) * lot size
const pipValue = (0.0001 / 1.0264) * 6500; // I think this is correct
// console.log("pipValue", pipValue);
// console.log("pipValue", pipValue * 1350); // single pip value * pipSumForOrder = total profit (this can be negative, which would be it's loss)

// total profit steps:
// add lot size to orders class DONE
// calculate profit for each order in matrix class. for this loop you will need to pass the current price or use the predicted closing price and find the pip diff for order. Then use the pipValue formula to get the profit amount (this might be another property in the orders class)
// sum profit to get each total profit in matrix class

console.log(signal.officialMatrix.orders);
