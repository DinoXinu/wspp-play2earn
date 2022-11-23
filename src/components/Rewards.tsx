import React from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContractRead,
  useMetadata,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

import styles from "../styles/Home.module.css";
import ApproxRewards from "./ApproxRewards";
import { MINING_CONTRACT_ADDRESS } from "../const/contractAddresses";
import Link, { LinkProps } from 'next/link';
import Image from 'next/image'
import bonexx from '/public/gold-gem.png'
import wland from '/public/wlan.png'

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
};

/**
 * This component shows the:
 * - Metadata of the token itself (mainly care about image)
 * - The amount this wallet holds of this wallet
 * - The amount this user can claim from the mining contract
 */
export default function Rewards({ miningContract, tokenContract }: Props) {
  const address = useAddress();

  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);
  const { data: unclaimedAmount } = useContractRead(
    miningContract,
    "calculateRewards",
    address
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>
        Your <b style={{color:"orange"}}>Wolfi Coin's</b>
      </p>
      {tokenMetadata && (
        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={"48"}
        />
      )}
      <p className={styles.noGapBottom}  style={{ color:"yellowgreen"}}>
        Balance : <b style={{ color:"orange"}}>{currentBalance?.displayValue}</b>
      </p>
      <p>Price : <b style={{ color:"orange"}}>1 <span>
       <Image src={bonexx} height="15" width="15" alt="gold-gem" /></span>
      </b> = <b style={{ color:"yellowgreen"}}> 800 <span>
       <Image src={wland} height="15" width="15" alt="wolfiland" /></span></b></p>
      <p style={{ color:"red"}} >
        Unclaimed : {" "}
        <b style={{ color:"orange"}}>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)}</b>
      </p>

      <ApproxRewards miningContract={miningContract} />

      <div className={styles.smallMargin}>
        <Web3Button
          contractAddress={MINING_CONTRACT_ADDRESS}
          action={(contract) => contract.call("claim")}
        >
          Claim
        </Web3Button>
        
      </div>
      <div className={styles.smallMargin}>
        <button className={styles.secondButton}
        ><Link href="https://opensea.io/collection/wolfipets-polygon" color="white !importhan">OpenSea</Link>
        </button>
      </div>
    </div>
  );
}
