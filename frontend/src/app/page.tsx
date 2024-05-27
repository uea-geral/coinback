"use client";
import Image from "next/image";
import { useState } from "react";
import { Footer } from "./components/footer/footer";
import FormLogin from "./components/forms/form-login/form-login";
import FormRegister from "./components/forms/form-register/form-register";
import styles from "./page.module.css";

export default function LandingPage() {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className={styles.landing_page}>
      <header>
        <Image src="/coinback.svg" alt="coinback" width={200} height={200} />
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
