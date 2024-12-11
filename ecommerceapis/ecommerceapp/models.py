from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from django.core.exceptions import ValidationError
from enum import Enum
from cloudinary.models import CloudinaryField
from django.utils import timezone


class Role(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.PROTECT, default=None, null=True)
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


class Product(BaseModel):
    name = models.CharField(max_length=255)
    description = RichTextField(blank=True, default='')
    origin = models.CharField(max_length=50, null=True, blank=True, default="Origin Unknown")
    brand = models.CharField(max_length=50, null=True, blank=True, default="No Brand")
    weight = models.CharField(max_length=50, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    shop = models.ForeignKey('Shop', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ProductImage(BaseModel):
    is_cover = models.BooleanField()
    image = CloudinaryField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    # Note: thêm ràng buộc từ 3 đến 9 ảnh (nếu dư thời gian thì làm)


class Group(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Attribute(models.Model):
    value = models.CharField(max_length=30)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return self.value


class SaleInfo(BaseModel):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    primary_attr = models.ForeignKey(Attribute, on_delete=models.RESTRICT, null=True, blank=True, default=None,
                                     related_name='pri_attr')
    secondary_attr = models.ForeignKey(Attribute, on_delete=models.RESTRICT, null=True, blank=True, default=None,
                                       related_name='sec_attr')

    # đảm bảo rằng primary_attr và secondary_attr không thuộc cùng một group
    def clean(self):
        if self.primary_attr and self.secondary_attr:
            if self.primary_attr.group == self.secondary_attr.group:
                raise ValidationError("Primary and secondary attributes must not belong to the same group.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class AddressType(Enum):
    HOME = 'home'
    OFFICE = 'office'


class Address(BaseModel):
    province_city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    ward_commune = models.CharField(max_length=100)
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
    shop = models.ForeignKey('Shop', on_delete=models.CASCADE, null=True, default=None, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None)

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
    staff = models.ForeignKey(User, on_delete=models.PROTECT, related_name='staff')

    def __str__(self):
        return self.name


class Review(BaseModel):
    content = models.TextField()
    rating = models.DecimalField(max_digits=1, decimal_places=0, default=5)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class ReviewImage(models.Model):
    image = CloudinaryField()
    review = models.ForeignKey(Review, on_delete=models.CASCADE)


class Comment(BaseModel):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, null=True, default=None)
    reply_to_comment = models.ForeignKey('self', on_delete=models.RESTRICT, null=True, default=None)


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
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, default=None)
    sale_info = models.ForeignKey(SaleInfo, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    name = models.CharField(max_length=255, blank=True, default=None)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=None)
    image = models.CharField(max_length=255, blank=True, default=None)

    # Ghi đè phương thức save để lấy các giá trị
    def save(self, *args, **kwargs):
        if self.sale_info:
            if not self.name:
                self.name = self.sale_info.product.name
            if not self.unit_price:
                self.unit_price = self.sale_info.price
            if not self.image:
                product = self.sale_info.product
                cover_image = ProductImage.objects.filter(product=product, is_cover=True).first()
                if cover_image:
                    self.image = cover_image.image.url
        super().save(*args, **kwargs)


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

    def save(self, *args, **kwargs):
        if self.payment_status == PaymentStatus.COMPLETED.value and not self.paid_at:
            self.paid_at = timezone.now()
        if not self.total_amount and self.order:
            self.total_amount = self.order.total_amount
        super().save(*args, **kwargs)
