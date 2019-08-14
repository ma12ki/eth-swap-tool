import React, { useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";

import "./App.css";

function SwapTool({ futuresContract, targetContract, account }) {
  const [futuresBalance, setFuturesBalance] = useState(0);
  const [targetBalance, setTargetBalance] = useState(0);
  const [swapReceipt, setSwapReceipt] = useState({});

  const handleSwap = useCallback(() => {
    futuresContract.methods
      .burn(100)
      .send()
      .on("transactionHash", function(hash) {
        console.log("hash", hash);
      })
      .on("confirmation", function(confirmationNumber, receipt) {
        console.log("confirmation", confirmationNumber, receipt);
      })
      .on("receipt", function(receipt) {
        console.log("receipt", receipt);
        setSwapReceipt(receipt);
      })
      .on("error", console.error);
  }, [futuresContract.methods]);

  useEffect(() => {
    futuresContract.methods
      .balanceOf(account)
      .call()
      .then(setFuturesBalance);
    targetContract.methods
      .balanceOf(account)
      .call()
      .then(setTargetBalance);
  }, [swapReceipt, account, futuresContract.methods, targetContract.methods]);

  return (
    <div>
      <div>Your xGRAM balance is {futuresBalance}</div>
      <Button
        variant="outline-light"
        disabled={futuresBalance === 0}
        onClick={handleSwap}
      >
        Swap
      </Button>
      <div>Your TON balance is {targetBalance}</div>
    </div>
  );
}

export default SwapTool;
