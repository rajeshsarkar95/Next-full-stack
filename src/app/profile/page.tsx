"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message || "Logout failed");
    }
  };
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("User Data:", res.data);
      setUser(res.data.data); 
    } catch (err: any) {
      console.error("Error fetching user:", err.message);
      toast.error("Failed to fetch user");
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <h2 className="text-white mb-2">
        {user ? (
         <div className="text-white space-y-2">
          <p><strong>ID:</strong> <Link href={`/profile/${user._id}`}>{user._id}</Link></p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        ) : (
          <p className="text-white">Nothing to show</p>
        )}
      </h2>
      <hr className="my-4" />
      <p>Welcome to your profile page.</p>
      <div className="mt-4 space-x-2">
        <button onClick={logout} className="bg-red-600 text-white px-4 py-1 rounded">
          Logout
        </button>
        <button onClick={getUserDetails} className="bg-blue-600 text-white px-4 py-1 rounded">
          Get User Details
        </button>
      </div>
    </div>
  );
}
