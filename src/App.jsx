import { useAddress, ConnectWallet, useContract, useNFTBalance } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  const address = useAddress();
  console.log("👋 Address:", address);
  
  //Initialize Edition Drop contract
  const editionDropAddress = "0xFf423fC0149dEFACf4A51f752cb8F7d208FD4e09"
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  
  // Hook to check if the user has the NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")
  
  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])
  
  // Case 1: Wallet not connected
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to SaigonDAO</h1>
        <div className='btn-hero'>
          <ConnectWallet />
        </div>
      </div>
    );
  }
  
  // Case 2: Wallet has connected before
  return (
    <div className='landing'>
      <h1>wallet connected, now what!</h1>
    </div>
  );
};

export default App;
