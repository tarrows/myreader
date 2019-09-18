# myreader

## Django Note
- `$ pipenv install django`
- `$ mkdir rest`
- `$ pipenv run django-admin startproject app .`
- `$ pipenv run python manage.py startapp news`
- `$ vim ./news/models.py` <- define model
- `$ vim ./app/settings.py` <- add 'news' to INSTALLED_APPS
- `$ pipenv run python manage.py makemigrations`
- `$ pipenv run python manage.py migrate`
- `$ pipenv run python manage.py createsuperuser`
- `$ pipenv run python manage.py runserver`
