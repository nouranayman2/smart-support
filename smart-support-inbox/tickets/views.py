from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from .models import Ticket
from .serializers import TicketCreateSerializer, TicketSerializer , FeedbackSerializer
from .services import ticket_analysis


class TicketViewSet(viewsets.ViewSet) :
    
    def create(self, request) :
        
        serializer = TicketCreateSerializer(data= request.data)
        serializer.is_valid(raise_exception= True)
        data = serializer.validated_data
        analysis = ticket_analysis(data["subject"], data["message"])
        
        ticket = Ticket.objects.create(
            subject = data["subject"],
            from_email=data["from_email"],
            message=data["message"],
            category=analysis["category"],
            priority=analysis["priority"],
            summary=analysis["summary"],
            suggested_reply=analysis["suggested_reply"],
        )
        return Response(TicketSerializer(ticket).data, status=status.HTTP_201_CREATED)
    


    def list(self, request) :
        tickets = Ticket.objects.all().order_by("-created_at")
        category = request.query_params.get("category")
        priority = request.query_params.get("priority")
        
        if category :
            tickets = tickets.filter(category = category)
        
        if priority :
            tickets = tickets.filter(priority = priority)
            
        return Response(TicketSerializer(tickets, many = True).data)  

    def retrieve(self, request, pk = None) :
        
        try:
            ticket = Ticket.objects.get(pk = pk)
        except Ticket.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(TicketSerializer(ticket).data)
        
    
    @action(detail=True, methods=["post"], url_path="feedback")
    
    def feedback(self, request, pk=None):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = FeedbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ticket.feedback_accepted = serializer.validated_data["accepted"]
        ticket.save(update_fields=["feedback_accepted"])

        return Response(
            {"id": ticket.id, "feedback_accepted": ticket.feedback_accepted},
            status=status.HTTP_200_OK
        )
          
    


    
    
        
        
        
    
