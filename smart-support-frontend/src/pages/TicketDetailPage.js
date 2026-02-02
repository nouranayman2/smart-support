import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicket, submitFeedback } from "../api/ticketsApi";

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await getTicket(id);
      setTicket(data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [id]);

  async function handleFeedback(accepted) {
    setErr("");
    setSaving(true);
    try {
      await submitFeedback(id, accepted);
      await load(); // refresh ticket to show updated feedback_accepted
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ padding: 32, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ fontSize: 56, margin: 0 }}>Ticket Detail</h1>
        <button
          onClick={() => navigate("/tickets")}
          style={{
            marginLeft: "auto",
            padding: "10px 14px",
            borderRadius: 10,
            cursor: "pointer",
            border: "1px solid #ccc",
            background: "white",
          }}
        >
          ← Back
        </button>
      </div>

      {err && <div style={{ color: "crimson", marginTop: 16 }}>{err}</div>}

      {loading ? (
        <div style={{ marginTop: 16 }}>Loading…</div>
      ) : !ticket ? (
        <div style={{ marginTop: 16 }}>No ticket found.</div>
      ) : (
        <div style={{ marginTop: 24 }}>
          <GridRow label="Full Original Message:">
            <div style={bigBox}>{ticket.message}</div>
          </GridRow>

          <GridRow label="Generated summary:">
            <div style={smallBox}>{ticket.summary}</div>
          </GridRow>

          <GridRow label="Category:">
            <div style={smallBox}>{ticket.category}</div>
          </GridRow>

          <GridRow label="Priority:">
            <div style={smallBox}>{ticket.priority}</div>
          </GridRow>

          <GridRow label="Suggested Reply:">
            <div style={smallBox}>{ticket.suggested_reply}</div>
          </GridRow>

          <GridRow label="Feedback:">
            <div style={smallBox}>
              {ticket.feedback_accepted === null
                ? "No feedback yet"
                : ticket.feedback_accepted
                ? "Accepted"
                : "Rejected"}
            </div>
          </GridRow>

          <GridRow label="Actions:">
            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={() => handleFeedback(false)}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: 12,
                  border: "none",
                  background: "#b00000",
                  color: "white",
                  fontSize: 18,
                  cursor: "pointer",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                Reject suggestion
              </button>

              <button
                onClick={() => handleFeedback(true)}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: 12,
                  border: "none",
                  background: "green",
                  color: "white",
                  fontSize: 18,
                  cursor: "pointer",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                Accept Suggestion
              </button>
            </div>
          </GridRow>
        </div>
      )}
    </div>
  );
}

function GridRow({ label, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20, marginTop: 20 }}>
      <div style={{ fontSize: 18, alignSelf: "center" }}>{label}</div>
      {children}
    </div>
  );
}

const bigBox = {
  border: "1px solid #ddd",
  borderRadius: 14,
  padding: 18,
  minHeight: 170,
  whiteSpace: "pre-wrap",
};

const smallBox = {
  border: "1px solid #ddd",
  borderRadius: 14,
  padding: 14,
};
