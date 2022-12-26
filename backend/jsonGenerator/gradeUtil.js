const gradeCalc = (RANGE = [1, 1000], number = 500) => {
  const BACTCH_SIZE = 100000;
  const DIVISION = 5000;
  const STEP = RANGE[1] / DIVISION;
  const LEVEL_TABLE = {
    Ggyu: 50,
    Normal: 28,
    Rare: 12,
    Unique: 6.6,
    epic: 2.2,
    Legend: 1,
    Myth: 0.2,
  };

  const makeDeviation = (min, max, skew = 1, notFloat = true) => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-9.0 * Math.log(u)) * Math.cos(9.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = makeDeviation(min, max, skew);
    // resample between 0 and 1 if out of range
    else {
      num = Math.pow(num, skew); // Skew
      num *= max - min; // Stretch to fill range
      num += min; // offset to min
    }
    return notFloat ? parseInt(num) : num;
  };

  const levelStatic = {};

  Object.keys(LEVEL_TABLE).forEach((level) => {
    levelStatic[level] = (BACTCH_SIZE * LEVEL_TABLE[level]) / 100;
  });
  // console.log("levelStatic", levelStatic);

  const notSortedBatch = Array(BACTCH_SIZE)
    .fill(false)
    .map(() => makeDeviation(...RANGE, 5));

  // console.log("notSortedBatch", notSortedBatch);

  const sortedByValue = notSortedBatch.sort((prev, curr) => curr - prev);
  // console.log("sortedByValue", sortedByValue);

  const levelGrade = {};
  Object.keys(LEVEL_TABLE).map((level) => {
    const upperIdx = LEVEL_TABLE[level] * 1000;
    levelGrade[level] = sortedByValue[upperIdx];
  });

  // console.log("levelGrid", levelGrade);

  const decideGrade = () => {
    let result = false;
    Object.keys(LEVEL_TABLE).forEach((level) => {
      if (levelGrade[level] < number) result = level;
    });
    // console.log(result);
    return result ? result : Object.keys(LEVEL_TABLE)[0];
  };

  // console.log(decideGrade());

  const 확률 = {};
  Object.keys(LEVEL_TABLE).forEach((level) => {
    확률[level] = ((levelStatic[level] / BACTCH_SIZE) * 100).toFixed(2) + " %";
  });
  // console.log("확률", 확률);

  return decideGrade();
};

module.exports = { gradeCalc };
