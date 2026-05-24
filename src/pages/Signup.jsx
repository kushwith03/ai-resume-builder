import { useState } from "react";
import { register } from "../api/AuthService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Welcome to InstaResume!");
      navigate("/generate-resume");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-base-100 animate-fadeIn">
      <div className="card w-full max-w-md bg-base-200 border border-white/5 shadow-2xl rounded-3xl overflow-hidden">
        <div className="card-body p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Join InstaResume</h2>
            <p className="text-slate-400 text-sm">Start building your high-performance resume today</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="form-control">
              <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  className="input w-full bg-base-100 border-white/5 focus:border-primary/50 pl-12 transition-all text-sm" 
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  className="input w-full bg-base-100 border-white/5 focus:border-primary/50 pl-12 transition-all text-sm" 
                  placeholder="name@company.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  className="input w-full bg-base-100 border-white/5 focus:border-primary/50 pl-12 transition-all text-sm" 
                  placeholder="Min. 8 characters"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <button 
              className={`btn btn-primary w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 mt-4 group`} 
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
            </button>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
