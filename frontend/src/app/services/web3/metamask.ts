import Web3 from "web3";

export class MetamaskError extends Error {
  constructor(...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MetamaskError);
    }

    this.name = "MetamaskError";
  }
}

export class MetamaskService {
  async connect() {
    if (!("ethereum" in window)) {
      throw new MetamaskError(
        "Você precisa instalar o MetaMask disponível em: https://metamask.io/"
      );
    }
    const provider = window.ethereum;
    const providerWeb = new Web3(provider);
    await provider.request({ method: "eth_requestAccounts" });
    const allAccounts = await providerWeb.eth.getAccounts();
    return allAccounts;
  }
}
