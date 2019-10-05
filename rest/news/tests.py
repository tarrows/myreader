import json

from functools import partial
from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .models import Story
from .factory import StoryFactory
from .views import StoryViewSet

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

    def test_story_post_single(self):
        story = StoryFactory.stub().__dict__
        api = APIRequestFactory()
        request = api.post('/stories/', json.dumps(story), content_type='application/json')
        response = StoryViewSet.as_view({'post': 'create'})(request)
        self.assertEquals(response.status_code, 201)

    def test_story_post_multiple(self):
        stories = [StoryFactory.stub().__dict__ for _ in range(3)]
        api = APIRequestFactory()
        request = api.post('/stories/', json.dumps(stories), content_type='application/json')
        response = StoryViewSet.as_view({'post': 'create'})(request)
        self.assertCountEqual(stories, response.data)
        self.assertEquals(response.status_code, 201)
