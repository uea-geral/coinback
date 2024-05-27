import Image from "next/image";

import styles from "./styles.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image
        src="/coinback.svg"
        alt="coinback"
        width={500}
        height={500}
        priority={true}
      />
      ©2024
    </footer>
  );
};
