from multiprocessing import context
from django.http import JsonResponse
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, TemplateView
from django.views import View
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
from .models import Report
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.core.paginator import Paginator

class AdminRequiredMixin:
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_admin:
            messages.error(request, "Akses hanya untuk admin!")
            return redirect('home')
        return super().dispatch(request, *args, **kwargs)
# HOME
class HomeView(LoginRequiredMixin, ListView):
    model = Report
    template_name = 'main_app/home.html'
    context_object_name = 'reports'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['status_choices'] = Report._meta.get_field('status').choices
        context['in_progress'] = self.get_queryset().filter(status='IN_PROGRESS').count()
        context['resolved'] = self.get_queryset().filter(status='RESOLVED').count()
        context['active'] = self.get_queryset().exclude(status='RESOLVED').count()
        return context

# LIST REPORTS
class ReportListView(LoginRequiredMixin, ListView):
    model = Report
    template_name = 'main_app/report_list.html'
    context_object_name = 'reports'
    paginate_by = 10   # 🔥 INI YANG PENTING

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['status_choices'] = Report._meta.get_field('status').choices
        return context


# DETAIL
class ReportDetailView(LoginRequiredMixin, DetailView):
    model = Report
    template_name = 'main_app/detail_report.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['status_choices'] = Report._meta.get_field('status').choices
        return context


# CREATE
class ReportCreateView(AdminRequiredMixin, LoginRequiredMixin, CreateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'main_app/add_report.html'
    success_url = reverse_lazy('report_list')

    def form_valid(self, form):
        messages.success(self.request, 'Laporan berhasil ditambahkan!')
        return super().form_valid(form)


# UPDATE
class ReportUpdateView(AdminRequiredMixin, LoginRequiredMixin, UpdateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'main_app/edit_report.html'
    success_url = reverse_lazy('report_list')

    def form_valid(self, form):
        messages.success(self.request, 'Laporan berhasil diedit!')
        return super().form_valid(form)


# DELETE
class ReportDeleteView(AdminRequiredMixin, LoginRequiredMixin, DeleteView):
    model = Report
    template_name = 'main_app/delete_report.html'
    success_url = reverse_lazy('report_list')

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, 'Laporan berhasil dihapus!')
        return super().delete(request, *args, **kwargs)


# UPDATE STATUS (WORKFLOW)
class ReportUpdateStatusView(AdminRequiredMixin, LoginRequiredMixin, View):
    def post(self, request, pk):
        report = get_object_or_404(Report, pk=pk)
        new_status = request.POST.get('status')
        report.status = new_status
        report.save()
        messages.success(self.request, f'Status laporan berhasil diubah menjadi {report.get_status_display()}!')
        return redirect('report_list')

class SearchReport(View):
    def get(self, request):
        query = request.GET.get('q', '')
        page = request.GET.get('page', 1)

        reports = Report.objects.filter(title__icontains=query).order_by('-id')

        paginator = Paginator(reports, 10)  # 🔥 10 data per page
        page_obj = paginator.get_page(page)

        data = list(page_obj.object_list.values(
            'id',
            'title',
            'category',
            'location',
            'status'
        ))

        return JsonResponse({
            'data': data,
            'has_next': page_obj.has_next(),
            'has_prev': page_obj.has_previous(),
            'current_page': page_obj.number
        })
    
class ReportDetailAPI(View):
    def get(self, request, pk):
        report = Report.objects.get(pk=pk)

        data = {
            'title': report.title,
            'description': report.description,
            'location': report.location,
            'status': report.status
        }

        return JsonResponse(data)