import os
import django
import csv

d = {"Wooden Rack":'wdn',"Steel Block":'stl',"(LH)":'lh',"(RH)":'rh',"(Front Side)":'f',"(Back Side)":'b'}


# 1. Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'books.settings') # Replace 'my_project' with your folder name
django.setup()

# 2. Import your model AFTER django.setup()
from app.models import Book

def run_loader():
    with open('library.csv', 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            title, type, number, side = row
            # This handles the database work
            Book.objects.get_or_create(
                title=title.strip(),
                type = type.strip(),
                number=number.strip(),
                side=side.strip(),
                location_id = f'{d[type]}-{d[side]}-{number}'
            )
    print("Database populated successfully!")

if __name__ == "__main__":
    run_loader()