import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { token, poolAddress} from "src/constants";
import { getContract } from "src/utils";
import tokenAbi from "src/abis/TokenABI.json";
import { toast } from 'react-toastify';

const Content = () => {
  const { active, account, chainId, library } = useWeb3React();
  console.log({ active, account, chainId, library });
  const contract = getContract(token, tokenAbi, library, account);
  console.log(contract);
  const dripRef = React.createRef();
  const idoRef = React.createRef();
  const stakeRef = React.createRef();
  const [drip, setDrip] = useState("1");
  const [ido, setIdo] = useState("1");
  const [stake, setStake] = useState("1");
  async function recieveToken() {
    try {
      const faucet = await contract.faucet(drip);
      console.log(faucet);
      toast.success("Recieve tokens request success");
    } catch (err) {
      toast.error(err.message);
    }
  }
  async function approve() {
    try {
      const approve = await contract.approve(poolAddress, drip);
      console.log(approve);
      toast.success("Recieve tokens request approved");
    } catch (err) {
      toast.error(err.message);
    }
  }
  async function invest() {
    try {
      const invest = await contract.Invest(ido);
      console.log(invest);
      toast.success("Invest tokens request success");
    } catch (err) {
      toast.error(err.message);
    }
  }
  useEffect(async() => {
    try {
      const balance = await contract.balanceOf(token)
      console.log(balance.toString());
    } catch (err) {
      console.log(err);
    }
  }, [])
  return (
    <div className="row justify-content-center mt-5" style={{ width: "99vw" }}>
      <div className="col-6 text-white" style={{ maxWidth: "700px" }}>
        <h5>Trade Token Faucet</h5>
        <form>
          <div className="mb-4">
            <div class="mb-3 position-relative">
              <label class="form-label" style={{ fontSize: "12px" }}>
                Number of trade tokens to drip:{" "}
              </label>
              <input
                name="drip"
                type="text"
                class="form-control bg-secondary text-white"
                value={drip}
                onChange={(e) => setDrip(e.target.value)}
                ref={dripRef}
              />
              <i
                className="fas fa-minus"
                style={{
                  position: "absolute",
                  right: "50px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setDrip(dripRef.current.value - 1)}
              ></i>
              <i
                className="fas fa-plus"
                style={{
                  position: "absolute",
                  right: "15px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setDrip(Number(dripRef.current.value) + 1)}
              ></i>
            </div>
            <button
              type="button"
              class="text-white py-2 px-3"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #6c757d",
                borderRadius: "3px",
              }}
              onClick={recieveToken}
            >
              Recieve tokens
            </button>
          </div>
          <div className="mb-4">
            <h6>Approve trade token for use in IFO</h6>
            <span style={{ fontSize: "12px" }}>
              You need to approve the trade token for use in IFO
            </span>
            <div className="d-flex justify-content-between w-75 mt-2">
              <button
                type="button"
                class="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
                onClick={approve}
              >
                Approve
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h6>Participate in the IFO</h6>
            <div class="mb-3 position-relative">
              <label class="form-label" style={{ fontSize: "12px" }}>
                Number of trade tokens to use in IDO:{" "}
              </label>
              <input
                name="ido"
                type="text"
                class="form-control bg-secondary text-white"
                value={ido}
                onChange={(e) => setIdo(e.target.value)}
                ref={idoRef}
              />
              <i
                className="fas fa-minus"
                style={{
                  position: "absolute",
                  right: "50px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setIdo(idoRef.current.value - 1)}
              ></i>
              <i
                className="fas fa-plus"
                style={{
                  position: "absolute",
                  right: "15px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setIdo(Number(idoRef.current.value) + 1)}
              ></i>
            </div>
            <div className="d-flex justify-content-between w-75">
              <button
                type="button"
                class="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
                onClick={invest}
              >
                Participate
              </button>
              <button
                type="button"
                class="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
              >
                Recieve project tokens
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h6>Stake project tokens</h6>
            <span style={{ fontSize: "12px" }}>
              Stake project token to recieve proprtional yield from the energy
              form
            </span>
            <div class="mb-3 position-relative">
              <label class="form-label" style={{ fontSize: "12px" }}>
                Number of project tokens to stake:{" "}
              </label>
              <input
                name="stake"
                type="text"
                class="form-control bg-secondary text-white"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                ref={stakeRef}
              />
              <i
                className="fas fa-minus"
                style={{
                  position: "absolute",
                  right: "50px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setStake(stakeRef.current.value - 1)}
              ></i>
              <i
                className="fas fa-plus"
                style={{
                  position: "absolute",
                  right: "15px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setStake(Number(stakeRef.current.value) + 1)}
              ></i>
            </div>
            <div className="d-flex justify-content-between w-75">
              <button
                type="button"
                class="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
              >
                Stake/Unstake
              </button>
              <button
                type="button"
                class="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
              >
                Recieve rewards
              </button>
            </div>
          </div>
          {/* <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div> */}
          {/* <button type="submit" class="btn btn-primary">Submit</button> */}
        </form>
      </div>
    </div>
  );
};

export default Content;
