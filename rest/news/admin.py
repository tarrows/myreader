from django.contrib import admin
from .models import Story

# Register your models here.

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('item_id', 'title', 'by', 'score', 'updated_at', 'created_at')
    list_filter = ['updated_at', 'created_at']
    search_fields = ['title', 'by']
