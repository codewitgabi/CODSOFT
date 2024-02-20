import { useContext, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeSlash } from "react-bootstrap-icons";
import NavBar from "../components/NavBar";
import { AppContext } from "../contexts";

const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT;

function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let { user: User } = useContext(AppContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const response = await fetch(`${SERVER_ROOT}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      User = { ...data };
      navigate("/");
    } else {
      const error = await response.json();
      setError(error?.message || "Incorrect email or password");
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex justify-center items-center min-h-screen pb-8">
        <div className="mx-[1.5em] mt-[2em] bg-bgSecondary p-[1em] md:w-3/5 md:mx-auto lg:w-[30%]">
          <h3 className="text-[1.2rem] mb-[1em]">Login to your account</h3>
          <p className="mb-2 text-[0.9rem] text-red-500">{error}</p>
          <form method="post" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 my-1 outline-none focus:border focus:border-textYellow bg-bgPrimary"
              />
            </div>
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-2 my-1 outline-none focus:border focus:border-textYellow bg-bgPrimary"
              />
              <EyeSlash className="absolute top-[5px] right-0" />
            </div>

            <button
              className="w-full my-[1.5em] bg-textYellow p-3 text-black rounded"
              type="submit"
            >
              Login
            </button>
          </form>

          <p>
            Not registered yet?{" "}
            <Link to="/auth/register" className="underline text-textYellow">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
