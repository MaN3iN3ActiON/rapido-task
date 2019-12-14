const { KS_BAT, BAT_LEN: batLen } = require("./constants");

function rule1({ ksBat, afBat, bat }) {
  // RULE #1 : Power rule
  // divide each element by 2
  // do Math.ceil()
  for (let i = 0; i < batLen; i++) {
    afBat[i] = Math.ceil(afBat[i] / 2);
  }
}

function rule2({ ksBat, afBat, bat }) {
  // RULE #2 : Counter first
  for (let i = 0; i < batLen; i++) {
    const af = afBat[i];
    const ks = ksBat[i];
    if (af <= ks) {
      bat[i] = af;
      afBat[i] = 0;
      ksBat[i] -= af;
    } else {
      bat[i] = ks;
      afBat[i] -= ks;
      ksBat[i] = 0;
    }
  }
}

function rule3And4({ ksBat, afBat, bat }) {
  // RULE #3 : Exhaust Substituion
  for (let i = 0; i < batLen; i++) {
    const down = 2 * afBat[i];
    // RULE #4 : Choose lower bats for Substitution
    if (afBat[i] !== 0 && i - 1 >= 0 && ksBat[i - 1] >= 0) {
      const diff = ksBat[i - 1] - down;
      if (diff >= 0) {
        bat[i - 1] += down;
        ksBat[i - 1] -= down;
        afBat[i] = 0;
      } else {
        bat[i - 1] += ksBat[i - 1];
        afBat[i] -= ksBat[i - 1];
        ksBat[i - 1] = 0;
      }
    }

    const up = Math.ceil(afBat[i] / 2);
    if (afBat[i] !== 0 && i + 1 < batLen && ksBat[i + 1] >= 0) {
      const diff = ksBat[i - 1] - up;
      if (diff >= 0) {
        bat[i + 1] += up;
        ksBat[i + 1] -= up;
        afBat[i] = 0;
      } else {
        bat[i + 1] += ksBat[i + 1];
        afBat[i] -= ksBat[i + 1];
        ksBat[i + 1] = 0;
      }
    }
  }
}

function canWin({ afBat }) {
  let canWin = true;
  // every element of afBat must be 0
  for (let i = 0; i < batLen; i++) {
    if (afBat[i] !== 0) {
      canWin = false;
      break;
    }
  }
  return canWin;
}

function batOut(afBatInput) {
  const afBat = Array.from(afBatInput);
  const ksBat = Array.from(KS_BAT);
  const bat = [0, 0, 0, 0];

  rule1({ ksBat, afBat, bat });
  rule2({ ksBat, afBat, bat });
  rule3And4({ ksBat, afBat, bat });

  return {
    bat,
    canWin: canWin({ afBat })
  };
}

module.exports = batOut;
