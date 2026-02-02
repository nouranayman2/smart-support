import pytest
from tickets.services import ticket_analysis

VALID_CATEGORIES = {"Billing", "Bug", "Feature", "Account", "Other"}
VALID_PRIORITIES = {"Low", "Medium", "High"}

def validate_analysis_output(result: dict):
    
    assert isinstance(result, dict)
    assert set(result.keys()) == {"category", "priority", "summary", "suggested_reply"}
    assert result["category"] in VALID_CATEGORIES
    assert result["priority"] in VALID_PRIORITIES
    assert isinstance(result["summary"], str)
    assert isinstance(result["suggested_reply"], str)
    
    
    
def test_ticket_analysis_normal():
    result = ticket_analysis("Can't proceed to payment", "Checkout fails when I click Pay.")
    validate_analysis_output(result)
    
def test_empty_message():
    result = ticket_analysis("Empty message", "")
    validate_analysis_output(result)

    

