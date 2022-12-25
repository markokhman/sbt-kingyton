import { Address, beginCell, Cell, toNano } from "ton";

import qrcode from "qrcode-terminal";

// CONFIG CONSTANTS

const COLLECTION_ADDRESS = Address.parse(
  "kQCcE4A36AzUOGfTYI_-NOxILUImU5T3YNH4ky5IXfsI1ovj"
);

const OWNER_ADDRESS = Address.parse(
  "kQD51fCnbbKyzAfxNF0Bsi4hXZ8JC0Md2-aB9hqo6H5Ymk9w"
);

const RECEIVER_ADDRESS = Address.parse(
  "kQCxLho_ohqvZnMMDxJQ81ngZ4SljtTBJYjswm3ewr-1v4yD"
);

const INDEX = 1;

const METADATA_URL =
  "https://ipfs.io/ipfs/Qmd5YSeFtha7PQpdRoQtWEgmadA7A679DecN2BfweWNXVD?filename=vudi-sbt.json";

// ------------------------

const main = async () => {
  let itemContent = new Cell();
  itemContent.bits.writeBuffer(Buffer.from(METADATA_URL));
  let nftItemMessage = new Cell();
  nftItemMessage.bits.writeAddress(RECEIVER_ADDRESS);
  nftItemMessage.bits.writeAddress(OWNER_ADDRESS);
  nftItemMessage.refs.push(itemContent);

  const msg = beginCell()
    .storeUint(1, 32)
    .storeUint(1, 64)
    .storeUint(INDEX, 64)
    .storeCoins(toNano(0.01))
    .storeRef(nftItemMessage)
    .endCell();

  // flags work only in user-friendly address form
  const collectionAddr = COLLECTION_ADDRESS.toFriendly({
    urlSafe: true,
    bounceable: true,
  });
  // we must convert TON to nanoTON
  const amountToSend = toNano("0.05").toString();
  // BOC means Bag Of Cells here
  const preparedBodyCell = msg.toBoc().toString("base64url");

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
