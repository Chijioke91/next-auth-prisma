import { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

const AuthForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: '', password: '' }
  );

  const { email, password } = formData;

  const toggleAuth = () => setIsLoggedIn((prev) => !prev);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoggedIn) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        return toast.error(result.error);
      }

      router.replace('/profile');
    } else {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        return data;
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center mt-60">
      <div className="bg-indigo-900 text-white w-3/12 h-96 rounded-xl">
        <ToastContainer autoClose={1500} />
        <form onSubmit={onSubmit} className="flex flex-col items-center mt-2">
          <h1 className="text-4xl font-semibold mb-3">
            {isLoggedIn ? 'Login' : 'Sign Up'}
          </h1>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-lg font-semibold text-center mb-2"
            >
              Your Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={onChange}
              className="w-72 py-3 text-black font-semibold text-xl rounded-lg focus:outline-none border-4 focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label
              htmlFor="password"
              className="text-lg font-semibold text-center mb-2"
            >
              Your Password
            </label>
            <input
              type="password"
              value={password}
              onChange={onChange}
              id="password"
              className="w-72 py-3 text-black font-semibold text-xl rounded-lg focus:outline-none border-4 focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-700 rounded-lg px-12 py-3 mt-4 font-semibold"
          >
            {isLoggedIn ? 'Login' : 'Create Account'}
          </button>
          <button
            type="button"
            onClick={toggleAuth}
            className="text-lg font-semibold tracking-wider text-indigo-200 mt-4"
          >
            {isLoggedIn ? 'Create New Account' : 'Login with existing account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
