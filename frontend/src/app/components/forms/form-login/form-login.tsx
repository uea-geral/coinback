"use client";
import { useNotification } from "@/app/hooks/useNotification";
import { UserService } from "@/app/services/api/user_service";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

interface Props {
  redirect2Create: () => void;
}

export const userService = new UserService();

export default function FormLogin({ redirect2Create }: Props) {
  const router = useRouter();
  const { pushNotification } = useNotification();

  async function handleSubmit(data: FormData) {
    const cpf = data.get("cpf")?.toString();
    const pass = data.get("pass")?.toString();

    if (!cpf || !pass)
      return pushNotification(
        { message: "Preencha todos os campos.", type: "warning" },
        true
      );

    try {
      await userService.login({ cpf, pass });
      router.push("/home");
    } catch (error) {
      pushNotification(
        { message: "Usuário e/ou senha incorretos.", type: "error" },
        true
      );
    }
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <h2 className="f-t3">Fazer Login</h2>
      <div className={styles.input_group}>
        <input type="text" className="input" placeholder="CPF" name="cpf" />
        <input type="text" className="input" placeholder="Senha" name="pass" />
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
