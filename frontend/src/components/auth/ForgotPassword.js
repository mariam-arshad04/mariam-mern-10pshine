import { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("OTP feature coming soon!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
      <button type="submit">Send OTP</button>
    </form>
  );
}

export default ForgotPassword;
