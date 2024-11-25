import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Oh no!</h1>
      <p>Ha ocurrido un error inesperado.</p>
      <p>
        <i>Not found...</i>
      </p>
    </div>
  );
}
