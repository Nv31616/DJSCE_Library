from django.http import JsonResponse
from .models import Book
from django.shortcuts import render

def index_view(request):
    return render(request,'index.html')

def search_books(request):
    query = request.GET.get('q', '')
    if query:
        results = Book.objects.filter(title__icontains=query)
        data = list(results.values('title','type','number','side','location_id'))
        return JsonResponse({'books': data})  
    else:
        return JsonResponse({'books': []})
    
def map_view(request):
    return render(request,'map.html')