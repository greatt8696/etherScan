// [min, max, skew]
const NAME = "equipNft";

// [min, max, skew]
const ABILITY = {
  attack: [15, 300, 5],
  magic_attack: [15, 300, 5],
  hp: [15, 300, 5],
};

const MIN_MAX = [0, 0];
Object.keys(ABILITY).forEach((label) => (MIN_MAX[0] += ABILITY[label][0]));
Object.keys(ABILITY).forEach((label) => (MIN_MAX[1] += ABILITY[label][1]));
const BACKGROUND = [
  "white",
  "red",
  "yellow",
  "green",
  "orange",
  "purple",
  "gray",
  "blue",
];

module.exports = { NAME, ABILITY, BACKGROUND, MIN_MAX };
