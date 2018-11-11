from django.urls import path
from . import views


app_name = 'emt'
urlpatterns = [
	path('hospital', views.get_hospital, name='get_hospital'), 
	path('triage', views.get_triage, name='get_triage')
]