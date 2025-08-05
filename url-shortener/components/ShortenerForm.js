import React, { useState } from "react";
import axios from "axios";

export default function ShortenerForm() {
  const [form, setForm] = useState({});
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/api/url", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shortener-form">
      <input
        placeholder="Original URL"
        onChange={(e) => setForm({ ...form, originalUrl: e.target.value })}
        required
      />
      <input
        placeholder="Custom shortcode (optional)"
        onChange={(e) => setForm({ ...form, customCode: e.target.value })}
      />
      <input
        placeholder="Validity in days (default 30)"
        onChange={(e) => setForm({ ...form, validityDays: e.target.value })}
        type="number"
        min="1"
      />
      <button type="submit">Shorten</button>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
    </form>
  );
}
