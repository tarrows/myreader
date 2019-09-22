from django.test import TestCase

from .models import Story

# Create your tests here.

class NewsTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        pass

    def test_story_create_single(self):
        story_data = {
            'item_id': 192314,
            'title': 'test',
            'by': 'testman',
            'score': 114514,
            'time': 19989990,
            'url': 'ttthppoi'
        }
        _ = Story.objects.create(**story_data).save()
        new_story = Story.objects.get(id=1)
        for key, expected_value in story_data.items():
            self.assertEquals(expected_value, getattr(new_story, key))
