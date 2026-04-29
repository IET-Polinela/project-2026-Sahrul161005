from django.views.generic import TemplateView, View
from django.http import JsonResponse
from main_app.models import Report
from django.db.models import Count
from django.views.generic import TemplateView
from main_app.models import Report

# PAGE DASHBOARD
class DashboardView(TemplateView):
    template_name = 'dashboard/dashboard.html'  # sesuaikan folder kamu

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        reports = Report.objects.all()

        context['reports'] = reports
        context['in_progress'] = Report.objects.filter(status='IN_PROGRESS').count()
        context['resolved'] = Report.objects.filter(status='RESOLVED').count()
        context['active'] = Report.objects.exclude(status='RESOLVED').count()

        return context

# API STATUS
class StatusChartData(View):
    def get(self, request):
        data = Report.objects.values('status').annotate(total=Count('id'))
        return JsonResponse(list(data), safe=False)


# API CATEGORY
class CategoryChartData(View):
    def get(self, request):
        data = Report.objects.values('category').annotate(total=Count('id'))
        return JsonResponse(list(data), safe=False)


# API RECENT REPORT
class RecentReports(View):
    def get(self, request):
        reported = list(Report.objects.filter(status='REPORTED').order_by('-created_at')[:5].values())
        resolved = list(Report.objects.filter(status='RESOLVED').order_by('-created_at')[:5].values())

        return JsonResponse({
            'reported': reported,
            'resolved': resolved
        })