import { useRouteError } from "react-router-dom";
import "./errorpage.css";
import "../../global.css";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  // console.error(error);

  return (
    <div className="error_page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error?.message || "Unknown error!"}</p>

      <Link to="/">Go back to Homepage</Link>
    </div>
  );
}
