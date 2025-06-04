// File: src/app/profile/[id]/page.tsx

import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}
export default function UserProfilePage({ params }: PageProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profile Page</h1>
      <p className="text-white">User ID: {params.id}</p>
    </div>
  );
}
