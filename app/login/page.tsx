"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, Lock, Eye, EyeOff, Sparkles, 
  ArrowRight 
} from "lucide-react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Google Icon
const GoogleIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Custom GitHub Icon
const GithubIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Email & Password Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/social-studio"); // Redirect to Dashboard
      } else {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update user profile with name
        await updateProfile(userCredential.user, { displayName: name });
        router.push("/social-studio");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/social-studio");
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className={`min-h-screen bg-[#F4F7F9] flex items-center justify-center font-sans ${notoSansBengali.className} relative overflow-hidden p-4`}>
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-violet-400/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1000px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex overflow-hidden relative z-10 min-h-[600px]">
        
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-violet-600 to-indigo-700 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12 inline-flex">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">Social<span className="text-violet-200">Studio</span></span>
            </Link>

            <h1 className="text-4xl font-black leading-tight mb-6">
              The Ultimate Toolkit for Creators.
            </h1>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed">
              Schedule posts, analyze performance, and generate AI content all in one place.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-indigo-600 flex items-center justify-center font-bold text-slate-600 text-xs">U1</div>
                <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-indigo-600 flex items-center justify-center font-bold text-slate-700 text-xs">U2</div>
                <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-indigo-600 flex items-center justify-center font-bold text-slate-500 text-xs">+1K</div>
              </div>
              <p className="text-sm font-bold text-white">Join 1,000+ creators</p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8 inline-flex">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">Social<span className="text-violet-600">Studio</span></span>
          </Link>

          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {isLogin ? "Welcome back!" : "Create an account"}
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-8">
              {isLogin ? "Enter your details to access your dashboard." : "Start your 14-day free trial. No credit card required."}
            </p>

            {/* Error Message Display */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-all"
              >
                <GoogleIcon size={18} /> Google
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-all opacity-60 cursor-not-allowed"
                title="GitHub Login Coming Soon"
              >
                <GithubIcon size={18} className="text-slate-900" /> GitHub
              </button>
            </div>

            <div className="relative flex items-center py-4 mb-4">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="shrink-0 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Or continue with email</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-xl text-sm font-medium outline-none transition-all"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-xl text-sm font-medium outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-600 block">Password</label>
                  {isLogin && (
                    <Link href="#" className="text-xs font-bold text-violet-600 hover:text-violet-700">Forgot password?</Link>
                  )}
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-xl text-sm font-medium outline-none transition-all"
                    required
                    minLength={6}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 mt-6 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm font-medium text-slate-600 mt-8">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrorMsg("");
                }}
                className="ml-1.5 font-bold text-violet-600 hover:text-violet-700"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}