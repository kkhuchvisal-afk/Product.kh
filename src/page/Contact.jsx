import { useState } from "react";

// Placeholder details: replace with your real contact info
const info = [
  { label: "Email", value: "help@velocity.example" },
  { label: "Phone", value: "+1 (555) 010-0199" },
  { label: "Hours", value: "Mon–Fri, 9am–6pm" },
];

const topics = ["Order help", "Returns & exchanges", "Sizing advice", "Something else"];

const faqs = [
  { q: "How fast do you ship?", a: "Orders placed before 2pm are dispatched within 24 hours. Orders over $100 ship free." },
  { q: "What is your returns policy?", a: "You have 30 days to return unworn shoes for any reason." },
  { q: "How do I find my size?", a: "Check the size guide on any product page, and if you're between sizes we recommend going up half a size." },
];

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const fieldClass = (error) =>
  `w-full border bg-white px-3.5 py-3 text-[13px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#ff5a1f] ${
    error ? "border-red-500" : "border-neutral-300"
  }`;

const Contact = ({ onSubmit }) => {
  const [values, setValues] = useState({ name: "", email: "", topic: topics[0], message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | failed

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!isEmail(values.email.trim())) next.email = "Please enter a valid email.";
    if (values.message.trim().length < 10) next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    try {
      await onSubmit?.(values);
      setStatus("success");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      <p className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
        <span className="h-px w-6 bg-[#ff5a1f]" />
        Get in touch
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Contact us</h1>
      <p className="mt-2 max-w-md text-[13px] text-neutral-500">Questions about an order, a size or a pair? We usually reply within one business day.</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Info + FAQ */}
        <div>
          <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
            {info.map((i) => (
              <div key={i.label} className="flex items-center justify-between py-4 text-[13px]">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{i.label}</dt>
                <dd className="font-medium text-neutral-900">{i.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mb-3 mt-8 text-[15px] font-bold text-neutral-900">Quick answers</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-3.5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] font-medium text-neutral-900 transition-colors hover:text-[#ff5a1f]">
                  {f.q}
                  <span className="ml-3 text-lg leading-none text-neutral-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-neutral-50 p-6 sm:p-8">
          {status === "success" ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#ff5a1f] text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Message sent</h2>
              <p className="mt-1 max-w-xs text-[12px] text-neutral-500">Thanks {values.name.split(" ")[0]}, we'll get back to you at {values.email} soon.</p>
              <button
                onClick={() => {
                  setValues({ name: "", email: "", topic: topics[0], message: "" });
                  setStatus("idle");
                }}
                className="mt-5 text-[11px] font-bold text-neutral-900 underline underline-offset-4 hover:text-[#ff5a1f]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Name</label>
                  <input id="name" value={values.name} onChange={set("name")} placeholder="Your name" className={fieldClass(errors.name)} />
                  {errors.name && <p className="mt-1 text-[10px] font-medium text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Email</label>
                  <input id="email" type="email" value={values.email} onChange={set("email")} placeholder="you@email.com" className={fieldClass(errors.email)} />
                  {errors.email && <p className="mt-1 text-[10px] font-medium text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="topic" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Topic</label>
                <select id="topic" value={values.topic} onChange={set("topic")} className={fieldClass(false)}>
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Message</label>
                <textarea id="message" rows={6} value={values.message} onChange={set("message")} placeholder="How can we help?" className={`${fieldClass(errors.message)} resize-none`} />
                {errors.message && <p className="mt-1 text-[10px] font-medium text-red-600">{errors.message}</p>}
              </div>

              {status === "failed" && <p className="text-[11px] font-medium text-red-600">Something went wrong. Please try again.</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#ff5a1f] py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14] disabled:opacity-60 sm:w-auto sm:px-10"
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;