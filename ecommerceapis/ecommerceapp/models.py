from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
# from django.core.exceptions import ValidationError
from enum import Enum
from cloudinary.models import CloudinaryField


# from django.utils import timezone


class Role(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.PROTECT, default=2, null=True)
    avatar = CloudinaryField(
        default="https://res.cloudinary.com/dthrh2pgj/image/upload/v1728619680/fc047347b17f7df7ff288d78c8c281cf_wncxc8.png")


class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class ChildCate(BaseModel):
    name = models.CharField(max_length=100)
    superCate = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='parent')

    def __str__(self):
        return self.name


# class ChildCateLv2(BaseModel):
#     name = models.CharField(max_length=100)
#     superCate = models.ForeignKey(ChildCateLv1, on_delete=models.CASCADE, related_name='childcatelv2')
#
#     def __str__(self):
#         return self.name


class LabelDetails(BaseModel):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='cate_lb_details')
    childCate = models.ForeignKey(ChildCate, on_delete=models.PROTECT, null=True, related_name='childcate_lb_details')

    # childCateLv2 = models.ForeignKey(ChildCateLv2, on_delete=models.PROTECT, null=True)
    def __str__(self):
        return self.name


class ProductLabelDetails(BaseModel):
    content = models.CharField(max_length=255)
    labelDetails = models.ForeignKey(LabelDetails, on_delete=models.CASCADE, related_name='details_value')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product_details')


class Product(BaseModel):
    name = models.CharField(max_length=255)
    description = RichTextField(blank=True, default='')

    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    childCate = models.ForeignKey(ChildCate, on_delete=models.PROTECT, null=True)
    # childCateLv2 = models.ForeignKey(ChildCateLv2, on_delete=models.PROTECT, null=True)

    shop = models.ForeignKey('Shop', on_delete=models.CASCADE)

    labelDetails = models.ManyToManyField(LabelDetails, through=ProductLabelDetails)

    def __str__(self):
        return self.name


class ProductGroup(BaseModel):
    name = models.CharField(max_length=50)
    is_main = models.BooleanField(default=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_groups')

    def __str__(self):
        return self.name


class GroupAttribute(BaseModel):
    value = models.CharField(max_length=50)
    product_group = models.ForeignKey(ProductGroup, on_delete=models.CASCADE, related_name='group_attributes')

    def __str__(self):
        return self.value


class ProductImage(BaseModel):
    is_cover = models.BooleanField()
    image = CloudinaryField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class SaleInfo(BaseModel):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_sales_info')
    st_attribute = models.ForeignKey(GroupAttribute, on_delete=models.PROTECT, null=True, related_name='st_attribute')
    nd_attribute = models.ForeignKey(GroupAttribute, on_delete=models.PROTECT, null=True, related_name='nd_attribute')


class AddressType(Enum):
    HOME = 'home'
    OFFICE = 'office'


class ProvinceCity(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class District(models.Model):
    name = models.CharField(max_length=100)
    locatedIn = models.ForeignKey(ProvinceCity, on_delete=models.PROTECT, related_name='districts')

    def __str__(self):
        return self.name


class WardCommune(models.Model):
    name = models.CharField(max_length=100)
    locatedIn = models.ForeignKey(District, on_delete=models.PROTECT, related_name='wards_communes')

    def __str__(self):
        return self.name


class Address(BaseModel):
    address_details = models.CharField(max_length=100)
    fullname = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    is_default = models.BooleanField(default=True)
    TYPE_CHOICES = [
        (AddressType.HOME.value, 'Home'),
        (AddressType.OFFICE.value, 'Office'),
    ]
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default=AddressType.HOME.value,
    )

    province_city = models.ForeignKey(ProvinceCity, on_delete=models.CASCADE)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    ward_commune = models.ForeignKey(WardCommune, on_delete=models.CASCADE)

    shop = models.OneToOneField('Shop', on_delete=models.CASCADE, null=True, default=None, unique=True,
                                related_name='shop_address')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None, related_name='user_addresses_set')

    def __str__(self):
        return f"{self.address_details}, {self.ward_commune}, {self.district}, {self.province_city} "


class BusinessType(Enum):
    INDIVIDUAL = 'individual'
    BUSINESS_HOUSEHOLD = 'business_household'
    COMPANY = 'company'


class Shop(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = RichTextField()
    logo = CloudinaryField()
    email = models.CharField(max_length=100, unique=True)
    phone = models.CharField(max_length=15)
    TYPE_CHOICES = [
        (BusinessType.INDIVIDUAL.value, 'Individual'),
        (BusinessType.BUSINESS_HOUSEHOLD.value, 'Business Household'),
        (BusinessType.COMPANY.value, 'Company'),
    ]
    business_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default=BusinessType.INDIVIDUAL.value,
    )
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name='user')
    staff = models.ForeignKey(User, on_delete=models.PROTECT, related_name='staff', null=True)

    def __str__(self):
        return self.name


class Review(BaseModel):
    content = models.TextField()
    rating = models.DecimalField(max_digits=1, decimal_places=0, default=5)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class ReviewImage(models.Model):
    image = CloudinaryField()
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='review_images')


class Comment(BaseModel):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comment')
    review = models.ForeignKey(Review, on_delete=models.CASCADE, null=True, default=None, related_name='comment_review')
    reply_to_comment = models.ForeignKey('self', on_delete=models.RESTRICT, null=True, default=None,
                                         related_name='reply_comment')

    def __str__(self):
        return self.content


class OrderStatus(Enum):
    PENDING = 'pending'
    CONFIRMED = 'confirmed'
    PROCESSING = 'processing'
    AWAITING_PAYMENT = 'awaiting_payment'
    PAYMENT_FAILED = 'payment_failed'
    SHIPPED = 'shipped'
    OUT_FOR_DELIVERY = 'out_for_delivery'
    DELIVERED = 'delivered'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    RETURNED = 'returned'
    REFUNDED = 'refunded'


class Order(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    itemSalesInfo = models.ManyToManyField(SaleInfo, through='OrderItem')
    STATUS_CHOICES = [
        (OrderStatus.PENDING.value, 'Pending'),
        (OrderStatus.CONFIRMED.value, 'Confirmed'),
        (OrderStatus.PROCESSING.value, 'Processing'),
        (OrderStatus.AWAITING_PAYMENT.value, 'Awaiting Payment'),
        (OrderStatus.PAYMENT_FAILED.value, 'Payment Failed'),
        (OrderStatus.SHIPPED.value, 'Shipped'),
        (OrderStatus.OUT_FOR_DELIVERY.value, 'Out for Delivery'),
        (OrderStatus.DELIVERED.value, 'Delivered'),
        (OrderStatus.COMPLETED.value, 'Completed'),
        (OrderStatus.CANCELLED.value, 'Cancelled'),
        (OrderStatus.RETURNED.value, 'Returned'),
        (OrderStatus.REFUNDED.value, 'Refunded'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=OrderStatus.PENDING.value,
    )


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, default=None,
                              related_name='order_order_item')
    sale_info = models.ForeignKey(SaleInfo, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    name = models.CharField(max_length=255, blank=True, default=None)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=None)
    image = models.CharField(max_length=255, blank=True, default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


class PaymentMethod(Enum):
    CASH = 'cash'
    PAYPAL = 'paypal'
    MOMO = 'momo'
    STRIPE = 'stripe'
    ZALO_PAY = 'zalo_pay'


class PaymentStatus(Enum):
    PENDING = 'pending'
    COMPLETED = 'completed'
    FAILED = 'failed'


class Payment(BaseModel):
    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    paid_at = models.DateTimeField(null=True, default=None)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, default=None)
    PAYMENT_STATUS_CHOICES = [
        (PaymentStatus.PENDING.value, 'Pending'),
        (PaymentStatus.COMPLETED.value, 'Completed'),
        (PaymentStatus.FAILED.value, 'Failed'),
    ]
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default=PaymentStatus.PENDING.value,
    )
    PAYMENT_METHOD_CHOICES = [
        (PaymentMethod.CASH.value, 'Cash'),
        (PaymentMethod.PAYPAL.value, 'Paypal'),
        (PaymentMethod.MOMO.value, 'Momo'),
        (PaymentMethod.STRIPE.value, 'Stripe'),
        (PaymentMethod.ZALO_PAY.value, 'Zalo pay'),
    ]
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        default=PaymentMethod.CASH.value,
    )

    # def save(self, *args, **kwargs):
    #     if self.payment_status == PaymentStatus.COMPLETED.value and not self.paid_at:
    #         self.paid_at = timezone.now()
    #     if not self.total_amount and self.order:
    #         self.total_amount = self.order.total_amount
    #     super().save(*args, **kwargs)
