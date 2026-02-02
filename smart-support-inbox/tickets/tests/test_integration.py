import pytest
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_integration():
    client = APIClient()
    
    payload = {
        "subject": "Billing issue",
        "from_email": "user@example.com",
        "message": "I was charged twice",
    }
    
    create_res = client.post("/api/tickets/", payload, format= "json")
    assert create_res.status_code == 201
    
    created = create_res.json()
    assert "id" in created
    ticket_id = created["id"]
    
    assert created["category"] in {"Billing", "Bug", "Feature", "Account", "Other"}
    assert created["priority"] in {"Low", "Medium", "High"}
    assert isinstance(created["summary"], str)
    assert isinstance(created["suggested_reply"], str)
    assert created["feedback_accepted"] is None
    
    list_res = client.get("/api/tickets/")
    assert list_res.status_code == 200
    tickets = list_res.json()
    assert isinstance(tickets, list)
    assert any(t["id"] == ticket_id for t in tickets)
    
    retrieve_res = client.get(f"/api/tickets/{ticket_id}/")
    assert retrieve_res.status_code == 200
    retrieved = retrieve_res.json()
    assert retrieved["id"] == ticket_id
    
    feedback_res = client.post(f"/api/tickets/{ticket_id}/feedback/", {"accepted": True}, format="json")
    assert feedback_res.status_code == 200
    
    retrieve_after = client.get(f"/api/tickets/{ticket_id}/")
    assert retrieve_after.status_code == 200
    assert retrieve_after.json()["feedback_accepted"] is True
    
    
    
    
    
    