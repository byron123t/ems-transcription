from django.urls import path
from . import views



app_name = 'hosp'

urlpatterns = [
    path('map', views.get_map, name='get_map')
]