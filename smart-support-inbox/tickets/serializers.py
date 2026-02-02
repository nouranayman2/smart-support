from rest_framework import serializers



class TicketCreateSerializer(serializers.Serializer) :
    
    subject = serializers.CharField(max_length = 200)
    from_email = serializers.EmailField()
    message = serializers.CharField(max_length=5000)





class TicketSerializer(serializers.Serializer):
    
    id = serializers.IntegerField(read_only = True)
    subject = serializers.CharField(max_length = 200)
    from_email = serializers.EmailField()
    message = serializers.CharField(max_length=5000)
    created_at = serializers.DateTimeField(read_only=True)
    category = serializers.CharField(read_only = True)
    priority = serializers.CharField(read_only = True)
    summary = serializers.CharField(read_only = True)
    suggested_reply = serializers.CharField(read_only = True)
    feedback_accepted = serializers.BooleanField(allow_null=True, read_only=True)
    
class FeedbackSerializer(serializers.Serializer) :
    
    accepted = serializers.BooleanField()
    




    