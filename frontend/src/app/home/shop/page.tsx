"use client";
import { useNotification } from "@/app/hooks/useNotification";
import { ProductService } from "@/app/services/api/product_service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const productService = new ProductService();

export default function ShopPage() {
  const { pushNotification } = useNotification();
  const router = useRouter();

  async function buy(productName: string, value: number) {
    const id = localStorage.getItem("auth");
    if (!id) return;
    try {
      await productService.buy(id, {
        product_name: productName,
        value,
      });
      router.push("/home");
      pushNotification(
        {
          message: "Compra realizada com sucesso!",
          type: "success",
        },
        true
      );
    } catch (error) {
      router.push("/");
      pushNotification(
        {
          message: "Não foi possível realizar esta compra.",
          type: "error",
        },
        true
      );
    }
  }

  return (
    <main className={styles.page}>
      <Link className={styles.link} href="/home">
        Voltar
      </Link>

      <label className="f-l fw-b">Lista de produtos</label>

      <ul className={styles.products}>
        <li className={styles.card} onClick={() => buy("Produto 1", 0.5)}>
          <label className="fw-b f-l">0.5 ETH</label>
          <label className="f-t">Produto 1</label>
          <label className="f-t">produto com preço baixo</label>
          <button className="primary">Compra em 1-clique</button>
        </li>
        <li className={styles.card} onClick={() => buy("Produto 2", 0.8)}>
          <label className="fw-b f-l">0.8 ETH</label>
          <label className="f-t">Produto 2</label>
          <label className="f-t">produto com preço médio</label>
          <button className="primary">Compra em 1-clique</button>
        </li>
        <li className={styles.card} onClick={() => buy("Produto 3", 1)}>
          <label className="fw-b f-l">1 ETH</label>
          <label className="f-t">Produto 3</label>
          <label className="f-t">produto com preço alto</label>
          <button className="primary">Compra em 1-clique</button>
        </li>
      </ul>
    </main>
  );
}
