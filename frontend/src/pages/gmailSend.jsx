import { useEffect, useState } from "react";
import { useAuthState } from "../contexts/AuthContext";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { useAuth0 } from "@auth0/auth0-react";

export default function GmailSend() {
  const { authFetch } = useAuthFetch();
  const {isAuthenticated,isLoading} = useAuth0();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  useEffect(()=>{

  },[isLoading,isAuthenticated])


  const handleSend = async (e) => {
    e.preventDefault();

    if (!to || !subject || !body) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      const res = await authFetch("http://localhost:4000/api/gmail/send", {
        method: "POST",
        body: JSON.stringify({ to, subject, body }),
      });

      console.log(res)

      if (res.success) {
        setStatus("✅ Email sent successfully!");
        setTo("");
        setSubject("");
        setBody("");
      } else {
        setStatus(`❌ Email blocked: ${res.reason}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending email.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in first.</div>;

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Send Gmail</h2>

      <form onSubmit={handleSend} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Recipient Email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Email body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 rounded h-32"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Email
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-center ${
            status.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}

