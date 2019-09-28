import random
import math
from uuid import uuid1
from datetime import datetime

from factory import DjangoModelFactory, lazy_attribute, Faker
from factory.fuzzy import FuzzyText
from news.models import Story

class StoryFactory(DjangoModelFactory):
    class Meta:
        model = Story

    item_id = uuid1().int >> 96
    title = Faker('sentence')
    by = Faker('name')
    score = random.randint(0, 10 ** 4)
    time = math.floor(datetime.now().timestamp())
    url = Faker('url')
