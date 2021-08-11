import { signOut } from 'next-auth/client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    oldPassword: '',
  });

  const logout = () => signOut();

  const { newPassword, oldPassword } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success(data.message);

      logout();
    } catch (e) {
      toast.error(e.message);
    }

    setFormData({ newPassword: '', oldPassword: '' });
  };

  return (
    <div className="flex flex-col items-center text-gray-900">
      <h1 className="text-9xl font-bold mt-8">Your User Profile</h1>
      <ToastContainer autoClose={1500} />
      <form onSubmit={onSubmit} className="flex flex-col items-center mt-32">
        <div className="flex flex-col items-center mt-3">
          <label htmlFor="newPassword" className="text-xl font-semibold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={onChange}
            className="w-96 p-2 rounded-lg focus:outline-none border-4 focus:border-indigo-600 text-black"
          />
        </div>
        <div className="flex flex-col items-center mt-5">
          <label htmlFor="oldPassword" className="text-xl font-semibold mb-2">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={onChange}
            className="w-96 p-2 rounded-lg focus:outline-none border-4 focus:border-indigo-600 text-black"
          />
        </div>
        <button
          type="submit"
          className="text-white px-10 py-3 text-xl font-medium bg-indigo-800 mt-8 rounded-lg"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
