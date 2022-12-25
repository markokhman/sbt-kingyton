import { writeFile } from "fs/promises";
import path from "path";
import { Cell } from "ton";
import {
  VudiNewYearCollection,
  VudiNewYearItem,
} from "../src/VudiNewYear.source";
import { compileFunc } from "../src/utils/compileFunc";

const buildCollectionSourceContent = (collection: Cell, item: Cell) => `
import { Cell } from "ton";
import { combineFunc } from "./utils/combineFunc";

export const VudiNewYearCollection = () => {
  return combineFunc(__dirname, [
    "./contract/stdlib.fc",
    "./contract/params.fc",
    "./contract/op-codes.fc",
    "./contract/nft-collection.fc",
  ]);
};

const VudiNewYearCollectionCodeBoc =
  '${collection.toBoc().toString("base64")}'

export const VudiNewYearCollectionCodeCell = Cell.fromBoc(
  Buffer.from(VudiNewYearCollectionCodeBoc, "base64")
)[0];

export const VudiNewYearItem = () => {
  return combineFunc(__dirname, [
    "./contract/stdlib.fc",
    "./contract/params.fc",
    "./contract/op-codes.fc",
    "./contract/sbt-item.fc",
  ]);
};

const VudiNewYearItemCodeBoc =
  '${item.toBoc().toString("base64")}'

export const VudiNewYearItemCodeCell = Cell.fromBoc(
  Buffer.from(VudiNewYearItemCodeBoc, "base64")
)[0];
`;

async function main() {
  let collectionSource = await compileFunc(VudiNewYearCollection());
  let itemSource = await compileFunc(VudiNewYearItem());

  await writeFile(
    path.resolve(__dirname, "../src/VudiNewYear.source.ts"),
    buildCollectionSourceContent(collectionSource.cell, itemSource.cell)
  );
}

main();
