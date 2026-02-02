import pytest
from tickets.models import Ticket

@pytest.mark.django_db

def test_ticket_creation():
    t = Ticket.objects.create(
        subject= "Test Ticket",
        from_email= "user@example.com",
        message= "Test message",
        category= Ticket.Category.BILLING,
        priority= Ticket.Priority.HIGH,
        summary= "Test summary",
        suggested_reply= "Test reply",
        feedback_accepted=None,
        
        
    )
    
    saved = Ticket.objects.get(id=t.id)
    assert saved.subject == "Test Ticket"
    assert saved.from_email == "user@example.com"
    assert saved.message == "Test message"
    assert saved.category == Ticket.Category.BILLING
    assert saved.priority == Ticket.Priority.HIGH
    assert saved.summary == "Test summary"
    assert saved.suggested_reply == "Test reply"
    assert saved.feedback_accepted is None
    assert saved.created_at is not None