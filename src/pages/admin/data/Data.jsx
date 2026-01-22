<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "./data.scss";

const API = "http://localhost:5000/api/bookings";

const branches = [
  { id: "Tashkent", name: "Tashkent Airport" },
  { id: "Bukhara", name: "Bukhara" },
  { id: "India", name: "India" },
];

const Data = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    branch: "airport",
    capsuleType: "family", // ✅ backendga mos
    date: "",
    time: "",
    duration: 4, // ✅ number bo‘lishi kerak
  });

  /* ===== LOAD BOOKINGS ===== */

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  /* ===== ADD BOOKING ===== */

  const addBooking = async () => {
    if (!form.date || !form.time) {
      alert("Date & time required");
      return;
    }

    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch: form.branch,
          capsuleType: form.capsuleType,
          date: form.date,
          time: form.time,
          duration: Number(form.duration),
        }),
      });

      setForm({ ...form, date: "", time: "" });
      loadBookings();
    } catch (err) {
      alert("Insert failed");
    }
  };

  /* ===== DELETE BOOKING ===== */

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadBookings();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin">
      <h1 className="admin__title">Admin — Capsule Bookings</h1>

      <div className="container">
        {/* ================= FORM ================= */}
        <div className="admin__form">
          <div className="admin__row">
            <label>Branch</label>
            <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin__row">
            <label>Capsule Type</label>
            <select
              value={form.capsuleType}
              onChange={(e) =>
                setForm({ ...form, capsuleType: e.target.value })
              }
            >
              <option value="family">Family Capsule</option>
              <option value="standard">Standard Capsule</option>
            </select>
          </div>

          <div className="admin__grid">
            <div className="admin__row">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="admin__row">
              <label>Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
          </div>

          <div className="admin__row">
            <label>Duration</label>
            <select
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: Number(e.target.value) })
              }
            >
              <option value={4}>Up to 4 hours</option>
              <option value={6}>Up to 6 hours</option>
              <option value={10}>Up to 10 hours</option>
            </select>
          </div>

          <button className="admin__add-btn" onClick={addBooking}>
            Add Booking
          </button>
        </div>

        {/* ================= LIST ================= */}
        <div className="admin__list">
          {loading && <p className="admin__loading">Loading...</p>}

          {!loading && bookings.length === 0 && (
            <p className="admin__empty">No bookings yet</p>
          )}

          {bookings.map((b) => (
            <div key={b.id} className="admin__card">
              <div>
                <span>Branch</span>
                <b>
                  {branches.find((x) => x.id === b.branch)?.name || b.branch}
                </b>
              </div>

              <div>
                <span>Capsule</span>
                <b>{b.capsuleType}</b>
              </div>

              <div>
                <span>Date</span>
                <b>{b.date}</b>
              </div>

              <div>
                <span>Time</span>
                <b>{b.time}</b>
              </div>

              <div className="admin__duration">
                <span>Duration</span>
                <b>{b.duration}h</b>
              </div>

              <button
                className="admin__delete-btn"
                onClick={() => deleteBooking(b.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
=======
import React from 'react'

const Data = () => {
  return (
    <div></div>
  )
}

export default Data
>>>>>>> 7394a65e5d184348042a5154ab1e22463af714f1
