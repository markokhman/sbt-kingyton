import { Address, Cell } from "ton";
import { NftJettonFixpriceSaleV1CodeCell } from "./VudiNewYear.source";
import { SmartContract } from "ton-contract-executor";

const NftJettonFixpriceSaleV1CodeCellHash =
  NftJettonFixpriceSaleV1CodeCell.hash();

export async function isNftJettonFixpriceSaleV1Contract(
  address: Address,
  codeCell: Cell,
  _dataCell: Cell
) {
  if (NftJettonFixpriceSaleV1CodeCellHash.equals(codeCell.hash())) {
    return true;
  }
}

export async function isNftJettonFixpriceSaleV1ContractModern(
  contract: SmartContract
) {
  if (NftJettonFixpriceSaleV1CodeCellHash.equals(contract.codeCell.hash())) {
    return true;
  }
}
