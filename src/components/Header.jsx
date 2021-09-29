import React, { useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK, token } from "src/constants";
import { sortAddress, getContract } from "src/utils";
import abi from "src/abis/Abi.json";
import tokenAbi from "src/abis/TokenABI.json";
import { UserContext } from "src/context/User";

const Header = ({ open, setOpen }) => {
  const { active, account, chainId, library } = useWeb3React();
  console.log({ active, account, chainId, library });
  const user = useContext(UserContext);

  console.log(user);
  return (
    <nav class="navbar navbar-expand-xxld navbar-dark bg-dark">
      <div class="container-fluid justify-content-end">
        {account && ACTIVE_NETWORK === chainId && (
          <a class="navbar-brand" href="#">
            <span>{sortAddress(account)}</span>
          </a>
        )}
        {account && ACTIVE_NETWORK !== chainId && (
          <a class="navbar-brand" href="#">
            <span>please Change Net. to Kovan</span>
          </a>
        )}
        {!account && (
          <a class="navbar-brand btn btn-secondary px-5" href="#" onClick={user.connectWallet}>
            Connect
          </a>
        )}
        <i
          class="fas fa-bars text-white px-3"
          style={{ cursor: "pointer", fontSize: "30px" }}
          onClick={() => setOpen(!open)}
        ></i>
      </div>
    </nav>
  );
};

export default Header;
