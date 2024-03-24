import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/weatherReducer";

const ErrorBoundry = ({ children }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  
  useEffect(() => {
    const handleError = (event) => {
      if (!error) {
        dispatch(setError(event.error || new Error("Something went wrong! PLease try after sometime.")))
      }
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (error) {
    // You can log the error or display a custom error UI
    console.error(error);
    return (
      <div className="box-border h-dvh bg-slate-700 flex flex-col justify-center items-center">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundry;
