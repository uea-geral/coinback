"use client";
import { api } from "@/app/api";
import { User } from "@/app/entities/user";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

interface Props {
  redirect2Create: () => void;
}

export default function FormLogin({ redirect2Create }: Props) {
  const router = useRouter();

  async function handleSubmit(data: FormData) {
    const rawData = {
      cpf: data.get("cpf"),
      pass: data.get("pass"),
    };
    try {
      const { status, data: responseData } = await api.post<User>(
        `/users/login`,
        rawData
      );
      localStorage.setItem("auth", responseData.id);
      router.push("/home");
    } catch (error) {
      alert("Usuário e/ou senha incorretos.");
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
