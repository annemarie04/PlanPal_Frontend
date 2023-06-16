import { FormEvent, useState } from "react";
import { loginUser } from "./api/loginUser";
import styles from "../styles/login.module.css";
import { Button, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

type loginProps = {
  handleLoginStatus: (status: boolean) => void;
};

function LoginPage({ handleLoginStatus }: loginProps) {

  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      setIsLoading(true);
      const response = await loginUser(
        formData.get("emailInput")?.toString().trim() ?? "",
        formData.get("passwordInput")?.toString().trim() ?? ""
      );
      handleLoginStatus(true);
      router.push("/dailyview");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.loginDiv}>
      <h1> Welcome back! </h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className = {styles.formInput} controlId="formLoginEmail">
          <Form.Label> EMAIL </Form.Label>
          <Form.Control
            type="email"
            name="emailInput"
            placeholder="example@gmail.com"
            required
          />
        </Form.Group>

        <Form.Group className = {styles.formInput} controlId="formLoginPassword">
          <Form.Label> PASSWORD </Form.Label>
          <Form.Control
            type="password"
            name="passwordInput"
            placeholder="surely not 1234"
            required
          />
        </Form.Group>

        {isLoading ? (
          <Button variant="secondary" disabled>
            <Spinner animation="border" size="sm" />
          </Button>
        ) : (
          <Button
            variant="secondary"
            type="submit"
            className={styles.loginSubmitButton}
          >
            Log In
          </Button>
        )}
      </Form>

    </div>
  );
}

export default LoginPage;
