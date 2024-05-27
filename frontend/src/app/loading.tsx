import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.loading}>
      <h1 className="f-l fw-b">Carregando...</h1>
    </main>
  );
}
