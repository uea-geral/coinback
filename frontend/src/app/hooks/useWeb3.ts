import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { MetamaskService } from "../services/web3/metamask";

const metamaskService = new MetamaskService();

export function useWeb3(onError = () => {}, onSuccess = () => {}) {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [provider, setProvider] = useState<Web3>();

  const connect2Metamask = useCallback(() => {
    async function connect() {
      try {
        const { provider, accounts } = await metamaskService.connect();

        // verifying if has some connected account
        if (accounts.length == 0) {
          onError();
          return;
        }

        setAccounts(accounts);
        setProvider(provider);
        onSuccess();
      } catch (error) {
        onError();
      }
    }

    connect();
  }, [onError, onSuccess]);

  useEffect(() => {
    connect2Metamask();
  }, []);

  return { provider, accounts };
}
