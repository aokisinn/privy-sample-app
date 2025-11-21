"use client";

import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const {
    ready,
    authenticated,
    user,
    createWallet,
    logout,
  } = usePrivy();


  const { initOAuth } = useLoginWithOAuth();

  const handleLogin = async () => {
    await initOAuth({
      provider: "google",
    });
  };

  const handleCreateWallet = async () => {
    await createWallet();
  }

  const handleGetAccount = async () => {
    try {
      const response = await fetch('/api/account');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error getting account:', error);
    }
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl">
        {authenticated ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl font-bold">Authenticated</p>
            {/* 500pxのボックス */}
            <div className="w-[500px] h-[500px] bg-zinc-200 rounded-md p-4">
              <p className="text-lg text-black">{JSON.stringify(user)} </p>
            </div>
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={handleCreateWallet}
            >
              Create Wallet
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={logout}
            >
              Logout
            </button>
            <button
              className="bg-yellow-500 text-white p-2 rounded-md"
              onClick={handleGetAccount}
            >
              Get Account
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl font-bold">Not authenticated</p>
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
