from django.urls import path
from . import views
from .views import (
    HomeView,  # Tambahkan ini
    ReportListView,
    ReportDetailView,
    ReportCreateView,
    ReportUpdateView,
    ReportDeleteView,
    ReportUpdateStatusView,
    SearchReport,
    ReportDetailAPI,
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),  # Home statis
    path('reports/', ReportListView.as_view(), name='report_list'),  # Daftar laporan
    path('detail/<int:pk>/', ReportDetailView.as_view(), name='report_detail'),
    path('add/', ReportCreateView.as_view(), name='add_report'),
    path('edit/<int:pk>/', ReportUpdateView.as_view(), name='edit_report'),
    path('delete/<int:pk>/', ReportDeleteView.as_view(), name='delete_report'),
    path('update-status/<int:pk>/', ReportUpdateStatusView.as_view(), name='update_status'),
    path('search/', SearchReport.as_view(), name='report_search'),
    path('api/report/<int:pk>/', ReportDetailAPI.as_view(), name='report_api'),
]