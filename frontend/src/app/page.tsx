"use client";
import Image from "next/image";
import { useState } from "react";
import { Footer } from "./components/footer/footer";
import FormLogin from "./components/forms/form-login/form-login";
import FormRegister from "./components/forms/form-register/form-register";
import styles from "./page.module.css";
import { MetamaskService } from "./services/web3/metamask";

import MetamaskIcon from "./assets/metamask.svg";
import { useNotification } from "./hooks/useNotification";
import { useWeb3 } from "./hooks/useWeb3";

const metamaskService = new MetamaskService();

export default function LandingPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [loadingMetamask, setLoadingMetamask] = useState(true);
  const { pushNotification } = useNotification();
  const { provider } = useWeb3(
    () => {
      pushNotification(
        {
          message:
            "Não foi possível conectar ao Metamask. Verifique se você tem esta carteira instalada corretamente e tente novamente.",
          type: "error",
        },
        true
      );
    },
    () => {
      setLoadingMetamask(false);
    }
  );

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
