from django.urls import path
from .views import *

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('api/status/', StatusChartData.as_view()),
    path('api/category/', CategoryChartData.as_view()),
    path('api/recent/', RecentReports.as_view()),
]