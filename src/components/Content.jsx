import React, { useEffect, useState } from "react";
import { poolAddress, stakingToken } from "src/constants";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";

const Content = ({ TokenContract, PoolContract, StakeContract, ProjectContract }) => {
  const { active } = useWeb3React();
  const dripRef = React.createRef();
  const idoRef = React.createRef();
  const stakeRef = React.createRef();
  const approvestakeRef = React.createRef();
  const [drip, setDrip] = useState("1");
  const [ido, setIdo] = useState("1");
  const [stake, setStake] = useState("1");
  const [approvestake, setApproveStake] = useState("1");
  const [getRefund, setGetRefund] = useState(false);
  const [totalCollectedWei, setTotalCollectedWei] = useState(0)
  const [goal, setGoal] = useState(0)
  const [iHash, setIHash] = useState("");

  async function recieveToken() {
    try {
      const faucet = await TokenContract.faucet(drip);
      console.log(faucet)
      toast.success("Recieve tokens request success");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function approve() {
    try {
      const approve = await TokenContract.approve(poolAddress, drip);
      console.log(approve)
      toast.success("Recieve tokens request approved");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function invest() {
    try {
      const invest = await PoolContract.Invest(ido);
      console.log(invest["hash"])
      setIHash(invest["hash"])
      toast.success("Invest tokens request success");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function stakeUnstake() {
    try {
      const stakeRes = await StakeContract.stake(stake);
      console.log(stakeRes)
      toast.success("Stake/Unstake request success");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function approveStake() {
    try {
      const approve = await ProjectContract.approve(stakingToken, stake);
      console.log(approve)
      toast.success("Approve Stake request success");
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(async () => {
    try {
      if (await PoolContract.hasPoolEnded()) {
        if (await PoolContract.hasGoalReached()) {
          setGetRefund(false)
        } else {
          setGetRefund(true)
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [getRefund]);

  useEffect(async () => {
    try {
      let weiRes = await PoolContract.TotalCollectedWei()
      console.log(weiRes.toString());
      do {
        weiRes = await PoolContract.TotalCollectedWei()
      } while (totalCollectedWei.toString() === weiRes.toString())
      setTotalCollectedWei(weiRes.toString())
      const goalRes = await PoolContract.Goal()
      console.log(goalRes.toString());
      setGoal(goalRes.toString())
    } catch (err) {
      console.log(err.message);
    }
  }, [active, iHash]);

  return (
    <div className="row justify-content-center mt-5" style={{ width: "99vw" }}>
      <div className="col-6 text-white" style={{ maxWidth: "700px" }}>
        <form>
          {/* Trade Token Faucet */}
          <div className="mb-4">
            <h6>Trade Token Faucet</h6>
            <div className="mb-3 position-relative">
              <label className="form-label" style={{ fontSize: "12px" }}>
                Number of trade tokens to drip:{" "}
              </label>
              <input
                name="drip"
                type="text"
                className="form-control bg-secondary text-white"
                value={drip}
                onChange={(e) => { e.currentTarget.value.indexOf(" ") === -1 &&  !isNaN(e.target.value) && setDrip(e.target.value) }}
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
              className="text-white py-2 px-3"
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
          {/* Approve trade token for use in IFO */}
          <div className="mb-4">
            <h6>Approve trade token for use in IFO</h6>
            <span style={{ fontSize: "12px" }}>
              You need to approve the trade token for use in IFO
            </span>
            <div className="d-flex justify-content-between w-75 mt-2">
              <button
                type="button"
                className="text-white py-2 px-3"
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
          {/* Participate in the IDO */}
          <div className="mb-4">
            <h6>Participate in the IDO</h6>
            <div className="mb-3 position-relative">
              <label className="form-label" style={{ fontSize: "12px" }}>
                Number of trade tokens to use in IDO:{" "}
              </label>
              <button
                type="button"
                className="text-white py-1 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                  position: "absolute",
                  right: "0",
                  top: "-12px",
                  cursor: "default"
                }}
              >
                Goal {totalCollectedWei.toString()}/{goal.toString()}
              </button>
              <input
                name="ido"
                type="text"
                className="form-control bg-secondary text-white"
                value={ido}
                onChange={(e) => { e.currentTarget.value.indexOf(" ") === -1 &&  !isNaN(e.target.value) && setIdo(e.target.value) }}
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
                className="text-white py-2 px-3"
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
                className="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
                onClick={() => {
                  getRefund ? PoolContract.getRefund() : PoolContract.claimTokens()
                }}
              >
                {getRefund ? "Get Refund" : "Recieve project tokens"}
              </button>
            </div>
          </div>
          {/* Approve trade token for use in staking */}
          <div className="mb-4">
            <h6>Approve trade token for use in staking</h6>
            <div className="mb-3 position-relative">
              <label className="form-label" style={{ fontSize: "12px" }}>
                You need to approve the trade token for use in staking
              </label>
              <input
                name="approvestake"
                type="text"
                className="form-control bg-secondary text-white"
                value={approvestake}
                onChange={(e) => { e.currentTarget.value.indexOf(" ") === -1 &&  !isNaN(e.target.value) && setApproveStake(e.target.value) }}
                ref={approvestakeRef}
              />
              <i
                className="fas fa-minus"
                style={{
                  position: "absolute",
                  right: "50px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setApproveStake(approvestakeRef.current.value - 1)}
              ></i>
              <i
                className="fas fa-plus"
                style={{
                  position: "absolute",
                  right: "15px",
                  bottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setApproveStake(Number(approvestakeRef.current.value) + 1)}
              ></i>
            </div>
            <button
              type="button"
              className="text-white py-2 px-3"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #6c757d",
                borderRadius: "3px",
              }}
              onClick={approveStake}
            >
              Approve
            </button>
          </div>
          {/* Stake project tokens */}
          <div className="mb-4">
            <h6>Stake project tokens</h6>
            <span style={{ fontSize: "12px" }}>
              Stake project token to recieve proprtional yield from the energy
              form
            </span>
            <div className="mb-3 position-relative">
              <label className="form-label" style={{ fontSize: "12px" }}>
                Number of project tokens to stake:{" "}
              </label>
              <input
                name="stake"
                type="text"
                className="form-control bg-secondary text-white"
                value={stake}
                onChange={(e) => { e.currentTarget.value.indexOf(" ") === -1 &&  !isNaN(e.target.value) && setStake(e.target.value) }}
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
                className="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
                onClick={stakeUnstake}
              >
                Stake/Unstake
              </button>
              <button
                type="button"
                className="text-white py-2 px-3"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #6c757d",
                  borderRadius: "3px",
                }}
                onClick={() => StakeContract.claimReward()}
              >
                Recieve rewards
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Content;
