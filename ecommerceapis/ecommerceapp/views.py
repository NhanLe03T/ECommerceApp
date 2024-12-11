from rest_framework import viewsets, generics
from ecommerceapp.models import Product, Category
from ecommerceapp import serializers


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
