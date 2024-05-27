import styles from "./styles.module.css";

interface Props {
  redirect2Create: () => void;
}

export default function FormLogin({ redirect2Create }: Props) {
  return (
    <form className={styles.form}>
      <h2 className="f-t3">Fazer Login</h2>
      <div className={styles.input_group}>
        <input type="text" className="input" placeholder="CPF" />
        <input type="text" className="input" placeholder="Senha" />
      </div>
      <button className="button primary submit">Entrar</button>
      <p className="f-t">
        Ainda não tem conta?{" "}
        <span className="fw-b" onClick={redirect2Create}>
          Clique aqui para se cadastrar.
        </span>
      </p>
    </form>
  );
}
