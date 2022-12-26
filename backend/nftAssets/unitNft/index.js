// [min, max, skew]
const NAME = "unitNft";

const ABILITY = {
  attack: [50, 500, 3],
  defence: [30, 300, 3],
  magic_attack: [50, 500, 3],
  magic_defence: [30, 300, 3],
  speed: [1, 22, 3],
  hp: [100, 500, 3],
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

const FACE = ["smile", "fury", "sad", "mad", "Ggyu"];

module.exports = { NAME, ABILITY, BACKGROUND, FACE, MIN_MAX };
