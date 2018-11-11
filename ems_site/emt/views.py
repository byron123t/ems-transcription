from django.shortcuts import render

# Create your views here.


import requests


def get_hospital(request):

	resp = requests.get('https://qz8xqsc7ik.execute-api.us-east-2.amazonaws.com/prod/hospitals/')

	#{'UW Hospital', 'UnityPoint Hospital: Meriter', 'St. Mary\'s Hospital' } #populate based on api
	if resp.status_code is not 200:
		return


	return render(request, 'emt/hospital_form.html', {'hospitals': resp.json()['hospitals']})



def get_triage(request):
	resp = requests.get('https://qz8xqsc7ik.execute-api.us-east-2.amazonaws.com/prod/prompts/')

	if resp.status_code is not 200:
		return


	return render(request, 'emt/triage_form.html', {'questions': resp.json()['prompts']})