"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Footer } from "./components/footer/footer";
import FormLogin from "./components/forms/form-login/form-login";
import FormRegister from "./components/forms/form-register/form-register";
import styles from "./page.module.css";
import { MetamaskError, MetamaskService } from "./services/web3/metamask";

import MetamaskIcon from "./assets/metamask.svg";
import { useNotification } from "./hooks/useNotification";

const metamaskService = new MetamaskService();

export default function LandingPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [loadingMetamask, setLoadingMetamask] = useState(true);
  const { pushNotification } = useNotification();
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    async function connect() {
      try {
        const accounts = await metamaskService.connect();
        console.log("Available accounts: ", accounts);

        // verifying if has some connected account
        if (accounts.length == 0) {
          pushNotification(
            {
              message: "Não há contas nenhuma conta conectada!",
              type: "error",
            },
            true
          );
          return;
        }

        setLoadingMetamask(false);
        setAccounts(accounts);
      } catch (error) {
        if (error instanceof MetamaskError) {
          const message = error.message;
          pushNotification({ message, type: "error" }, true);
        }
      }
    }

    connect();
  }, [pushNotification]);

  if (loadingMetamask) {
    return (
      <div className={styles.landing_page}>
        <div className={styles.metamask}>
          <Image
            src={MetamaskIcon}
            alt="metamask"
            width={200}
            priority={true}
          />
          <label className="f-t3 fw-b">
            Conectando a sua carteira virtual...
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.landing_page}>
      <header>
        <Image
          src="/coinback.svg"
          alt="coinback"
          width={200}
          height={200}
          priority={true}
        />
      </header>
      <main>
        <div>
          <h1 className="f-t1">
            <span className="fw-b">Receba seu dinheiro de volta</span>
          </h1>
          <h3 className="f-t2">de forma segura!</h3>
        </div>
        {!showCreate ? (
          <FormLogin redirect2Create={() => setShowCreate(true)} />
        ) : (
          <FormRegister redirect2Login={() => setShowCreate(false)} />
        )}
      </main>
      <Footer />
    </div>
  );
}
