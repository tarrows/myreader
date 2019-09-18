from django.test import TestCase

from .models import Story

# Create your tests here.

class NewsTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        pass

    def test_story_create_single(self):
        pass
