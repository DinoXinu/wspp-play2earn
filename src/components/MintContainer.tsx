import React from "react";
import {
  useAddress,
  useClaimNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { CHARACTER_EDITION_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import gifted from '/public/mine.png'

import banner from '/public/meta1.png'

export default function MintContainer() {
  const address = useAddress();
  return (
    
    
      
    <div className={styles.collectionContainer}>
        <div className={styles.bgWrap} style={{marginTop:"-150px"}}>
       <Image
        src={banner}
        alt="travel"
        layout="fill"
        objectFit="cover"
        quality={100}
      /> </div>
      <h1>Edition Drop</h1>

      <p>Claim your Character NFT to start playing!</p>

      <div className={`${styles.mintBox} ${styles.spacerBottom}`}>
        <Image src={gifted} style={{borderRadius:"16px"}}  alt="character-mining"/>
      </div>

      <div className={styles.smallMargin}>
        <Web3Button
          colorMode="dark"
          contractAddress={CHARACTER_EDITION_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
        >
          Claim
        </Web3Button>
      </div>
    </div>
    
  );
}
