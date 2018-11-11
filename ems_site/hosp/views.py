from django.shortcuts import render
import requests
# Create your views here.

def get_map(request):
    # resp = requests.get('whatever man')
    resp = {'patients':[{'aid':'Payton', 'p1':'140/90mmHg', 'p2':'Homicide'}, {'aid':'Brian', 'p1':'100/200mmHg', 'p2':'Abuse'}, {'aid':'Jonathan', 'p1':'200/100mmHg', 'p2':'Accident'}]}
    # if resp.status_code is not 200:
    #     return

    return render(request, 'hosp/map_form.html', {'patients': resp['patients']}) # resp.json
