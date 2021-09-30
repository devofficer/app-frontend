import React, { useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK } from "src/constants";
import { sortAddress } from "src/utils";
import { UserContext } from "src/context/User";

const Header = ({ open, setOpen }) => {
  const { account, chainId } = useWeb3React();
  const user = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-xxld navbar-dark bg-dark">
      <div className="container-fluid justify-content-end">
        {account && ACTIVE_NETWORK === chainId && (
          <a className="navbar-brand" href="#">
            <span>{sortAddress(account)}</span>
          </a>
        )}
        {account && ACTIVE_NETWORK !== chainId && (
          <a className="navbar-brand" href="#">
            <span>please Change Net. to Kovan</span>
          </a>
        )}
        {!account && (
          <a
            className="navbar-brand btn btn-secondary px-5"
            href="#"
            onClick={user.connectWallet}
          >
            Connect
          </a>
        )}
        <i
          className="fas fa-bars text-white px-3"
          style={{ cursor: "pointer", fontSize: "30px" }}
          onClick={() => setOpen(!open)}
        ></i>
      </div>
    </nav>
  );
};

export default Header;
