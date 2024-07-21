import { useNotification } from "@/app/hooks/useNotification";
import { UserService } from "@/app/services/api/user_service";
import styles from "./styles.module.css";

interface Props {
  redirect2Login: () => void;
}

const userService = new UserService();

export default function FormRegister({ redirect2Login }: Props) {
  const { pushNotification } = useNotification();

  async function handleSubmit(data: FormData) {
    const cpf = data.get("cpf")?.toString();
    const pass = data.get("pass")?.toString();
    const name = data.get("name")?.toString();

    if (!cpf || !pass || !name)
      return pushNotification(
        {
          message: "Preencha todos os campos.",
          type: "warning",
        },
        true
      );

    try {
      await userService.create({ cpf, pass, name });
      redirect2Login();
      pushNotification(
        {
          message: "Usuário cadastrado com sucesso!",
          type: "success",
        },
        true
      );
    } catch (error) {
      pushNotification(
        {
          message: "Erro ao cadastrar usuário. Por favor tente novamente.",
          type: "error",
        },
        true
      );
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
        <span onClick={redirect2Login} className="fw-b">
          Clique aqui para fazer login.
        </span>
      </p>
    </form>
  );
}
