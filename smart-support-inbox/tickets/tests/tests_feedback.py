import pytest
from rest_framework.test import APIClient
from tickets.models import Ticket

@pytest.mark.django_db
def test_feedback():
    client = APIClient()
    
    ticket = Ticket.objects.create(
        subject= "Important",
        from_email="user@example.com",
        message="Hello",
        category=Ticket.Category.OTHER,
        priority=Ticket.Priority.LOW,
        summary="summar here",
        suggested_reply="Thanks",
        feedback_accepted=None,
        
    )
    
    result = client.post(f"/api/tickets/{ticket.id}/feedback/", {"accepted": False}, format="json")
    assert result.status_code == 200
    
    ticket.refresh_from_db()
    assert ticket.feedback_accepted is False
    

    