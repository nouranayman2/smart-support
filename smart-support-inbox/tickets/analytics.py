from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ticket

class AnalyticsView(APIView) :
    def get(self, request):
        categories = [c for c,_ in Ticket.Category.choices]
        
        per_category = []
        
        for cat in categories:
            accepted = Ticket.objects.filter(category=cat, feedback_accepted= True).count()
            rejected = Ticket.objects.filter(category= cat, feedback_accepted= False).count()
            total_feedback = accepted +rejected
            rate = (accepted/ total_feedback) if total_feedback >0 else None
            
            per_category.append({
                "category" :cat,
                "accepted": accepted,
                "rejected" : rejected,
                "total_feedback" : total_feedback,
                "acceptance_rate" : rate
                
            })
            
        all_accepted = Ticket.objects.filter(feedback_accepted = True).count()
        all_rejected = Ticket.objects.filter(feedback_accepted = False).count()
        total_tickets_with_feedback = all_accepted + all_rejected
        all_rate = (all_accepted/total_tickets_with_feedback) if total_tickets_with_feedback >0 else None
            
        return Response({
            "overall" : {
                "accepted" : all_accepted,
                "rejected" : all_rejected,
                "total_tickets_with_feedback": total_tickets_with_feedback,
                "acceptance_rate" : all_rate,
            },
            "per_category" : per_category,
        })    
            
            
            
            
            
            
        
        
        
        