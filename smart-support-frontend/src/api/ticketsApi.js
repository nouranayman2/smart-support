async function request(url, options = {}) {
    const res = await fetch(url, {
        headers : {"Content-Type": "application/json", ...(options.headers||{})},
         ...options,

    });

    if(!res.ok){
        let msg = "";
        try {
            msg = JSON.stringify(await res.json());
        } catch {
            msg = await res.text();
        }
        throw new Error(`HTTP ${res.status}: ${msg}`);
    }
    if(res.status === 204) 
        return null;
    
    return res.json();    

}

export function listTickets({ category, priority } = {}) {

    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if(priority) params.set("priority", priority);

    const qs = params.toString() ? `?${params.toString()}` : "";
    return request(`/api/tickets/${qs}`);    
}

export function getTicket(id){
    return request(`/api/tickets/${id}/`);
}

export function createTicket(payload) {
    return request(`/api/tickets/`,{
        method:"POST",
        body :JSON.stringify(payload),

    });
    }
export function submitFeedback(id, accepted){
    return request(`/api/tickets/${id}/feedback/`,{
        method: "POST",
        body: JSON.stringify({accepted}),
    });
}
