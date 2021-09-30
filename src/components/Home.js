import React, { useState } from "react";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useWeb3React } from "@web3-react/core";
import { token, poolAddress } from "src/constants";
import { getContract } from "src/utils";
import TokenABI from "src/abis/TokenABI.json";
import PoolsABI from "src/abis/PoolsABI.json";

const Home = () => {
  const [open, setOpen] = useState(false);
  const { active, account, chainId, library } = useWeb3React();
//   console.log({ active, account, chainId, library });
  const TokenContract = getContract(token, TokenABI, library, account);
  const PoolContract = getContract(poolAddress, PoolsABI, library, account);
//   console.log(TokenContract);
//   console.log(PoolContract);
  return (
    <div
      className="bg-dark"
      style={{ maxWidth: "100vw", position: "relative", height: "100vh" }}
    >
      <Header setOpen={setOpen} open={open} />
      {open && <Sidebar setOpen={setOpen} TokenContract={TokenContract} />}
      <Content TokenContract={TokenContract} PoolContract={PoolContract} />
    </div>
  );
};

export default Home;
