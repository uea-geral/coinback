import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.inline}>
        <div className={styles.card_primary}>
          <label className="f-t2">
            <label className="f-t3">R$</label> 10,00
          </label>
          <label className="f-l">de retorno (cashback)</label>
        </div>
        <div className={styles.card_primary_outline}>
          <label className="f-t2">
            <label className="f-t3">R$</label> 10,00
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
          <label>Valor</label>
        </li>
        <li>
          <label>Produto 1</label>
          <label>R$ 10,00</label>
        </li>
        <li>
          <label>Produto 1</label>
          <label>R$ 10,00</label>
        </li>
      </ul>
    </main>
  );
}
