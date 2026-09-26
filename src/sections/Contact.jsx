import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { profile } from "../constants";

// Messages are delivered to your inbox by FormSubmit (https://formsubmit.co),
// which needs no account: the first message triggers a one-time activation
// email to profile.email. If EmailJS keys are set in .env (see .env.example),
// EmailJS is used instead.
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const useEmailJS = Boolean(EMAILJS.service && EMAILJS.template && EMAILJS.publicKey);

// Web3Forms (https://web3forms.com): free, no activation link. The access key
// is designed to be public, so it's fine in frontend code.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

async function sendWithWeb3Forms({ name, email, message }) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Portfolio message from ${name}`,
      from_name: "Portfolio contact form",
      name,
      email,
      message,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
}

async function sendWithFormSubmit({ name, email, message }) {
  const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio message from ${name}`,
      _template: "table",
      _captcha: "false",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== "true") {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
}

async function sendWithEmailJS({ name, email, message }) {
  await emailjs.send(
    EMAILJS.service,
    EMAILJS.template,
    {
      from_name: name,
      to_name: profile.shortName,
      from_email: email,
      to_email: profile.email,
      message,
    },
    EMAILJS.publicKey
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const send = WEB3FORMS_KEY
        ? sendWithWeb3Forms
        : useEmailJS
          ? sendWithEmailJS
          : sendWithFormSubmit;
      await send(formData);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent! I'll get back to you soon.");
    } catch (error) {
      console.error(error);
      // FormSubmit replies "needs activation" until the site owner clicks the
      // one-time link it emails to profile.email; visitors get a direct fallback.
      showAlertMessage(
        "danger",
        `Couldn't send your message right now. Please email me directly at ${profile.email}.`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="relative flex items-center c-space section-spacing" id="contact">
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Hiring for an internship, building something with AI, or just want
            to talk tech? Drop me a message and I'll get back to you.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
