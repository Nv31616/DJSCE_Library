from django.urls import path
from . import views

urlpatterns = [
    path('',views.index_view,name='index'),
    path('search/',views.search_books,name='books'),
    path('map/',views.map_view,name='map'),
]