import { useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK, token } from "src/constants";
import { sortAddress, getContract } from "src/utils";
import abi from "src/abis/Abi.json";
import { UserContext } from "src/context/User";

export default function Header() {
  const { active, account, chainId, library } = useWeb3React();
  console.log({ active, account, chainId, library });
  const user = useContext(UserContext);

  console.log(user);
  // const getData = async () => {
  //   const contract = getContract(token, abi, library, account);
  //   const res = await contract.InvestETH(8, {
  //     from: account,
  //     value: "1000000000000000",
  //   });
  //   console.log(res);
  // };

  // useEffect(() => {
  //   if (account) {
  //     getData();
  //   }
  // }, [account, getData]);

  return (
    <header style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      {account && ACTIVE_NETWORK === chainId && <h3>{sortAddress(account)}</h3>}
      {account && ACTIVE_NETWORK !== chainId && (
        <h3>please Change Net. to Kovan</h3>
      )}
      {!account && <button onClick={user.connectWallet}>Connect</button>}
    </header>
  );
}
