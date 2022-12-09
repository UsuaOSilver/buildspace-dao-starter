import { useAddress, ConnectWallet } from '@thirdweb-dev/react';

const App = () => {
  const address = useAddress();
  console.log("Address:", address);
  
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
