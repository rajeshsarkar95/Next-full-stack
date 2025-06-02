"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

function pages() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const onsignup = async () => {};

  return (
    <div>
      <label htmlFor="username">username</label>
      <input 
      id="username" 
      type="text"
      value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})}
      placeholder="username"
       />
      <label htmlFor="email">emails</label>
      <input 
      id="email" 
      type="text"
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder="emails"
       />
      <label htmlFor="email">emails</label>
      <input 
      id="email" 
      type="text"
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder="password"
       />
    </div>
  );
}
export default pages;
