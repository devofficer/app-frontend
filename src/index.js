import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3Provider } from "@ethersproject/providers";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "src/constants";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <App />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
