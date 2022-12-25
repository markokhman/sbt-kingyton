
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
  'te6ccsECEwEAAf4AAA0AEgAXACwAMQA2AE8AaQCNAJIAlwC4AL0AzQDmAWEBdwHMAf4BFP8A9KQT9LzyyAsBAgFiCQICASAEAwAlvILfaiaH0gaZ/qamoYLehqGCxAIBIAgFAgEgBwYALbT0faiaH0gaZ/qamoYCi+CeAI4APgCwAC+12v2omh9IGmf6mpqGDYg6GmH6Yf9IBhAAQ7i10x7UTQ+kDTP9TU1DAQJF8E0NQx1DDQccjLBwHPFszJgCAs0PCgIBIAwLAD1FrwBHAh8AV3gBjIywVYzxZQBPoCE8trEszMyXH7AIAgEgDg0AGz5AHTIywISygfL/8nQgAC0AcjLP/gozxbJcCDIywET9AD0AMsAyYAPr0QY4BIrfAA6GmBgLjYSK3wfSAYAOmP6Z/2omh9IGmf6mpqGEEINJ6cqClAXUcUG6+CgOhBCFRlgFa4QAhkZYKoAueLEn0BCmW1CeWP5Z+A54tkwCB9gHAbKLnjgvlwyJLgAPGBEuABcYEZAmAB8YEvgsIH+XhBIREAAoAfpAMEFEyFAFzxYTyz/MzMzJ7VQApjVwA9QwjjeAQPSWb6UgjikGpCCBAPq+k/LBj96BAZMhoFMlu/L0AvoA1DAiVEsw8AYjupMCpALeBJJsIeKz5jAyUERDE8hQBc8WE8s/zMzMye1UAGA1AtM/UxO78uGSUxO6AfoA1DAoEDRZ8AaOEgGkQ0PIUAXPFhPLP8zMzMntVJJfBeJC5IhA'

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
  'te6ccsECEwEAAzsAAA0AEgAXACgALQA2AD8ARABJAGcAmgD/AYEBkwHcAicCjALvAzsBFP8A9KQT9LzyyAsBAgFiBwICASAEAwAdvH5/gBfCF8IPwh/CJ8I0AgFYBgUADbewfgBfCPAADbVjHgBfCLACAs4LCAIBIAoJADc+Ef4RvhByMs/+EPPFvhEzxbM+EXPFss/ye1UgAGE7UTQ0z8B+GH6QAH4Y3D4YiDXScIAjhZ/+GL6QAH4ZNQB+Gb6QAH4ZdM/MPhnkTDigBL1GwiIMcAkVvgAdDTA/pAMPAC+EKzjhwx+EMBxwXy4ZX6QAH4ZNQB+Gb6QDD4ZXD4Z/AD4ALTHwJxsOMCAdM/ghDQw7/qUjC64wKCEATe0UhSMLrjAjCCEC/LJqJSILqBIREAwD+o5AMfhByMv/+EPPFoAQcIIQi3cXNUAVUEQDgEADyMsfEss/IW6zkwHPF5Ex4slxBcjLBVAEzxZY+gITy2rMyQH7AOCCEB8EU3pSILrjAoIQb4n141Iguo4WW/hFAccF8uGR+EfAAPLhk/gj+GfwA+CCENE207NSILrjAjAxDw4NACCCEF/MPRS6k/LBnd6ED/LwAI4x+EQixwXy4ZGCCvrwgHD7AoAQcIIQ1TJ22xAkVQJtgwYDyMsfEss/IW6zkwHPF5Ex4slxBcjLBVAEzxZY+gITy2rMyQH7AACSMfhEIscF8uGRgBBwghDVMnbbECRVAm2DBgPIyx8Syz8hbrOTAc8XkTHiyXEFyMsFUATPFlj6AhPLaszJAfsAiwL4ZIsC+GXwAwDGMvhEUAPHBfLhkfpA1NMAMPhH+EHIy//4RM8WE8wSyz9SEMsAAcMAlPhGAczegBB4sXCCEAUkx65AVQOAQAPIyx8Syz8hbrOTAc8XkTHiyXEFyMsFUATPFlj6AhPLaszJAfsAAMJsEvpA1NMAMPhH+EHIy/9QBs8W+ETPFhLMFMs/UjDLAAPDAJb4RlADzALegBB4sXCCEA3WB+NANRSAQAPIyx8Syz8hbrOTAc8XkTHiyXEFyMsFUATPFlj6AhPLaszJAfsAAJQwMdMfghAFJMeuErqOOdM/MIAQ+ERwghDBjobSVQNtgEADyMsfEss/IW6zkwHPF5Ex4slxBcjLBVAEzxZY+gITy2rMyQH7AJEw4lXQM08='

export const VudiNewYearItemCodeCell = Cell.fromBoc(
  Buffer.from(VudiNewYearItemCodeBoc, "base64")
)[0];
