import { Cell } from "ton";

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
