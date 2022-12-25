import {
  Address,
  beginCell,
  Cell,
  contractAddress,
  StateInit,
  toNano,
} from "ton";
import {
  VudiNewYearCollectionCodeCell,
  VudiNewYearItemCodeCell,
} from "./VudiNewYear.source";
import qs from "qs";
import qrcode from "qrcode-terminal";
import { SmartContract } from "ton-contract-executor";
import BN from "bn.js";
import { OperationCodes } from "./NftJettonFixpriceSaleV1.data";

const OFF_CHAIN_CONTENT_PREFIX = 0x01;

function bufferToChunks(buff: Buffer, chunkSize: number) {
  let chunks: Buffer[] = [];
  while (buff.byteLength > 0) {
    chunks.push(buff.slice(0, chunkSize));
    buff = buff.slice(chunkSize);
  }
  return chunks;
}

export function makeSnakeCell(data: Buffer) {
  let chunks = bufferToChunks(data, 127);
  let rootCell = new Cell();
  let curCell = rootCell;

  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];

    curCell.bits.writeBuffer(chunk);

    if (chunks[i + 1]) {
      let nextCell = new Cell();
      curCell.refs.push(nextCell);
      curCell = nextCell;
    }
  }

  return rootCell;
}

export function encodeOffChainContent(content: string) {
  let data = Buffer.from(content);
  let offChainPrefix = Buffer.from([OFF_CHAIN_CONTENT_PREFIX]);
  data = Buffer.concat([offChainPrefix, data]);
  return makeSnakeCell(data);
}

export function buildNftCollectionDataCell(data: any) {
  let dataCell = new Cell();

  dataCell.bits.writeAddress(data.ownerAddress);
  dataCell.bits.writeUint(data.nextItemIndex, 64);

  let contentCell = new Cell();

  let collectionContent = encodeOffChainContent(data.collectionContent);

  let commonContent = new Cell();
  commonContent.bits.writeBuffer(Buffer.from(data.commonContent));
  // commonContent.bits.writeString(data.commonContent)

  contentCell.refs.push(collectionContent);
  contentCell.refs.push(commonContent);
  dataCell.refs.push(contentCell);

  dataCell.refs.push(data.nftItemCode);

  let royaltyCell = new Cell();
  royaltyCell.bits.writeUint(data.royaltyParams.royaltyFactor, 16);
  royaltyCell.bits.writeUint(data.royaltyParams.royaltyBase, 16);
  royaltyCell.bits.writeAddress(data.royaltyParams.royaltyAddress);
  dataCell.refs.push(royaltyCell);

  return dataCell;
}

const main = async () => {
  const OWNER_ADDRESS = Address.parse(
    "kQCxLho_ohqvZnMMDxJQ81ngZ4SljtTBJYjswm3ewr-1v4yD"
  );

  const collectionCode = VudiNewYearCollectionCodeCell;
  const itemCode = VudiNewYearItemCodeCell;

  const defaultConfig = {
    ownerAddress: Address.parse(
      "kQCxLho_ohqvZnMMDxJQ81ngZ4SljtTBJYjswm3ewr-1v4yD"
    ),
    nextItemIndex: 1,
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

  // TEST---------------------

  // const contract = await SmartContract.fromCell(collectionCode, data);

  // contract.setC7Config({
  //   myself: address,
  // });

  // const metadata = await contract.invokeGetMethod("get_collection_data", []);

  // console.log(metadata);

  // DEPLOY-----------------------------

  // // Prepare init message
  // const initCell = new Cell();
  // new StateInit({
  //   code: collectionCode,
  //   data: data,
  // }).writeTo(initCell);

  // // Encode link to deploy contract
  // let link =
  //   "https://test.tonhub.com/transfer/" +
  //   address.toFriendly({ testOnly: true }) +
  //   "?" +
  //   qs.stringify({
  //     text: "Deploy contract",
  //     amount: toNano(1).toString(10),
  //     init: initCell.toBoc({ idx: false }).toString("base64"),
  //   });
  // console.log("Address: " + address.toFriendly({ testOnly: true }));

  // qrcode.generate(link, { small: true }, (code) => {
  //   console.log(code);
  // });

  // MINT NFT

  let itemContent = new Cell();
  itemContent.bits.writeBuffer(
    Buffer.from(
      "https://ipfs.io/ipfs/Qmd5YSeFtha7PQpdRoQtWEgmadA7A679DecN2BfweWNXVD?filename=vudi-sbt.json"
    )
  );

  let nftItemMessage = new Cell();
  nftItemMessage.bits.writeAddress(
    Address.parse("kQAjEDWLmnEXHFYfRsj6xeL0E5dC47UriJGJ2txA18OYWwO_")
  );
  nftItemMessage.bits.writeAddress(
    Address.parse("kQAjEDWLmnEXHFYfRsj6xeL0E5dC47UriJGJ2txA18OYWwO_")
  );
  nftItemMessage.refs.push(itemContent);

  const msg = beginCell()
    .storeUint(1, 32)
    .storeUint(1, 64)
    .storeUint(2, 64)
    .storeCoins(toNano(0.01))
    .storeRef(nftItemMessage)
    .endCell();

  // flags work only in user-friendly address form
  const collectionAddr = address.toFriendly({
    urlSafe: true,
    bounceable: true,
  });
  // we must convert TON to nanoTON
  const amountToSend = toNano("0.05").toString();
  // BOC means Bag Of Cells here
  const preparedBodyCell = msg.toBoc().toString("base64url");

  // console.log(msg);

  // final method to build a payment url
  const tonDeepLink = (address: string, amount: string, body: string) => {
    return `ton://transfer/${address}?amount=${amount}&bin=${body}`;
  };

  const link = tonDeepLink(collectionAddr, amountToSend, preparedBodyCell);

  qrcode.generate(link, { small: true }, (code) => {
    console.log(code);
  });
};

main();
