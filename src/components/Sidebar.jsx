import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Sidebar = ({ setOpen, TokenContract }) => {
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    try {
      const res = await TokenContract.balanceOf(
        window.sessionStorage.getItem("userAddress")
      );
      console.log(res.toString())
      setBalance(res.toString());
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  return (
    <div
      className="bg-secondary text-white"
      style={{
        height: "100vh",
        width: "350px",
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "10000",
      }}
    >
      <div className="row justify-content-end w-100 mb-5">
        <div className="col-1 p-2">
          <i
            className="fas fa-times fa-lg p-2"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
          ></i>
        </div>
      </div>
      <div className="row mx-auto">
        <div className="col-12 mb-3">
          <span className="h4">Account balances: </span>
        </div>
        <div className="col-12 mb-3">
          <span className="h6">Number of trade tokens: {balance}</span>
        </div>
        <div className="col-12 mb-3">
          <span className="h6">Number of project tokens: 0 </span>
        </div>
        <div className="col-12 mb-3">
          <span className="h6">Staked project tokens: 0</span>
        </div>
        <div className="col-12 mb-3">
          <span className="h6">Rewards collected: 0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
