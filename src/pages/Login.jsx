import { useForm } from "react-hook-form";
import { useUser } from "../context/user";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let username = data.username + '@admin.com';
    let password = data.password;
    try {
      await login(username, password);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex justify-between shadow-md ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8  flex justify-center items-center flex-col w-full"
        >
          <h2 className="text-black text-2xl font-bold mb-12">Login</h2>
          <div className="mb-4 w-full">
            <input
              type="text"
              id="username"
              placeholder="Email"
              {...register("username", { required: "Username is required" })}
              className={`border rounded w-full py-2 px-3 bg-gray-100 focus:outline-none focus:border-gray-300  ${
                errors.username ? "border-red-500" : "border-gray-100"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={`border rounded w-full py-2 px-3 bg-gray-100 focus:outline-none focus:border-gray-300 ${
                errors.password ? "border-red-500" : "border-gray-100"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-10 rounded-full font-medium hover:bg-red-400 transition-all mt-12"
          >
            Giriş Yap
          </button>
        </form>

        <div className="bg-red-500 flex justify-center flex-col items-center p-8">
          <h2 className=" text-2xl font-bold mb-12 text-center text-white">
            FIMPLE REACT BOOTCAMP
          </h2>
          <p className="text-white text-center text-sm">
            {" "}
            Dinamik Form Uygulaması
          </p>
        </div>
      </div>
    </div>
  );
}
