import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../api/ticketsApi";

export default function CreateTicketPage() {


    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    

    async function onSubmit(event) {
        event.preventDefault();
        setErr("");
        setLoading(true);

    
    try {
        const created = await createTicket({
            subject,
            from_email: fromEmail,
            message,
        })

        navigate(`/tickets/${created.id}`);
    }
    catch(error){
        setErr(error.message)
    } finally {
       
     setLoading(false);
    }  
          
    }

    function onCancel() {
    navigate("/tickets");
  }


    return(
     <div style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 56, margin: 0 }}>Create Ticket</h1>

      <form onSubmit={onSubmit} style={{ marginTop: 32, maxWidth: 900 }}>
        <Row label="Subject:">
            <input 
            value={ subject}
            onChange={(event) => setSubject(event.target.value)}
            style={inputStyle}
            required
            />
            </Row>
            <Row label="Sender Email:">
                <input
                value= {fromEmail}
                onChange = {(event) => setFromEmail(event.target.value)}
                style={inputStyle}
                required 
                />

            </Row>

            <Row label="Message Body:">
                 <textarea
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 style={{ ...inputStyle, height: 220, resize: "vertical" }}
                 required  
          />
        </Row>

        {err && <div style = {{ color: "crimson", marginTop: 12}}>{err}</div>}

         <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 14,
            marginTop: 24,
          }}
        >
          <button
            type="button" 
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: "14px 22px",
              borderRadius: 12,
              border: "none",
              background: "crimson",
              color: "white",
              fontSize: 18,
              cursor: "pointer",
              minWidth: 180,
              opacity: loading ? 0.7 : 1,
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px 22px",
              borderRadius: 12,
              border: "none",
              background: "green",
              color: "white",
              fontSize: 18,
              cursor: "pointer",
              minWidth: 250,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </div>

      </form>


    </div>
  )



}




const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 16,
};

function Row({ label, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16, marginTop: 24 }}>
      <div style={{ fontSize: 18, alignSelf: "center" }}>{label}</div>
      {children}
    </div>
  );
}


    