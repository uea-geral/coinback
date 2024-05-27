import Link from "next/link";
import styles from "./page.module.css";

export default function ShopPage() {
  return (
    <main className={styles.page}>
      <Link className={styles.link} href="/home">
        Voltar
      </Link>

      <label className="f-l fw-b">Lista de produtos</label>

      <ul className={styles.products}>
        <li className={styles.card}>
          <label className="fw-b f-l">R$ 10,00</label>
          <label className="f-t">Produto 1</label>
          <label className="f-t">produto com preço baixo</label>
          <button className="primary">Compra em 1-clique</button>
        </li>
        <li className={styles.card}>
          <label className="fw-b f-l">R$ 100,00</label>
          <label className="f-t">Produto 2</label>
          <label className="f-t">produto com preço médio</label>
          <button className="primary">Compra em 1-clique</button>
        </li>
        <li className={styles.card}>
          <label className="fw-b f-l">R$ 1000,00</label>
          <label className="f-t">Produto 3</label>
          <label className="f-t">produto com preço alto</label>
          <button className="primary">Compra em 1-clique</button>
        </li>
      </ul>
    </main>
  );
}
