from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from . import views

r = DefaultRouter()
r.register('categories', views.CategoryViewSet, basename='cate')
r.register('provinces_cities', views.ProvinceCityViewSet, basename='province_city')
r.register('districts', views.DistrictViewSet, basename='district')
r.register('roles', views.RoleViewSet, basename='role')
r.register('users', views.UserViewSet, basename='user')
r.register('addresses', views.AddressViewSet, basename='address')
r.register('products', views.ProductViewSet, basename='product')
r.register('payments', views.PaymentViewSet, basename='payment')
r.register('shops', views.ShopViewSet, basename='shop')
r.register('cate_children', views.CateChildrenViewSet, basename='cate_children')
r.register('product_groups', views.ProductGroupViewSet, basename='product_group')
r.register('reviews', views.ReviewViewSet, basename='review')
r.register('comments', views.CommentViewSet, basename='comment')
r.register('order_items', views.OrderItemViewSet, basename='order_item')
r.register('orders', views.OrderViewSet, basename='order')

urlpatterns = [
    path('', include(r.urls))
]