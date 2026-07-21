import React from 'react';
import { toast } from 'react-toastify';

export default function Contact() {
  const submit = (e) => {
    e.preventDefault();
    toast.success('Message sent — our team will reach out shortly');
  };

  return (
    <div className="container section" style={{ maxWidth: 560 }}>
      <h2>Contact Us</h2>
      <p className="text-muted mt-8">Questions about a plan or claim? Send us a message.</p>

      <form className="card mt-24" style={{ padding: 24 }} onSubmit={submit}>
        <div className="field"><label>Name</label><input required placeholder="Your name" /></div>
        <div className="field"><label>Email</label><input required type="email" placeholder="you@example.com" /></div>
        <div className="field"><label>Message</label><textarea required rows={5} style={{ padding: 11, borderRadius: 8, border: '1.5px solid var(--gray-300)' }} /></div>
        <button className="btn btn-primary mt-24" type="submit">Send Message</button>
      </form>
    </div>
  );
}
