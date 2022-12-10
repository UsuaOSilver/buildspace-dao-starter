import { useAddress, ConnectWallet, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  
  // Use the hooks from thirdweb 
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
  
//   // Case 2: Wallet has connected before
//   return (
//     <div className='landing'>
//       <h1>wallet connected, now what!</h1>
//     </div>
//   );
  
  // Check NFT ownership
  if (hasClaimedNFT) {
    return (
      <div className='member-page'>
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };

  // render mint NFT screen
  return (
    <div className='mint-nft'>
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <div className='btn-hero'>
        <Web3Button
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1)
          }}
          onSuccess={() => {
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your NFT (FREE)
        </Web3Button>
      </div>
    </div>
  );
}
export default App;
