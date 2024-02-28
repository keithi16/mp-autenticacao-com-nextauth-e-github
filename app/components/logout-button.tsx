'use client'
import { signOut } from "next-auth/react";

export default function LogoutButton() {

    function handleClick() {
        signOut();
    }

  return (
    <button onClick={handleClick} className="bg-black text-white px-10 py-2 font-light text-xl rounded-lg">Logout</button>
  )
}
