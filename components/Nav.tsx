import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

const Nav = () => {
  const [session, loading] = useSession();

  const logoutUser = () => signOut();

  return (
    <div className="flex justify-around items-center h-24 w-screen bg-indigo-700 text-white">
      <Link href="/">
        <a className="text-4xl font-bold">Next Auth</a>
      </Link>
      <ul className="flex items-center space-x-12 font-semibold">
        {!loading && !session && (
          <li className="text-xl">
            <Link href="/auth">Login</Link>
          </li>
        )}
        {session && (
          <>
            <li className="text-xl">
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button
                className="text-xl px-8 py-2 rounded-xl border-4 border-gray-400"
                onClick={logoutUser}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
