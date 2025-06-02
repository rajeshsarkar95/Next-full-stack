import React from "react";

interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function userProfile({ params }: UserProfileProps) {
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>
        profile page
        <span>{params.id}</span>
      </p>
    </div>
  );
}
