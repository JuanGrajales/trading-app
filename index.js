let AUDCAD = 0.87891 * 100000;
let orderTypeAUDCAD = "buy";
let CADCHF = 0.73405 * 100000;
let orderTypeCADCHF = "buy";
let EURUSD = 0.9936 * 100000;
let orderTypeEURUSD = "sell";
let NZDCAD = 0.80148 * 100000;
let orderTypeNZDCAD = "buy";
let USDCAD = 1.33445 * 100000;
let orderTypeUSDCAD = "sell";
const pipDiff = 250;

// const eurusd = [new Signal]

// {
//   pair: "AUDCAD",
//   startPrice: AUDCAD,
//   orderType: orderTypeAUDCAD,
//   officialMatrix: getMatrixValues({
//     startPrice: AUDCAD,
//     orderType: orderTypeAUDCAD,
//   }),
//   officialClosing: 0,
//   actualMatrix: getMatrixValues({
//     startPrice: AUDCAD,
//     orderType: orderTypeAUDCAD,
//     officialMatrix: false,
//   }),
//   actualClosing: 0,
// },

const getMatrixValues = ({
  startPrice = 0,
  officialMatrix = true,
  orderType,
}) => {
  if (officialMatrix) {
    let startPriceCopy = startPrice;
    return new Array(8).fill(0).map(() => {
      startPriceCopy =
        orderType === "sell"
          ? startPriceCopy + pipDiff
          : startPriceCopy - pipDiff;
      return (startPriceCopy / 100000).toString().padEnd(7, "0");
    });
  } else {
    let adjustedStartPrice =
      orderType === "sell" ? startPrice - 15 : startPrice + 15;
    return new Array(8).fill(0).map((el) => {
      adjustedStartPrice =
        orderType === "sell"
          ? adjustedStartPrice + pipDiff
          : adjustedStartPrice - pipDiff;
      return (adjustedStartPrice / 100000).toString().padEnd(7, "0");
    });
  }
};

const forexPairs = [
  {
    pair: "AUDCAD",
    startPrice: AUDCAD,
    orderType: orderTypeAUDCAD,
    officialMatrix: getMatrixValues({
      startPrice: AUDCAD,
      orderType: orderTypeAUDCAD,
    }),
    officialClosing: 0,
    actualMatrix: getMatrixValues({
      startPrice: AUDCAD,
      orderType: orderTypeAUDCAD,
      officialMatrix: false,
    }),
    actualClosing: 0,
  },
  {
    pair: "CADCHF",
    startPrice: CADCHF,
    orderType: orderTypeCADCHF,
    officialMatrix: getMatrixValues({
      startPrice: CADCHF,
      orderType: orderTypeCADCHF,
    }),
    officialClosing: 0,
    actualMatrix: getMatrixValues({
      startPrice: CADCHF,
      orderType: orderTypeCADCHF,
      officialMatrix: false,
    }),
    actualClosing: 0,
  },
  {
    pair: "EURUSD",
    startPrice: EURUSD,
    orderType: orderTypeEURUSD,
    officialMatrix: getMatrixValues({
      startPrice: EURUSD,
      orderType: orderTypeEURUSD,
    }),
    officialClosing: 0,
    actualMatrix: getMatrixValues({
      startPrice: EURUSD,
      orderType: orderTypeEURUSD,
      officialMatrix: false,
    }),
    actualClosing: 0,
  },
  {
    pair: "NZDCAD",
    startPrice: NZDCAD,
    orderType: orderTypeNZDCAD,
    officialMatrix: getMatrixValues({
      startPrice: NZDCAD,
      orderType: orderTypeNZDCAD,
    }),
    officialClosing: 0,
    actualMatrix: getMatrixValues({
      startPrice: NZDCAD,
      orderType: orderTypeNZDCAD,
      officialMatrix: false,
    }),
    actualClosing: 0,
  },
  {
    pair: "USDCAD",
    startPrice: USDCAD,
    orderType: orderTypeUSDCAD,
    officialMatrix: getMatrixValues({
      startPrice: USDCAD,
      orderType: orderTypeUSDCAD,
    }),
    officialClosing: 0,
    actualMatrix: getMatrixValues({
      startPrice: USDCAD,
      orderType: orderTypeUSDCAD,
      officialMatrix: false,
    }),
    actualClosing: 0,
  },
];

const neededPairs = ["CADCHF", "AUDCAD", "NZDCAD", "USDCAD"];
const neededMatrix = forexPairs.filter(({ pair }) =>
  neededPairs.includes(pair)
);

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
