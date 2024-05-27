import { Footer } from "../components/footer/footer";
import Header from "../components/header/header";

import styles from "./template.module.css";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export default function PageTemplate({ children }: Props) {
  return (
    <main className={styles.template}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
