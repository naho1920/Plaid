import { useState } from 'react'
import {
  Search,
  Zap,
  ShieldCheck,
  Eye,
  EyeOff,
  Check,
  Building2,
  ChevronLeft,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const banksData = [
  { id: 1,  name: 'Santander',        logo: '/Santander.png' },
  { id: 2,  name: 'Discover',         logo: '/Discover.png' },
  { id: 3,  name: 'Barclays',         logo: '/Barclays.png' },
  { id: 4,  name: 'Citibank',         logo: '/Citibank.png' },
  { id: 5,  name: 'HSBC',             logo: '/HSBC.png' },
  { id: 6,  name: 'JP Morgan',        logo: '/Jp Morgan.png' },
  { id: 7,  name: 'Credit Suisse',    logo: '/Credit suisse.png' },
  { id: 8,  name: 'Truist',           logo: '/Truist.png' },
  { id: 9,  name: 'ING Bank',         logo: '/ING Bank.png' },
  { id: 10, name: 'Mizuho',           logo: '/Mizuho.png' },
  { id: 11, name: 'Bank of America',  logo: '/Bank of america.png' },
  { id: 12, name: 'Unit Credit Bank', logo: '/Unit Credit Bank.png' },
]

// Mapeo de segmentos de barra de progreso por step
const progressConfig = {
  1: { segments: 0, active: 0 },
  2: { segments: 3, active: 1 },
  3: { segments: 3, active: 2 },
  4: { segments: 3, active: 2 },
  6: { segments: 3, active: 3 },
}

// ─── TOP NAV (barra de progreso + flecha retroceso) ───────────────────────────

function TopNav({ step, onBack }) {
  const { segments, active } = progressConfig[step] ?? { segments: 0, active: 0 }
  if (segments === 0) return null

  const canGoBack = [2, 3, 4].includes(step)

  return (
    <div className="flex items-center gap-2 mb-7">
      {canGoBack ? (
        <button
          onClick={onBack}
          className="shrink-0 w-7 h-7 -ml-1 flex items-center justify-center
                     rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100
                     transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
        </button>
      ) : (
        <div className="w-7 shrink-0" />
      )}
      <div className="flex gap-1.5 flex-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-500"
            style={{ backgroundColor: i < active ? '#0096A8' : '#E5E7EB' }}
          />
        ))}
      </div>
      <div className="w-7 shrink-0" />
    </div>
  )
}

// ─── STEP 1 — INTRO ───────────────────────────────────────────────────────────

function Step1({ onNext }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo superior */}
      <div className="flex justify-center mb-6 mt-2">
        <img
          src="/Logo pantalla 1 paso 1.png"
          alt="Kaito"
          className="w-12 h-12 rounded-xl object-contain"
        />
      </div>

      {/* Título */}
      <h1 className="text-center text-xl font-semibold text-gray-900 mb-6 leading-tight px-4">
        Kaito uses Plaid to connect your account
      </h1>

      {/* Card de beneficios */}
      <div
        className="rounded-xl border p-5 mb-auto"
        style={{ borderColor: '#E5E7EB' }}
      >
        <div className="flex gap-3 items-start">
          <div className="mt-0.5 shrink-0">
            <Zap size={17} className="text-gray-800" fill="currentColor" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900 mb-0.5">
              Connect in seconds
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Thousands of apps trust Plaid to quickly connect to financial
              institutions
            </p>
          </div>
        </div>

        <div
          className="my-4 border-t"
          style={{ borderColor: '#F3F4F6' }}
        />

        <div className="flex gap-3 items-start">
          <div className="mt-0.5 shrink-0">
            <ShieldCheck size={17} className="text-gray-800" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900 mb-0.5">
              Keep your data safe
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Plaid uses best-in-class encryption to help protect your data
            </p>
          </div>
        </div>
      </div>

      {/* Texto legal */}
      <p className="text-xs text-center text-gray-400 mt-6 mb-4 leading-relaxed px-2">
        By continuing, you agree to Plaid&apos;s{' '}
        <span className="underline cursor-pointer">Privacy Policy</span> and to
        receiving updates on plaid.com
      </p>

      {/* Botón Continue */}
      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl font-semibold text-white text-sm
                   transition-opacity hover:opacity-90 active:opacity-75"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        Continue
      </button>
    </div>
  )
}

// ─── STEP 2 — SELECT INSTITUTION ─────────────────────────────────────────────

function Step2({ onSelectBank, search, setSearch }) {
  const filtered = banksData.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full min-h-0">
      <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
        Select your institution
      </h2>

      {/* Barra de búsqueda */}
      <div
        className="flex items-center gap-2.5 border rounded-xl px-3.5 py-3 mb-4 shrink-0"
        style={{ borderColor: '#E5E7EB' }}
      >
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>

      {/* Grid de bancos con scroll */}
      <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1 bank-scroll">
        {filtered.map((bank) => (
          <BankCard key={bank.id} bank={bank} onSelect={onSelectBank} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center text-sm text-gray-400 py-8">
            No institutions found
          </div>
        )}
      </div>
    </div>
  )
}

function BankCard({ bank, onSelect }) {
  const [imgError, setImgError] = useState(false)

  return (
    <button
      onClick={() => onSelect(bank)}
      className="border rounded-xl p-3 flex flex-col items-center justify-center
                 min-h-[76px] hover:bg-gray-50 hover:border-gray-300
                 active:bg-gray-100 transition-colors text-center"
      style={{ borderColor: '#E5E7EB' }}
    >
      {!imgError ? (
        <img
          src={bank.logo}
          alt={bank.name}
          className="max-h-8 max-w-[100px] object-contain mb-1.5"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5"
          style={{ backgroundColor: '#EBF9FA' }}
        >
          <Building2 size={16} style={{ color: '#0096A8' }} />
        </div>
      )}
      <span className="text-xs text-gray-500 leading-tight">{bank.name}</span>
    </button>
  )
}

// ─── STEP 3 — LOGIN ───────────────────────────────────────────────────────────

function Step3({ bank, username, setUsername, password, setPassword, showPassword, setShowPassword, onSubmit }) {
  const canSubmit = username.trim().length > 0 && password.trim().length > 0

  return (
    <div className="flex flex-col h-full">
      {/* Ícono del banco */}
      <div className="flex justify-center mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: '#EBF9FA' }}
        >
          <Building2 size={26} style={{ color: '#0096A8' }} />
        </div>
      </div>

      {/* Título y subtítulo */}
      <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
        Log into {bank?.name}
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6 leading-relaxed px-2">
        Enter your{' '}
        <strong className="text-gray-800 font-semibold">{bank?.name}</strong>{' '}
        credentials to connect your account to Kaito.
      </p>

      {/* Input Online ID con label flotante */}
      <div className="relative mb-3">
        <div
          className="border rounded-xl overflow-hidden"
          style={{ borderColor: '#E5E7EB' }}
        >
          <label
            className="absolute top-2.5 left-4 text-[11px] text-gray-400 pointer-events-none"
          >
            Online ID
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 pb-3 outline-none text-sm text-gray-900
                       bg-transparent focus:ring-0"
            style={{ paddingTop: '26px' }}
          />
        </div>
      </div>

      {/* Input Password con eye toggle */}
      <div
        className="border rounded-xl flex items-center mb-5"
        style={{ borderColor: '#E5E7EB' }}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 px-4 py-3.5 outline-none text-sm text-gray-900
                     placeholder-gray-400 bg-transparent"
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="px-4 py-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>

      {/* Texto legal */}
      <p className="text-xs text-center text-gray-400 leading-relaxed px-1 mb-4">
        By providing your credentials, you let Plaid access your financial data
        and agree Plaid or your institution may text you a passcode per{' '}
        <span className="underline cursor-pointer">our</span> or their SMS terms.
      </p>

      <div className="flex-1" />

      {/* Botón Submit */}
      <button
        onClick={canSubmit ? onSubmit : undefined}
        className="w-full py-4 rounded-xl font-semibold text-white text-sm
                   transition-all duration-200 mb-3"
        style={{
          backgroundColor: canSubmit ? '#1A1A1A' : '#9CA3AF',
          cursor: canSubmit ? 'pointer' : 'default',
        }}
      >
        Submit
      </button>

      {/* Reset password */}
      <button className="w-full text-center text-sm font-medium text-gray-700
                         py-1 hover:text-gray-900 transition-colors">
        Reset password
      </button>
    </div>
  )
}

// ─── STEP 4 — SELECT ACCOUNTS ─────────────────────────────────────────────────

function Step4({ bank, accountChecked, setAccountChecked, onContinue }) {
  return (
    <div className="flex flex-col h-full">
      {/* Título y subtítulo */}
      <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
        Select accounts
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6 leading-relaxed px-2">
        Plaid will only share data from the{' '}
        <strong className="text-gray-800 font-semibold">{bank?.name}</strong>{' '}
        accounts you select with Kaito.
      </p>

      {/* Fila de cuenta clickeable */}
      <button
        onClick={() => setAccountChecked((v) => !v)}
        className="flex items-center gap-3.5 border rounded-xl p-4
                   hover:border-gray-300 hover:bg-gray-50
                   active:bg-gray-100 transition-colors text-left w-full"
        style={{ borderColor: '#E5E7EB' }}
      >
        {/* Checkbox custom */}
        <div
          className="w-5 h-5 rounded-md border-2 shrink-0 flex items-center
                     justify-center transition-all duration-150"
          style={{
            borderColor: accountChecked ? '#5B6CF9' : '#D1D5DB',
            backgroundColor: accountChecked ? '#5B6CF9' : 'transparent',
          }}
        >
          {accountChecked && (
            <Check size={11} color="white" strokeWidth={3} />
          )}
        </div>

        <span className="flex-1 text-sm font-medium text-gray-900">
          Checking • 8492
        </span>

        <span className="text-sm font-medium text-gray-900 shrink-0">
          $3,815.27
        </span>
      </button>

      <div className="flex-1" />

      {/* Texto legal */}
      <p className="text-xs text-center text-gray-400 leading-relaxed mb-4 px-1">
        You&apos;ll share contact info, account and balance info, account and routing
        number, transactions, and risk info to help you get considered for
        credit. Plaid may also use device and connection info to help minimize
        risk, fraud, and loss.{' '}
        <span className="underline cursor-pointer">Learn more.</span>
      </p>

      {/* Botón Continue */}
      <button
        onClick={accountChecked ? onContinue : undefined}
        className="w-full py-4 rounded-xl font-semibold text-white text-sm
                   transition-all duration-200"
        style={{
          backgroundColor: accountChecked ? '#1A1A1A' : '#9CA3AF',
          cursor: accountChecked ? 'pointer' : 'default',
        }}
      >
        Continue
      </button>
    </div>
  )
}

// ─── STEP 6 — SUCCESS ────────────────────────────────────────────────────────

function Step6({ onRestart }) {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      {/* Ícono check animado */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 check-bounce"
        style={{ backgroundColor: '#EBF9FA' }}
      >
        <Check size={28} style={{ color: '#0096A8' }} strokeWidth={2.5} />
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">Success</h2>
      <p className="text-sm text-gray-500 text-center leading-relaxed px-6">
        Your account has been successfully linked to Kaito
      </p>

      <div className="flex-1" />

      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-semibold text-white text-sm
                   hover:opacity-90 active:opacity-75 transition-opacity"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        Continue
      </button>
    </div>
  )
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep]                     = useState(1)
  const [selectedBank, setSelectedBank]     = useState(null)
  const [username, setUsername]             = useState('')
  const [password, setPassword]             = useState('')
  const [showPassword, setShowPassword]     = useState(false)
  const [accountChecked, setAccountChecked] = useState(false)
  const [search, setSearch]                 = useState('')

  function handleSelectBank(bank) {
    setSelectedBank(bank)
    setStep(3)
  }

  function handleSubmitLogin() {
    setStep(4)
  }

  function handleContinueAccounts() {
    setStep(6)
  }

  function handleRestart() {
    setStep(1)
    setSelectedBank(null)
    setUsername('')
    setPassword('')
    setShowPassword(false)
    setAccountChecked(false)
    setSearch('')
  }

  function handleBack() {
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
    else if (step === 4) setStep(3)
  }

  const minHeight = step === 2 ? '560px' : '520px'

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
      {/* Contenedor central */}
      <div
        className="w-full bg-white rounded-2xl flex flex-col"
        style={{
          maxWidth: '440px',
          minHeight,
          padding: '28px 24px 24px',
          border: '1px solid #F3F4F6',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        }}
      >
        {/* Barra de progreso + flecha retroceso */}
        <TopNav step={step} onBack={handleBack} />

        {/* Contenido animado del step activo */}
        <div
          key={step}
          className="step-animate flex flex-col flex-1"
        >
          {step === 1 && (
            <Step1 onNext={() => setStep(2)} />
          )}

          {step === 2 && (
            <Step2
              onSelectBank={handleSelectBank}
              search={search}
              setSearch={setSearch}
            />
          )}

          {step === 3 && (
            <Step3
              bank={selectedBank}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onSubmit={handleSubmitLogin}
            />
          )}

          {step === 4 && (
            <Step4
              bank={selectedBank}
              accountChecked={accountChecked}
              setAccountChecked={setAccountChecked}
              onContinue={handleContinueAccounts}
            />
          )}

          {step === 6 && (
            <Step6 onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  )
}
