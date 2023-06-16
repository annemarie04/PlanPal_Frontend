import { FormEvent, useState } from "react";
import { loginUser } from "./api/loginUser";
import styles from "../styles/login.module.css";
import { Button, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { signUpUser } from "./api/signUpUser";

type SignUpPageProps = {
  handleLoginStatus: (status: boolean) => void;
};

function SignUpPage({ handleLoginStatus }: SignUpPageProps) {

  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      setIsLoading(true);
      const response = await signUpUser(
        formData.get("usernameInput")?.toString().trim() ?? "",
        formData.get("emailInput")?.toString().trim() ?? "",
        formData.get("passwordInput")?.toString().trim() ?? ""
      );
      handleLoginStatus(true);
      router.push("/login");
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
      <Form onSubmit={handleSignUp}>
      <Form.Group className = {styles.formInput} controlId="formLoginUsername">
          <Form.Label> Username </Form.Label>
          <Form.Control
            type="text"
            name="usernameInput"
            placeholder="John Doe"
            required
          />
        </Form.Group>
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

export default SignUpPage;
