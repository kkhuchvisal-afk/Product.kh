import { useState } from "react";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Newsletter = ({
  eyebrow = "STAY IN THE LOOP",
  title = "Get first dibs on every drop.",
  description = "New releases, early access and members-only offers. No spam, unsubscribe anytime.",
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | loading | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await onSubmit?.(email.trim());
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="mb-3 text-[7px] font-bold uppercase tracking-[0.15em] text-orange-600">{eyebrow}</p>
        <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 sm:text-[34px]">{title}</h2>
        <p className="mt-3 max-w-md text-[11px] leading-relaxed text-neutral-500">{description}</p>

        {status === "success" ? (
          <div className="mt-6 flex items-center gap-2 rounded-full bg-neutral-100 px-5 py-3 text-[11px] font-bold text-neutral-900">
            <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 5 5 9-10" />
            </svg>
            You're in. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 w-full max-w-md">
            <div
              className={`flex items-center gap-2 rounded-full border bg-white p-1 pl-5 transition focus-within:border-blue-600 ${
                status === "error" ? "border-orange-500" : "border-neutral-300"
              }`}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email"
                aria-label="Email address"
                aria-invalid={status === "error"}
                className="h-9 flex-1 bg-transparent text-[12px] text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-9 rounded-full bg-blue-600 px-5 text-[11px] font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Subscribe"}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-2 text-left text-[10px] font-medium text-orange-600">Please enter a valid email address.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;