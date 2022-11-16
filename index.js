import { Matrix } from "./matrix.js";
import { Signal } from "./signal.js";

const createSignal = ({ forexPairKey, priceStart }) => {
  const officialMatrix = new Matrix({
    forexPairKey,
    priceStart,
    orderType: "sell",
  });
  const userMatrix = new Matrix({
    forexPairKey,
    priceStart: 1.32871,
  });
  const signal = new Signal({ officialMatrix, userMatrix });
  return signal;
};

const signal = createSignal({
  forexPairKey: "e",
  priceStart: 1.01656,
});

console.log(signal.officialMatrix);
console.log(signal.userMatrix);

// console.log(neededMatrix);

// average pair rate 0.85 ~ 1.0
//
// margin = (pair rate * lot units for pair) / leverage (i.e 100) = 1450
// margin level = ((balance / losses) / margin) * 100
const pairRateEstimate = 1.0;
const lotUnitsEstimate = 145000; // 145 micros -> 14.5 minis -> 1.45 lots
const leverage = 100;
const margin = (pairRateEstimate * lotUnitsEstimate) / 100;
console.log("pairRateEstimate", pairRateEstimate);
console.log("lotUnitsEstimate", lotUnitsEstimate);
console.log(
  "lotUnitsEstimate * pairRateEstimate",
  lotUnitsEstimate * pairRateEstimate
);

const balance = 18417;
const losses = 900;

const marginLevel = ((balance - losses) * 100) / margin;
console.log("margin", margin);
console.log("marginLevel", marginLevel);

const pipSum = ((10 * (10 + 1)) / 2) * 25;

console.log("pipSum", pipSum);

const pipValue = (0.0001 / 0.88731) * 70000;
console.log("pipValue", pipValue);
console.log("pipValue", pipValue * 1350);
