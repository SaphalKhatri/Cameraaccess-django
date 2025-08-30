from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UserProfileView,register

router= DefaultRouter()
router.register(r'users',UserProfileView)

urlpatterns=[
    path('',register,name='register'),
    path('api/',include(router.urls)),
]