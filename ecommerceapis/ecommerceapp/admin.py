from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse
from ecommerceapp.models import (Category, Product, ProductImage, User, Group,
                                 Attribute, SaleInfo, Address, Shop, Review,
                                 ReviewImage, Comment, Order, OrderItem, Payment)
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path


class MyEcommerceAdmin(admin.AdminSite):
    site_header = 'E-Commerce Admin'

    def get_urls(self):
        return [path('ecommerce-stats/', self.stats)] + super().get_urls()

    def stats(self, request):
        # Dem so products cua 1 doanh muc
        stats = Category.objects.annotate(count=Count('product__id')).values('id', 'name', 'count')

        return TemplateResponse(request, 'admin/stats.html', {
            'stats': stats
        })


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


class ProductImageInlineAdmin(admin.StackedInline):
    model = ProductImage
    fk_name = 'product'


class ProductSaleInfoInlineAdmin(admin.StackedInline):
    model = SaleInfo
    fk_name = 'product'


class ProductForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Product
        fields = '__all__'


class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'created_date']
    list_filter = ['category', 'created_date']
    search_fields = ['name', 'category__name']
    inlines = [ProductImageInlineAdmin, ProductSaleInfoInlineAdmin, ]
    form = ProductForm


class UserAddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = ['fullname', 'phone', 'province_city', 'district', 'ward_commune', 'address_details', 'type',
                  'is_default', 'user']


class UserAddressInlineAdmin(admin.StackedInline):
    model = Address
    fk_name = 'user'
    form = UserAddressForm


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email', 'show_avatar', 'role']
    list_filter = ['role']
    search_fields = ['username', 'first_name', 'last_name']
    readonly_fields = ['show_avatar']
    inlines = [UserAddressInlineAdmin, ]

    def show_avatar(self, user):
        return mark_safe(
            # f"<img src='/static/{user.avatar.name}' width='120' />"
            f"<img src='{user.avatar.url}' width='120'/>"
        )


class AttributeAdmin(admin.ModelAdmin):
    list_display = ['group', 'value']


class AddressAdmin(admin.ModelAdmin):
    list_display = ['fullname', 'phone', 'province_city', 'district', 'ward_commune', 'address_details', 'type',
                    'is_default', 'user', 'shop']


class ShopAddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = ['fullname', 'phone', 'province_city', 'district', 'ward_commune', 'address_details', 'type',
                  'is_default', 'shop']


class ShopAddressInlineAdmin(admin.StackedInline):
    model = Address
    fk_name = 'shop'
    form = ShopAddressForm


class ShopAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'business_type', 'user', 'show_logo']
    list_filter = ['business_type']
    search_fields = ['name']
    readonly_fields = ['show_logo']
    inlines = [ShopAddressInlineAdmin, ]

    def show_logo(self, shop):
        return mark_safe(
            # f"<img src='/static/{shop.logo.name}' width='120' />"
            f"<img src='{shop.logo.url}' width='120' />"
        )


class ReviewImageInlineAdmin(admin.StackedInline):
    model = ReviewImage
    fk_name = 'review'


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['content', 'rating', 'user', 'product']
    list_filter = ['rating']
    search_fields = ['product']
    inlines = [ReviewImageInlineAdmin, ]


class CommentAdmin(admin.ModelAdmin):
    list_display = ['content', 'user', 'reply_to_comment', 'review']


class OrderItemInlineAdmin(admin.StackedInline):
    model = OrderItem
    fk_name = 'order'


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'total_amount', 'status']
    inlines = [OrderItemInlineAdmin, ]


class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'paid_at', 'total_amount', 'payment_status', 'payment_method']
    list_filter = ['payment_status', 'payment_method']


admin_site = MyEcommerceAdmin(name='eCommerce')

admin_site.register(Category, CategoryAdmin)
admin_site.register(Product, ProductAdmin)
admin_site.register(User, UserAdmin)
admin_site.register(Group)
admin_site.register(Attribute, AttributeAdmin)
admin_site.register(Address, AddressAdmin)
admin_site.register(Shop, ShopAdmin)
admin_site.register(Review, ReviewAdmin)
admin_site.register(Comment, CommentAdmin)
admin_site.register(Order, OrderAdmin)
admin_site.register(Payment, PaymentAdmin)
