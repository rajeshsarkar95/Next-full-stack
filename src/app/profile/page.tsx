"use client";

import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface ApiResponse {
  data: User;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logout = async (): Promise<void> => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      } else {
        console.error("Logout failed: Unknown error");
      }
    }
  };

  const getUserDetails = async (): Promise<void> => {
    try {
      const res: AxiosResponse<ApiResponse> = await axios.get("/api/users/me");
      console.log("User Data:", res.data);
      setUser(res.data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching user:", err.message);
      } else {
        console.error("Error fetching user: Unknown error");
      }
      toast.error("Failed to fetch user");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <h2 className="text-white mb-2">
        {user ? (
          <div className="text-white space-y-2">
            <p>
              <strong>ID:</strong>{" "}
              <Link href={`/profile/${user._id}`}>{user._id}</Link>
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-white">Nothing to show</p>
        )}
      </h2>
      <hr className="my-4" />
      <p>Welcome to your profile page.</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
