import { api } from "@/app/api";
import { User } from "@/app/entities/user";
import styles from "./styles.module.css";

interface Props {
  redirect2Login: () => void;
}

export default function FormRegister({ redirect2Login }: Props) {
  async function handleSubmit(data: FormData) {
    const rawData = {
      cpf: data.get("cpf"),
      pass: data.get("pass"),
      name: data.get("name"),
    };

    try {
      const { status, data: responseData } = await api.post<User>(
        `/users`,
        rawData
      );
      redirect2Login();
      alert("Cadastro realizado com sucesso.");
    } catch (error) {
      alert("Tenta cadastrar novamente.");
    }
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <h2 className="f-t3">Fazer Cadastro</h2>
      <div className={styles.input_group}>
        <input type="text" className="input" placeholder="CPF" name="cpf" />
        <input type="text" className="input" placeholder="Nome" name="name" />
        <input type="text" className="input" placeholder="Senha" name="pass" />
      </div>
      <button className="button primary submit">Enviar</button>
      <p className="f-t">
        Já possui uma conta?{" "}
        <span className="fw-b">Clique aqui para fazer login.</span>
      </p>
    </form>
  );
}
