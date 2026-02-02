from django.db import models

class Ticket(models.Model) :

    subject = models.CharField(max_length = 200)
    from_email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)

    class Category(models.TextChoices):

        BILLING = "Billing"
        BUG = "Bug"
        FEATURE = "Feature"
        ACOUNT = "Account"
        OTHER = "Other"

    
    class Priority(models.TextChoices):

        LOW = "Low"
        MEDIUM = "Medium"
        HIGH = "High"
        


    category = models.CharField( 
            max_length = 20, 
            choices = Category.choices, 
            default = Category.OTHER
        )
    
    priority = models.CharField( 
            max_length = 10, 
            choices = Priority.choices, 
            default = Priority.LOW
        )

    summary = models.TextField(blank = True, default = "")
    suggested_reply = models.TextField(blank = True, default = "")
    feedback_accepted = models.BooleanField(null = True, blank = True)

    def __str__(self):
            return f"{self.id} - {self.subject}"


    

    

        
        
