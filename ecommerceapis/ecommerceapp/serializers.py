from ecommerceapp.models import *
from rest_framework import serializers


# Hiển thị full đường dẫn ảnh
class BaseSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, obj):

        if obj.image:
            # Trả về domain của cloud
            if obj.image.name.startswith("http"):
                return obj.image.name

            # Thông qua đối tượng request của controller để lấy domain gắn vào tự động (nếu lưu ảnh ở server)
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % obj.image.name)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ChildCateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildCate
        fields = ['id', 'name', 'superCate']


class ProvinceCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProvinceCity
        fields = ['id', 'name']


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name', 'locatedIn']


class WardCommuneSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardCommune
        fields = ['id', 'name', 'locatedIn']


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    # Can thiệp băm mật khẩu khi tạo user
    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()

        return u

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Tự động gắn domain vào
        data['avatar'] = instance.avatar.url if instance.avatar else ''
        return data

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

    def validate(self, data):
        province_city = data.get('province_city')
        province_city_id = province_city.id  # Lấy ID của province_city

        # Kiểm tra tính chính xác của district
        district = data.get('district')
        if not district or district.locatedIn.id != province_city_id:
            raise serializers.ValidationError("District không thuộc ProvinceCity đã chọn.")

        # Kiểm tra tính chính xác của ward_commune
        ward_commune = data.get('ward_commune')
        if not ward_commune or ward_commune.locatedIn.id != district.id:
            raise serializers.ValidationError("WardCommune không thuộc District đã chọn.")

        # Ràng buộc khóa ngoại user/shop cho address
        # if data.get('shop') and data.get('user'):
        #     raise serializers.ValidationError("Chỉ một trong hai trường 'shop' hoặc 'user' có thể có giá trị.")
        # if not data.get('shop') and not data.get('user'):
        #     raise serializers.ValidationError("Một trong hai trường 'shop' hoặc 'user' phải có giá trị.")

        return data


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['is_cover', 'image', 'product']


class ProductSerializer(serializers.ModelSerializer):
    total_reviews = serializers.IntegerField(read_only=True)
    cover_image = serializers.ImageField(read_only=True)
    average_rating = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Product
        fields = ['name', 'total_reviews', 'cover_image', 'average_rating', 'price']


class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'childCate', 'shop']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class ReviewImageSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Tự động gắn domain vào
        data['image'] = instance.image.url if instance.image else ''
        return data

    class Meta:
        model = ReviewImage
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    review_images = ReviewImageSerializer(many=True)

    class Meta:
        model = Review
        fields = ['id', 'content', 'rating', 'user', 'product', 'review_images']


class UserCommentSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Tự động gắn domain vào
        data['avatar'] = instance.avatar.url if instance.avatar else ''
        return data

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'avatar']


class CommentSerializer(serializers.ModelSerializer):
    user = UserCommentSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['content', 'user', 'review', 'reply_to_comment']


class ShopSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Tự động gắn domain vào
        data['logo'] = instance.logo.url if instance.logo else ''
        return data

    class Meta:
        model = Shop
        fields = ['id', 'name', 'logo']


class ShopDetailsSerializer(ShopSerializer):
    class Meta:
        model = ShopSerializer.Meta.model
        fields = ShopSerializer.Meta.fields + [
            'active',
            'description',
            'email',
            'phone',
            'business_type',
            'user',
            'staff'
        ]
        read_only_fields = ['staff']
        extra_kwargs = {
            'user': {'required': False},
        }

    def create(self, validated_data):
        print("haha")
        data = validated_data.copy()
        s = Shop(**data)
        request = self.context.get('request')
        s.user = request.user
        s.active = False
        s.save()

        return s


class LabelDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabelDetails
        fields = ['id', 'name', 'category', 'childCate']


class ProductLabelDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductLabelDetails
        fields = ['content', 'labelDetails', 'product']


class ProductGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGroup
        fields = ['id', 'name', 'is_main', 'product']

    # def create(self, validated_data):
    #     product = validated_data.get('product')
    #
    #     # Kiểm tra xem đã có ProductGroup nào liên kết với product này chưa
    #     existing_product_groups = ProductGroup.objects.filter(product=product)
    #
    #     if existing_product_groups.exists():
    #         # Nếu đã có, đặt is_main của ProductGroup mới là False
    #         validated_data['is_main'] = False
    #
    #     product_group = ProductGroup.objects.create(**validated_data)
    #
    #     return product_group


class GroupAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupAttribute
        fields = ['id', 'value', 'product_group']


class SaleInfoSerializer(serializers.ModelSerializer):
    st_attribute = GroupAttributeSerializer(many=False)
    nd_attribute = GroupAttributeSerializer(many=False)

    class Meta:
        model = SaleInfo
        fields = ['id', 'price', 'stock_quantity', 'product', 'st_attribute', 'nd_attribute']

    def validate(self, data):
        st_attribute = data.get('st_attribute')
        nd_attribute = data.get('nd_attribute')

        if st_attribute and nd_attribute:
            if st_attribute['product_group'] == nd_attribute['product_group']:
                raise serializers.ValidationError("st_attribute và nd_attribute không được cùng product_group.")


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'order',
            'sale_info',
            'quantity',
            'name',
            'unit_price',
            'image',
            'user'
        ]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'status', 'itemSalesInfo']

