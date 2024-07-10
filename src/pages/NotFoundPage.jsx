import { useRouteError } from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className=" bg-blue-gray-900 text-white h-screen flex flex-col items-center justify-center gap-6"
    >
      <h1 className="font-bold text-4xl">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
