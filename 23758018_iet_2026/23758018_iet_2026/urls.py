from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('about/', include('about.urls')),
    path('contacts/', include('contacts.urls')),
    path('dashboard/', include('dashboard.urls')),

    path('', include('main_app.urls')),
    path('', include('usermanagement_23758018.urls')),

    # API DRF
    path('api/', include('main_app.api_urls')),
]