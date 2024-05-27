"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Image
        src="/coinback.svg"
        alt="coinback"
        width={100}
        height={100}
        priority={true}
      />

      <button onClick={() => router.push("/")} className="primary outline fw-b">
        Sair
      </button>
    </header>
  );
}
