from django.contrib import admin
from .models import Ticket

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin) :
    list_display = (
        "id",
        "subject",
        "from_email",
        "category",
        "priority",
        "created_at",
        "feedback_accepted",
    )
    list_filter = ("category", "priority", "feedback_accepted", "created_at")
    search_fields = ("subject", "from_email", "message", "summary", "suggested_reply")
    ordering = ["-created_at"]
    readonly_fields = ("created_at", "summary", "suggested_reply")
   
    
    



