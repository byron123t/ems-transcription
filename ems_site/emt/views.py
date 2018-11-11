from django.shortcuts import render

# Create your views here.




def get_hospital(request):

	hospitals = {} #populate based on api

	return render(request, 'emt/hospital_form.html', {'hospitals': hospitals})



def get_triage(request):


	return render(request, 'emt/triage_form.html')