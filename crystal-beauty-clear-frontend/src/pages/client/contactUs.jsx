import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ loading: false, ok: false, msg: "Please fill all fields." });
      return;
    }

    setStatus({ loading: true, ok: null, msg: "" });
    try {
      // Replace /api/contact with your backend endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send. Server responded with an error.");

      setForm({ name: "", email: "", message: "" });
      setStatus({ loading: false, ok: true, msg: "Message sent. We'll get back to you soon!" });
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Failed to send message." });
    }
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-2">Contact Us</h1>
        <p className="text-slate-600 mb-6">
          Have a question or need help? Send us a message and we'll respond as soon as possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Your name"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Tell us about your question or issue..."
                required
              />
            </label>

            <div>
              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {status.loading ? "Sending..." : "Send Message"}
              </button>
            </div>

            {status.ok === true && <p className="text-sm text-green-600 mt-2">{status.msg}</p>}
            {status.ok === false && <p className="text-sm text-red-600 mt-2">{status.msg}</p>}
          </form>

          <div className="space-y-5 text-slate-700">
            <div>
              <h3 className="font-medium">Office</h3>
              <p className="text-sm">123 Main Street<br />Colombo, Sri Lanka</p>
            </div>

            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm">support@yourshop.com</p>
            </div>

            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-sm">+94 77 123 4567</p>
            </div>

            <div>
              <h3 className="font-medium">Hours</h3>
              <p className="text-sm">Mon–Fri: 9am–6pm</p>
            </div>

            <div className="mt-4">
              <iframe
                title="office-map"
                className="w-full h-48 rounded-md border"
                src="https://maps.google.com/maps?q=Colombo%20Sri%20Lanka&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
