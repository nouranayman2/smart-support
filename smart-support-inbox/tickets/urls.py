from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet
from .analytics import AnalyticsView

router= DefaultRouter()

router.register(r"tickets", TicketViewSet, basename= "tickets")

urlpatterns = [
    path("", include(router.urls)),
    path("analytics/", AnalyticsView.as_view(), name="analytics"),
    
]