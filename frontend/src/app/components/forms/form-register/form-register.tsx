import styles from "./styles.module.css";

interface Props {
  redirect2Login: () => void;
}

export default function FormRegister({ redirect2Login }: Props) {
  return (
    <form className={styles.form}>
      <h2 className="f-t3">Fazer Cadastro</h2>
      <div className={styles.input_group}>
        <input type="text" className="input" placeholder="CPF" />
        <input type="text" className="input" placeholder="Nome" />
        <input type="text" className="input" placeholder="Senha" />
      </div>
      <button className="button primary submit">Entrar</button>
      <p className="f-t">
        Já possui uma conta?{" "}
        <span className="fw-b" onClick={redirect2Login}>
          Clique aqui para fazer login.
        </span>
      </p>
    </form>
  );
}
