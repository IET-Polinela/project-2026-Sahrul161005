from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)
from django_scalar.views import scalar_viewer

urlpatterns = [
    path('admin/', admin.site.urls),

    path('about/', include('about.urls')),
    path('contacts/', include('contacts.urls')),
    path('dashboard/', include('dashboard.urls')),

    path('', include('main_app.urls')),
    path('', include('usermanagement_23758018.urls')),

    # API DRF
    path('api/', include('main_app.api_urls')),
    path('api/', include('usermanagement_23758018.api_urls')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/swagger/', SpectacularSwaggerView.as_view( url_name='schema'), name='swagger-ui'),
    path('api/docs/scalar/', scalar_viewer, name='scalar-ui'
),
]