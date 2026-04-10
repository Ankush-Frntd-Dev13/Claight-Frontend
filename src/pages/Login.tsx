import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ApiError } from '../api/client'

// Animated gradient orbs for the background
const BackgroundOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Large purple orb */}
    <div
      className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
      style={{
        background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
        top: '-10%',
        right: '-5%',
        animation: 'orbFloat1 20s ease-in-out infinite',
      }}
    />
    {/* Teal orb */}
    <div
      className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
      style={{
        background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
        bottom: '-10%',
        left: '-5%',
        animation: 'orbFloat2 25s ease-in-out infinite',
      }}
    />
    {/* Small accent orb */}
    <div
      className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
      style={{
        background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
        top: '50%',
        left: '30%',
        animation: 'orbFloat3 18s ease-in-out infinite',
      }}
    />
    {/* Subtle grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(124, 58, 237, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124, 58, 237, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  </div>
)

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // const [captcha, setCaptcha] = useState(generateCaptcha)
  // const [captchaInput, setCaptchaInput] = useState('')
  // const [captchaError, setCaptchaError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)

  // Redirect to the page they came from, or /intelligence
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/intelligence'

  useEffect(() => {
    if (!isAuthenticated) {
      requestAnimationFrame(() => setMounted(true))
      emailRef.current?.focus()
    }
  }, [isAuthenticated])

  // const refreshCaptcha = useCallback(() => {
  //   setCaptcha(generateCaptcha())
  //   setCaptchaInput('')
  //   setCaptchaError(false)
  // }, [])

  // If already authenticated, redirect away from login
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    // Captcha validation — only check when captcha input is enabled in the form
    // if (captchaInput !== captcha.answer) {
    //   setCaptchaError(true)
    //   return
    // }

    setIsLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiError) {
        setLoginError(err.status === 401 ? 'Invalid email or password.' : err.message)
      } else {
        setLoginError('Something went wrong. Please try again.')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0b1a] font-body relative">
      <BackgroundOrbs />

      {/* Login card */}
      <div
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        {/* Glass card */}
        <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div
            className="flex justify-center mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s',
            }}
          >
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2">
              <img
                src="https://adminportal-new.procurementresource.com/pr-logo.webp"
                alt="Precision Intel"
                className="w-48 h-12 object-contain brightness-0 invert"
              />
            </div>
          </div>

          {/* Heading */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease-out 0.25s, transform 0.7s ease-out 0.25s',
            }}
          >
            <h2 className="text-white text-2xl font-bold mb-1">Welcome back</h2>
            <p className="text-white/50 text-sm mb-7">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div
              className="mb-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease-out 0.35s, transform 0.7s ease-out 0.35s',
              }}
            >
              <label className="block text-white/60 text-xs font-medium mb-2">Email Address</label>
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-primary-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
              />
            </div>

            {/* Password */}
            <div
              className="mb-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease-out 0.45s, transform 0.7s ease-out 0.45s',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-white/60 text-xs font-medium">Password</label>
                <button type="button" className="text-primary-400 text-xs font-medium hover:text-primary-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-primary-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Captcha - commented out for now */}
            {/* <div
              className="mb-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease-out 0.55s, transform 0.7s ease-out 0.55s',
              }}
            >
              <label className="block text-white/60 text-xs font-medium mb-2">Security Check</label>
              <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 shrink-0 min-w-[130px] justify-center select-none">
                  <span className="text-sm font-mono font-bold text-primary-400 tracking-wider tabular-nums">{captcha.question}</span>
                  <span className="text-white/30 text-sm">=</span>
                  <span className="text-white/50 text-sm">?</span>
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="bg-white/[0.06] border border-white/10 rounded-xl p-2.5 text-white/40 hover:text-white/70 hover:bg-white/10 hover:border-white/20 transition-all duration-200 shrink-0"
                  title="New captcha"
                >
                  <RefreshCw size={16} />
                </button>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false) }}
                  placeholder="Answer"
                  required
                  className={`flex-1 min-w-0 bg-white/[0.06] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] ${
                    captchaError
                      ? 'border-red-500/60 focus:border-red-500/60'
                      : 'border-white/10 focus:border-primary-500/50'
                  }`}
                />
              </div>
              {captchaError && (
                <p className="text-red-400 text-xs mt-1.5 animate-pulse">Incorrect answer. Try again.</p>
              )}
            </div> */}

            {/* Login error */}
            {loginError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {loginError}
              </div>
            )}

            {/* Submit button */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease-out 0.65s, transform 0.7s ease-out 0.65s',
              }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* Bottom subtle branding */}
        <p
          className="text-center text-white/15 text-[10px] mt-4"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.7s ease-out 1s',
          }}
        >
          © 2025 Precision Intel. All rights reserved.
        </p>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.05); }
          66% { transform: translate(20px, -20px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.08); }
          66% { transform: translate(-25px, 15px) scale(0.92); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -30px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

export default Login
