import { Address, Cell, contractAddress, StateInit, toNano } from "ton";
import {
  VudiNewYearCollectionCodeCell,
  VudiNewYearItemCodeCell,
} from "./VudiNewYear.source";
import qrcode from "qrcode-terminal";
import { buildNftCollectionDataCell } from "./VudiUtils";
import qs from "qs";

// CONFIG CONSTANTS

const MODE: "test" | "main" = "test";

const OWNER_ADDRESS = Address.parse(
  "kQD51fCnbbKyzAfxNF0Bsi4hXZ8JC0Md2-aB9hqo6H5Ymk9w"
);

// ------------------------

const main = async () => {
  const collectionCode = VudiNewYearCollectionCodeCell;
  const itemCode = VudiNewYearItemCodeCell;

  const defaultConfig = {
    ownerAddress: OWNER_ADDRESS,
    nextItemIndex: 0,
    collectionContent:
      "https://ipfs.io/ipfs/QmW9boM44rdJCarBDzkEWRB8HSEBFJXjtVQTVggBCJZA11?filename=Vudi_Happy_new_Year.json",
    commonContent: "",
    nftItemCode: itemCode,
    royaltyParams: {
      royaltyFactor: 100,
      royaltyBase: 200,
      royaltyAddress: OWNER_ADDRESS,
    },
  };

  let data = buildNftCollectionDataCell(defaultConfig);

  const address = contractAddress({
    workchain: 0,
    initialCode: collectionCode,
    initialData: data,
  });

  // Prepare init message
  const initCell = new Cell();
  new StateInit({
    code: collectionCode,
    data: data,
  }).writeTo(initCell);

  // Encode link to deploy contract
  let link =
    `https://${MODE === "test" ? "test." : ""}tonhub.com/transfer/` +
    address.toFriendly({ testOnly: true }) +
    "?" +
    qs.stringify({
      text: "Deploy contract",
      amount: toNano(1).toString(10),
      init: initCell.toBoc({ idx: false }).toString("base64"),
    });
  console.log("Address: " + address.toFriendly({ testOnly: true }));
  qrcode.generate(link, { small: true }, (code) => {
    console.log(code);
  });
};

main();
