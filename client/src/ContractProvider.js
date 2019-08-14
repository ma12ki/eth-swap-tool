import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import "./App.css";

function ContractProvider({ web3, account, children }) {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const result = await fetch("http://localhost:1337/contracts");
      const { futures, target } = await result.json();
      const options = {
        from: account,
        gasPrice: 20,
        gas: 2000000
      };

      const futuresContract = new web3.eth.Contract(
        futures.abi,
        futures.address,
        options
      );
      const targetContract = new web3.eth.Contract(
        target.abi,
        target.address,
        options
      );

      setContracts([futuresContract, targetContract]);
    };

    fetchContracts();
  }, [account, web3.eth.Contract]);

  if (contracts.length === 0) {
    return <Spinner animation="grow" />;
  }

  return children(contracts);
}

export default ContractProvider;
