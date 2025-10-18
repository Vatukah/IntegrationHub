import { useState, useEffect } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function GmailConnect() {
  const { authFetch } = useAuthFetch();
  const [authUrl, setAuthUrl] = useState(null);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("");

  // Fetch Gmail OAuth URL from backend
  const fetchAuthUrl = async () => {
    try {
      const data = await authFetch("http://localhost:4000/api/gmail/connect");
      setAuthUrl(data.authUrl);
    } catch (err) {
      console.error(err);
      setStatus("Error fetching Gmail auth URL");
    }
  };

  const fetchGmailConnection = async()=>{

    const {data} = await authFetch("http://localhost:4000/user/getGmail",{
      method:"GET"
    })
   console.log(data)
   const isConnected =
  data?.expiry_date && new Date(data.expiry_date) > new Date();
 


    setConnected(isConnected)

  }

  // Handle OAuth callback
  

  // Detect code query param from Google OAuth redirect
  useEffect(() => {
    // fetchAuthUrl()
    fetchGmailConnection()
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Connect Your Gmail</h2>

      {connected ? (
  <div className="flex items-center gap-2 text-green-600">
   
    <span>Gmail Connected</span>
  </div>
) : (
  <button
    onClick={fetchAuthUrl}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
    Connect Gmail
  </button>
)}


     
          {authUrl && (
            <div>
              <a href={authUrl} className="text-blue-500 underline">
                Continue to Google OAuth →
              </a>
            </div>
          )}

       
      
    </div>
  );
}
