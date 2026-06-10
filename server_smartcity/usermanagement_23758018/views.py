from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.urls import reverse_lazy
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.views.generic import CreateView
from django.contrib import messages
from .forms import RegisterForm
from django.contrib.auth.views import LoginView
from django.contrib.auth import authenticate
from django.contrib import messages
from django.contrib.auth import get_user_model

class CustomLoginView(LoginView):
    template_name = 'usermanagement_23758018/login.html'

    def form_valid(self, form):
        messages.success(self.request, "Login berhasil!")
        return super().form_valid(form)

    def form_invalid(self, form):
        username = self.request.POST.get('username')
        password = self.request.POST.get('password')

        User = get_user_model()

        if not User.objects.filter(username=username).exists():
            messages.error(self.request, "Username tidak ditemukan.")
        else:
            user = authenticate(username=username, password=password)
            if user is None:
                messages.error(self.request, "Password salah.")

        return super().form_invalid(form)


class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('login')

    def dispatch(self, request, *args, **kwargs):
        messages.success(request, "Berhasil logout")
        return super().dispatch(request, *args, **kwargs)
    
class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Masukkan username'
    }))

    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Masukkan password'
    }))


class RegisterView(CreateView):
    form_class = RegisterForm
    template_name = 'usermanagement_23758018/register.html'
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Registrasi berhasil! Silakan login.")
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, "Registrasi gagal! Periksa input.")
        return super().form_invalid(form)