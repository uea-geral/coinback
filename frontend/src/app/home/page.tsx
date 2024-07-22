"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Purchase } from "../entities/purchase";
import { useWeb3 } from "../hooks/useWeb3";
import { Web3ProductService } from "../services/web3/product_service";
import { Web3UserService } from "../services/web3/user_service";
import styles from "./page.module.css";

export default function HomePage() {
  const [data, setData] = useState<Purchase[]>();
  const [total, setTotal] = useState<number>();
  const [cashback, setCashback] = useState<number>();
  const isLoading = data === undefined;

  const { accounts, provider } = useWeb3();

  useEffect(() => {
    async function fetch() {
      if (!provider) return;
      const id = localStorage.getItem("auth") as string | null;
      if (!id) return;
      const userService = new Web3UserService(provider, accounts[0]);
      const productService = new Web3ProductService(provider, accounts[0]);
      const [foundUser, products] = await Promise.all([
        userService.getUserByAddress(accounts[0]),
        productService.fetch(accounts[0]),
      ]);
      setData(products);
      setCashback(Number(foundUser.cashback));
      setTotal(products.map((p) => Number(p.value)).reduce((p, c) => c + p, 0));
    }

    fetch();
  }, [accounts, provider]);

  function renderPurchase(purchase: Purchase, index: number) {
    return (
      <li key={`${purchase.id}`}>
        <label>{purchase.productName}</label>
        <label>{Number(purchase.value)} ETH</label>
      </li>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.inline}>
        <div className={styles.card_primary}>
          <label className="f-t3">
            {cashback ?? "Carregando..."}
            {cashback !== undefined ? (
              <label className="f-l"> ETH</label>
            ) : (
              <></>
            )}
          </label>
          {cashback !== undefined ? (
            <label className="f-l">de retorno (cashback)</label>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.card_primary_outline}>
          <label className="f-t3">
            {total ?? "Carregando..."}
            {total !== undefined ? <label className="f-l "> ETH</label> : <></>}
          </label>
          {total !== undefined ? (
            <label className="f-l">em compras na plataforma</label>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Link className={styles.link} href="/home/shop">
        Comprar um produto do marketplace
      </Link>
      <label className="f-l fw-b">Histórico de compras</label>

      <ul className={styles.purchase}>
        <li>
          <label>Nome</label>
          <label>Valor (em ETH)</label>
        </li>
        {isLoading && (
          <li>
            <label>Carregando...</label>
          </li>
        )}
        {!isLoading && data && data.length != 0 ? (
          data.map(renderPurchase)
        ) : (
          <li>
            <label>Sem compras realizadas.</label>
          </li>
        )}
      </ul>
    </main>
  );
}
