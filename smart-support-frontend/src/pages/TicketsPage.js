import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTickets } from "../api/ticketsApi";

const CATEGORIES = ["", "Billing", "Bug", "Feature", "Account", "Other"];
const PRIORITIES = ["", "Low", "Medium", "High"];

export default function TicketsPage() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");


    async function load() {
        setErr("");
        setLoading(true);

        try{
            const data = await listTickets({
                category: category || undefined,
                priority: priority || undefined,
            });
            setTickets(data);
        }
        catch(e) {
            setErr(e.message);
        }
        finally {
      setLoading(false);
    }
        
    }
    useEffect(() => {
        load();
    }, [category, priority]);

    return (
        <div style={{ padding: 32, fontFamily: "system-ui"}}>
            <div style={{ display: "flex", alignItems: "center", gap: 30}}>
                <h1 style={{ fontSize: 60, margin:0}}>Tickets</h1>


            <div style ={{ display: "flex", alignItems: "center", gap :20}}>
                <div style={{ fontSize: 20}}>Filter</div>

            <div>
                 <div style={{ fontSize: 12, opacity: 0.6 }}>By Category</div>
            <select
            value = {category}
            onChange={(event) => setCategory(event.target.value)}
             style={{ padding: 12, borderRadius: 10, minWidth: 200 }}
             >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c || "All"}
                </option>
              ))}
            </select>
            </div>

            <div>
                <div style = {{ fontSize: 12, opacity: 0.6 }}>By Priority</div>
                <select 
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                style= {{ padding: 12, borderRadius: 10, minWidth: 200}}
                >

              {     PRIORITIES.map((p) => (
                <option key={p} value={p}>
                    {p || "All"}
                    </option>  
                
              ))}
              </select>
            </div>

            </div>
            <button
            onClick={() => navigate("/tickets/new")}
            style={{
              marginLeft: "auto",
              padding: "14px 22px",
              borderRadius: 12,
              border: "none",
              background: "#ff7a00",
              color: "white",
              fontSize: 18,
              cursor: "pointer",
          }}>
            +Add Ticket
          </button>
           </div>

           {err && <div style={{ marginTop: 16, color: "crimson" }}>{err}</div>}

           <div style ={{marignTop: 24 }}>
           {loading ? (
            <div>Loading..</div>
           ) : tickets.length === 0? (
            <div>No tickets yet.</div>
        ) : (
            tickets.map((t) => (
            <div
              key={t.id}
              style={{
                marginTop: 16,
                padding: 18,
                borderRadius: 14,
                border: "1px solid #ddd",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
                
              <div style={{ width: 350 }}>{t.subject ?? "-"}</div>
              <div style={{ width: 200 }}>{t.category ?? "-"}</div>
              <div style={{ width: 150 }}>{t.priority ?? "-"}</div>
              <div style={{ width: 250 }}>{new Date(t.created_at).toLocaleString()}</div>
                <button
                onClick={() => navigate(`/tickets/${t.id}`)}
                style={{
                  marginLeft: "auto",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid #ccc",
                  background: "white",
                  cursor: "pointer",
                  fontSize: 18,
                }}
                title="View"
              >
                👁️
              </button>

                
                </div>
            ))

           )}


        



         </div>
         </div>

    )


}








