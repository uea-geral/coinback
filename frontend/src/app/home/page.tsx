"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Purchase } from "../entities/purchase";
import { ProductService } from "../services/api/product_service";
import { UserService } from "../services/api/user_service";
import styles from "./page.module.css";

const userService = new UserService();
const productService = new ProductService();

export default function HomePage() {
  const [data, setData] = useState<Purchase[]>();
  const [total, setTotal] = useState<number>();
  const [cashback, setCashback] = useState<number>();
  const isLoading = data === undefined;

  useEffect(() => {
    async function fetch() {
      const id = localStorage.getItem("auth");

      if (!id) return;

      const [user, products] = await Promise.all([
        userService.findById(id),
        productService.fetch(id),
      ]);

      setData(products);
      setCashback(user.cashback);
      setTotal(products.map((p) => p.value).reduce((p, c) => c + p, 0));
    }

    fetch();
  }, []);

  function renderPurchase(purchase: Purchase, index: number) {
    return (
      <li key={`${purchase.id}`}>
        <label>{purchase.product_name}</label>
        <label>{purchase.value} ETH</label>
      </li>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.inline}>
        <div className={styles.card_primary}>
          <label className="f-t3">
            {cashback || "Carregando..."}
            {cashback && <label className="f-l"> ETH</label>}
          </label>
          {cashback && <label className="f-l">de retorno (cashback)</label>}
        </div>
        <div className={styles.card_primary_outline}>
          <label className="f-t3">
            {total || "Carregando..."}
            {total && <label className="f-l "> ETH</label>}
          </label>
          {total && <label className="f-l">em compras na plataforma</label>}
        </div>
      </div>

      <Link className={styles.link} href="/home/shop">
        Comprar um produto do marketplace
      </Link>
      <label className="f-l fw-b">Histórico de compras</label>

      <ul className={styles.purchase}>
        <li>
          <label>Nome</label>
          <label>Valor (em reais)</label>
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
