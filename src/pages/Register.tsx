
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(name, email, password);
      setSuccess("Registration successful! Redirecting to login...");
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError("Registration failed");
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className="font-display h-full bg-background-light">
      <div className="flex min-h-screen flex-1">
       
        <div className="relative hidden w-0 flex-1 lg:block">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAqPe4Cq5M5_t9TIfxIfgnqU3BXebcj9lY32PV3ymH_mz0t-rsJOIxCjiO6_HinsIAFc5cypG_IiFYPKPde5wIk8UzaoVDrD8Xh9CZ40bTNlqbYcgUj2G6WFz7SU06C3HS3_Ha9ceB2qHpIHp3CCGTvbGjSmWrtYXlHx_ojszs7ks3yFWpIYCWaBsOtf84iC9HpfhR-kqZ_UAPWLdDyk_H4tcoJdk5HQ8axMUdbr1PQP4YWvGEegEGxXjxkFDQpIt52iVNZpVGzcI')",
            }}
            data-alt="Modern office interior with glass walls and professional atmosphere"
          ></div>
         
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-blue-600/60 mix-blend-multiply"></div>
         
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white z-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-blue-600 aspect-square rounded-lg size-10 flex items-center justify-center text-white">
             
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Issue Tracker</h2>
            </div>
            <p className="text-lg text-gray-200">This platform has completely transformed how our team handles bug tracking. It's intuitive, fast, and reliable.</p>
          </div>
        </div>
    
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
          <div className="mx-auto w-full max-w-sm lg:w-96">
          
            <div className="flex lg:hidden justify-center mb-6">
              <div className="size-10 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>
        
            <div>
              <h1 className="text-[#111318] tracking-light text-[32px] font-bold leading-tight text-center pb-2">Create your account</h1>
              <p className="text-[#616f89] text-base font-normal leading-normal text-center pb-8">Register to start tracking issues</p>
            </div>
        
            <div className="mt-2">
              {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
              {success && <div className="text-green-500 mb-4 text-center">{success}</div>}
              <form onSubmit={handleSubmit} className="space-y-6" method="POST">
               
                <div>
                  <label className="block" htmlFor="name">
                    <p className="text-[#111318] text-base font-medium leading-normal pb-2">Name</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] bg-white focus:outline-none border border-[#dbdfe6] focus:border-gray-300 h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                </div>
            
                <div>
                  <label className="block" htmlFor="email">
                    <p className="text-[#111318] text-base font-medium leading-normal pb-2">Email address</p>
                    <div className="flex w-full items-stretch rounded-lg shadow-sm">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] bg-white focus:outline-none border border-[#dbdfe6] focus:border-gray-300 h-14 placeholder:text-[#616f89] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="text-[#616f89] flex border border-[#dbdfe6] bg-white items-center justify-center pr-[15px] pl-2 rounded-r-lg border-l-0">
                       
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              
                <div>
                  <label className="block" htmlFor="password">
                    <p className="text-[#111318] text-base font-medium leading-normal pb-2">Password</p>
                    <div className="flex w-full items-stretch rounded-lg shadow-sm">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] bg-white focus:outline-none border border-[#dbdfe6] focus:border-gray-300 h-14 placeholder:text-[#616f89] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="flex items-center border border-[#dbdfe6] bg-white rounded-r-lg border-l-0 pl-2 pr-2">
                        <button
                          type="button"
                          tabIndex={-1}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="ml-2 focus:outline-none"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                        
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#616f89]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0 0 12 15a3 3 0 0 0 2.828-2.123m-4.35-4.35A3 3 0 0 1 12 9a3 3 0 0 1 2.828 2.123M21.75 12c-.443 1.294-1.21 2.68-2.252 4.066C17.244 18.338 13.756 21 12 21c-1.756 0-5.244-2.662-7.498-4.934C3.46 14.68 2.693 13.294 2.25 12c.443-1.294 1.21-2.68 2.252-4.066C6.756 5.662 10.244 3 12 3c1.756 0 5.244 2.662 7.498 4.934C20.54 9.32 21.307 10.706 21.75 12z" />
                            </svg>
                          ) : (
                          
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#616f89]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.226 7.662 7.244 4.5 12 4.5c4.756 0 8.773 3.162 9.75 7.5-.977 4.338-4.995 7.5-9.75 7.5-4.756 0-8.773-3.162-9.75-7.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </label>
                </div>
              
                <div>
                  <button
                    className="flex w-full h-14 items-center justify-center rounded-lg bg-blue-500 px-4 text-base font-bold leading-normal text-white shadow-sm hover:bg-blue-600 focus-visible:outline-none transition-all duration-200"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
           
              <div className="relative mt-8">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#dbdfe6]"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-4 text-[#616f89]">or</span>
                </div>
              </div>
           
              <div className="mt-6 text-center">
                <p className="text-[#616f89] text-base">
                  Already have an account?{' '}
                  <a className="font-semibold text-blue-500 hover:text-blue-700 transition-colors" href="/login">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
