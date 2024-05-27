"use client";

import Link from "next/link";
import useSWR from "swr";
import { api } from "../api";
import { Purchase } from "../entities/purchase";
import { User } from "../entities/user";
import styles from "./page.module.css";

export default function HomePage() {
  let id: string | null | undefined = "";
  if (typeof window !== "undefined") {
    id = localStorage.getItem("auth");
  }
  const { data, error, isLoading } = useSWR<{ data: Purchase[] }>(
    `/users/${id}/purchases`,
    api.get
  );
  const { data: dataUser } = useSWR<{ data: User }>(`/users/${id}`, api.get);

  const total = (data?.data || [])
    .map((p) => p.value)
    .reduce((p, c) => c + p, 0);
  const cashback = dataUser?.data.cashback || 0;

  function renderPurchase(purchase: Purchase, index: number) {
    return (
      <li key={`${purchase.id}`}>
        <label>{purchase.product_name}</label>
        <label>R${formatCurrency(purchase.value)}</label>
      </li>
    );
  }

  function formatCurrency(value: number) {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(value)
      .replace("R$", "");
  }

  return (
    <main className={styles.page}>
      <div className={styles.inline}>
        <div className={styles.card_primary}>
          <label className="f-t2">
            <label className="f-t3">R$</label>
            {formatCurrency(cashback)}
          </label>
          <label className="f-l">de retorno (cashback)</label>
        </div>
        <div className={styles.card_primary_outline}>
          <label className="f-t2">
            <label className="f-t3">R$</label>
            {formatCurrency(total)}
          </label>
          <label className="f-l">em compras na plataforma</label>
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
        {!isLoading && data && data.data.length != 0 ? (
          data.data.map(renderPurchase)
        ) : (
          <li>
            <label>Sem compras realizadas.</label>
          </li>
        )}
      </ul>
    </main>
  );
}
