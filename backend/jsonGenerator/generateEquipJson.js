const fs = require("fs");
const path = require("path");
const { NAME, ABILITY, BACKGROUND } = require("../nftAssets/equipNft");
const abilityLabels = Object.keys(ABILITY);
const makeImageDir = (nftName, metaOrImage) =>
  path.resolve("nftAssets", nftName, metaOrImage);
const meatadataDir = makeImageDir("equipNft", "metadata");
const imageDir = makeImageDir("equipNft", "image");
const originalDir = makeImageDir("equipNft", "original");

const BACTCHSIZE = 100;
/**
    {
      "name": "#0",
      "description": "죠르디는 귀엽다?",
      "external_url": "http://192.168.0.116/metadata/0",
      "image": "http://192.168.0.116/images/0",
      "attributes": [
        { "trait_type": "gender", "value": "male" },
        { "trait_type": "level", "value": "Legendary" },
        { "display_type": "number", "trait_type": "attack", "value": 0 },         50  ~ 500
        { "display_type": "number", "trait_type": "defence", "value": 0 },        30  ~ 300
        { "display_type": "number", "trait_type": "magic_attack", "value": 0 },   50  ~ 500
        { "display_type": "number", "trait_type": "magic_defence", "value": 0 },  30  ~ 300
        { "display_type": "number", "trait_type": "speed", "value": 0 },          1   ~ 22
        { "display_type": "number", "trait_type": "hp", "value": 0 },             100 ~ 800 
        { "trait_type": "base_color", "value": "white" }
      ]
    }
 */

const makeName = (name) => ({ name: `#${name}` });
const makeDescription = (description) => ({ description: `${description}` });
const makeExternalUrl = (id) =>
  `http://192.168.0.116:3000/nft/${NAME}/metadata/${id}`;

const makeImageUrl = (id) =>
  `http://192.168.0.116:3000/nft/${NAME}/image/${id}`;

const getImagesList = (dir) => fs.readdirSync(dir);

const randomChoice = (inputArr) => {
  const arrSize = inputArr.length;
  const randIdx = Math.random() * arrSize;
  const toInt = parseInt(randIdx);
  return inputArr[toInt];
};

const partsOfAttributes = ({ trait_type, value, isNumber = false }) => {
  const parts = {};
  parts["trait_type"] = trait_type;
  parts["value"] = value;
  if (isNumber) parts["display_type"] = "number";
  return parts;
};

const makeAttributes = (attributes) => {
  return { attributes: attributes };
};

const makeBaseColor = (base_color) => {
  return { trait_type: "base_color", value: base_color };
};

const makeFace = (face) => {
  return { trait_type: "face", value: face };
};

const makeDeviation = (min, max, skew = 9, notFloat = true) => {
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

function equipNftMinting(startIdx, mintingSize) {
  mintingSize = parseInt(mintingSize);
  const uris = [];
  const abilities = Array(parseInt(mintingSize))
    .fill(false)
    .map(() => {
      const abilities = abilityLabels.map((label) => {
        const [min, max, skew] = ABILITY[label];
        const input = {
          trait_type: label,
          value: makeDeviation(min, max, skew),
          isNumber: true,
        };
        return partsOfAttributes(input);
      });
      return abilities;
    });

  console.log("abilities@@@@@@@@@@", abilities);
  const addedAbilities = abilities.map((ability) => [
    ...ability,
    makeBaseColor(randomChoice(BACKGROUND)),
    // makeFace(randomChoice(FACE)),
  ]);

  const metadata = (startIdx, mintingSize) =>
    Array(mintingSize)
      .fill(false)
      .map((_, idx) => {
        const paddingIdx = startIdx + idx;
        const test = {
          ...makeName(paddingIdx),
          ...makeDescription(`#${paddingIdx}의 테스트 내용입니댜-`),
          externalUrl: makeExternalUrl(paddingIdx),
          image: makeImageUrl(randomChoice(getImagesList(originalDir))),
          ...makeAttributes(addedAbilities[idx]),
        };
        return test;
      });

  metadata(startIdx, mintingSize).forEach((metadata, idx) => {
    const paddingIdx = startIdx + idx;
    const metadataToJson = JSON.stringify(metadata);
    const dir = path.resolve(meatadataDir, `${paddingIdx}.json`);
    uris.push(dir);
    fs.writeFileSync(dir, metadataToJson);
    // console.log(paddingIdx, metadata, uris, idx);
    if (paddingIdx % 10 === 0)
      console.log(
        `JSON : ${paddingIdx}개/${BACTCHSIZE}개`,
        parseInt((paddingIdx / BACTCHSIZE) * 100),
        "%"
      );
  });

  return { lastIdx: startIdx + mintingSize, uris: uris };
}

module.exports = { equipNftMinting };
