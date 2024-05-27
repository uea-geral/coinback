"use client";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className={styles.notfound}>
      <h1 className="f-t1">Página não encontrada.</h1>
      <button onClick={() => router.push("/")} className="outline primary">
        Voltar para a tela inicial
      </button>
    </main>
  );
}
