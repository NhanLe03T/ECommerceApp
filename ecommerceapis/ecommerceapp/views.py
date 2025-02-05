from django.db.models import Count, OuterRef, Avg, Subquery
from rest_framework import viewsets, generics, permissions, status
from ecommerceapp.models import *
from ecommerceapp import serializers, paginators
from rest_framework.decorators import action
from rest_framework.response import Response


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer

    @action(methods=['get'], url_path='cate_children', detail=True)
    def get_children_cate(self, request, pk):
        cate_children = self.get_object().childcate.filter(active=True)

        return Response(serializers.ChildCateSerializer(cate_children, many=True, context={'request': request}).data)

    @action(methods=['get', 'post'], url_path='label_details', detail=True)
    def category_label_details(self, request, pk):
        if request.method == 'GET':
            lb_details = self.get_object().cate_lb_details.filter(active=True)
            return Response(
                serializers.LabelDetailsSerializer(lb_details, many=True, context={'request': request}).data)
        elif request.method == 'POST':
            name = request.data.get('name')
            ld = LabelDetails.objects.create(name=name, category=self.get_object())

            return Response(serializers.LabelDetailsSerializer(ld).data)


class ProvinceCityViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ProvinceCity.objects.all()
    serializer_class = serializers.ProvinceCitySerializer

    @action(methods=['get'], url_path='Districts', detail=True)
    def get_districts(self, request, pk):
        districts = self.get_object().districts.all()

        return Response(serializers.DistrictSerializer(districts, many=True, context={'request': request}).data)


class DistrictViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = District.objects.all()
    serializer_class = serializers.DistrictSerializer

    @action(methods=['get'], url_path='wards_communes', detail=True)
    def get_wards_communes(self, request, pk):
        wards_communes = self.get_object().wards_communes.all()

        return Response(serializers.DistrictSerializer(wards_communes, many=True, context={'request': request}).data)


class RoleViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = serializers.RoleSerializer


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Detail = False vì trong trường hợp này không thông qua id mà thông qua đối tượng chứng thực (an toàn hơn)
    @action(methods=['get'], url_path='current-user', detail=False)
    def get_user(self, request):
        return Response(serializers.UserSerializer(request.user).data)

    @action(methods=['get'], url_path='user-addresses', detail=False)
    def get_user_address(self, request):
        user_addresses = self.get_object().user_addresses_set.filter(active=True)

        return Response(serializers.AddressSerializer(user_addresses, many=True, context={'request': request}).data)

    @action(methods=['get'], url_path='reviews', detail=False)
    def get_user_reviews(self, request):
        user_reviews = Review.objects.prefetch_related('review_images').filter(active=True)

        return Response(serializers.ReviewSerializer(user_reviews, many=True, context={'request': request}).data)


class AddressViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Address.objects.filter(active=True)
    serializer_class = serializers.AddressSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.RetrieveAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = serializers.ProductSerializer
    pagination_class = paginators.ItemPaginator

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = serializers.ProductDetailsSerializer
        return super().retrieve(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        # OuterRef('pk') được sử dụng để tham chiếu đến khóa chính của sản phẩm hiện tại trong truy vấn cha
        first_sale_info = SaleInfo.objects.filter(product=OuterRef('pk')).order_by('id')
        queryset = self.get_queryset().annotate(
            total_reviews=Count('review'),
            cover_image=ProductImage.objects.filter(product=OuterRef('pk'), is_cover=True).values('image')[:1],
            average_rating=Avg('review__rating'),
            price=Subquery(first_sale_info.values('price')[:1])
        )
        serializer = serializers.ProductSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        description = request.data.get('description')
        category_id = request.data.get('category')
        child_cate_id = request.data.get('childCate')
        shop_id = request.data.get('shop')

        category = Category.objects.get(id=category_id)
        child_cate = ChildCate.objects.get(id=child_cate_id)
        shop = Shop.objects.get(id=shop_id)

        p = Product.objects.create(
            name=name,
            description=description,
            category=category,
            childCate=child_cate,
            shop=shop
        )

        return Response(serializers.ProductDetailsSerializer(p).data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        query = self.queryset

        # Lọc theo danh mục
        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            query = query.filter(category_id=cate_id)

        # Lọc theo danh mục con
        child_cate_id = self.request.query_params.get('child_cate_id')
        if child_cate_id:
            query = query.filter(childCate_id=child_cate_id)

        # Lọc theo từ khóa q
        kw = self.request.query_params.get('q')
        if kw:
            query = query.filter(name__icontains=kw)

        return query

    @action(methods=['get', 'post'], url_path='groups', detail=True)
    def product_groups(self, request, pk):
        if request.method == 'GET':
            product_groups = self.get_object().product_groups.filter(active=True)
            return Response(
                serializers.ProductGroupSerializer(product_groups, many=True, context={'request': request}).data)
        elif request.method == 'POST':
            name = request.data.get('name')
            existing_product_groups = ProductGroup.objects.filter(product=self.get_object())
            if existing_product_groups.exists():
                is_main = False
            else:
                is_main = True
            product_groups = ProductGroup.objects.create(name=name, product=self.get_object(), is_main=is_main)

            return Response(serializers.ProductGroupSerializer(product_groups, context={'request': request}).data)

    @action(methods=['get', 'post'], url_path='sales_info', detail=True)
    def product_sales_info(self, request, pk):
        if request.method == 'GET':
            sales_info = self.get_object().product_sales_info.filter(active=True)
            return Response(
                serializers.SaleInfoSerializer(sales_info, many=True, context={'request': request}).data)
        elif request.method == 'POST':
            price = request.data.get('price')
            stock_quantity = request.data.get('stock_quantity')
            st_attribute = request.data.get('st_attribute')
            nd_attribute = request.data.get('nd_attribute')

            sales_info = SaleInfo.objects.create(price=price, stock_quantity=stock_quantity,
                                                 product=self.get_object(), st_attribute=st_attribute,
                                                 nd_attribute=nd_attribute)

            return Response(serializers.SaleInfoSerializer(sales_info, context={'request': request}).data)

    @action(methods=['get', 'post'], url_path='reviews', detail=True)
    def product_reviews(self, request, pk):
        product = self.get_object()
        if request.method.__eq__('GET'):
            prod_reviews = Review.objects.prefetch_related('review_images').filter(active=True, product=product)

            return Response(serializers.ReviewSerializer(prod_reviews, many=True, context={'request': request}).data)
        elif request.method.__eq__('POST'):
            content = request.data.get('content')
            rating = request.data.get('rating')

            r = Review.objects.create(content=content, rating=rating, user=request.user, product=self.get_object())

            return Response(serializers.ReviewSerializer(r).data)

    @action(methods=['post'], detail=True, url_path='images')
    def images(self, request, pk):
        product = self.get_object()
        images = request.data.get('images', [])
        print(images)
        if not (3 <= len(images) <= 9):
            return Response(
                {"error": "Thêm từ 3 đến 9 ảnh"},
                status=status.HTTP_400_BAD_REQUEST
            )

        for index, image_data in enumerate(images):
            # Cho phần tử đầu tiên là ảnh cover.
            image_data['is_cover'] = (index == 0)

            ProductImage.objects.create(is_cover=image_data['is_cover'], image=image_data['image'], product=product)

        return Response({"message": "Up ảnh thành công"}, status=status.HTTP_201_CREATED)

    @action(methods=['post', 'get'], detail=True, url_path='details_value')
    def product_details_value(self, request, pk):
        if request.method.__eq__('POST'):
            product = self.get_object()
            content = request.data.get('content')
            label = LabelDetails.objects.get(id=request.data.get('labelDetails'))
            prod_details = ProductLabelDetails.objects.create(content=content, product=product, labelDetails=label)
            return Response(serializers.ProductLabelDetailsSerializer(prod_details).data)
        elif request.method.__eq__('GET'):
            product = self.get_object()
            value = product.product_details.filter(active=True)
            label = product.labelDetails.all()

            value_serializer = serializers.ProductLabelDetailsSerializer(value, many=True, context={'request': request})
            label_serializer = serializers.LabelDetailsSerializer(label, many=True, context={'request': request})

            return Response({
                "value": value_serializer.data,
                "label": label_serializer.data
            }, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='details_labels')
    def product_details_label(self, request, pk):
        product = self.get_object()
        cate = product.category
        child_cate = product.childCate
        label = LabelDetails.objects.filter(category=cate)
        child_label = LabelDetails.objects.filter(childCate=child_cate)

        label_serializer = serializers.LabelDetailsSerializer(label, context={'request': request}, many=True)
        child_label_serializer = serializers.LabelDetailsSerializer(child_label, context={'request': request},
                                                                    many=True)
        return Response({
            'main_label': label_serializer.data,
            'child_label': child_label_serializer.data
        })


class PaymentViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Payment.objects.filter(active=True)
    serializer_class = serializers.PaymentSerializer


class ShopViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Shop.objects.filter(active=True)
    serializer_class = serializers.ShopDetailsSerializer

    def list(self, request, *args, **kwargs):
        shop_list = self.get_queryset()
        return Response(serializers.ShopSerializer(shop_list, many=True, context={'request': request}).data)

    def retrieve(self, request, *args, **kwargs):
        shop = self.get_object()
        shop_details = serializers.ShopDetailsSerializer(shop, context={'request': request})

        return Response({
            'shop_details': shop_details.data
        })

    @action(methods=['get', 'post'], url_path='address', detail=True)
    def add_address(self, request, pk):
        shop = self.get_object()

        if request.method == 'POST':
            address_serializer = serializers.AddressSerializer(data=request.data)
            if address_serializer.is_valid():
                address, created = Address.objects.update_or_create(
                    shop=shop,
                    defaults=address_serializer.validated_data
                )
                return Response(serializers.AddressSerializer(address).data,
                                status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
            return Response(address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'GET':
            address = shop.shop_address
            if address:
                return Response(serializers.AddressSerializer(address).data)
            return Response({"detail": "Address not found."}, status=status.HTTP_404_NOT_FOUND)


class CateChildrenViewSet(viewsets.GenericViewSet):
    queryset = ChildCate.objects.filter(active=True)
    serializer_class = serializers.ChildCateSerializer

    @action(methods=['get', 'post'], url_path='label_details', detail=True)
    def cate_children_label_details(self, request, pk):
        if request.method == 'GET':
            lb_details = self.get_object().childcate_lb_details.filter(active=True)
            return Response(
                serializers.LabelDetailsSerializer(lb_details, many=True, context={'request': request}).data)
        elif request.method == 'POST':
            name = request.data.get('name')
            ld = LabelDetails.objects.create(name=name, category=self.get_object().superCate,
                                             childCate=self.get_object())

            return Response(serializers.LabelDetailsSerializer(ld).data)


class ProductGroupViewSet(viewsets.GenericViewSet):
    queryset = ProductGroup.objects.filter(active=True)
    serializer_class = serializers.ProductGroupSerializer

    @action(methods=['get', 'post'], url_path='attributes', detail=True)
    def product_group_attribute(self, request, pk):
        if request.method == 'GET':
            pd_group = self.get_object().group_attributes.filter(active=True)
            return Response(
                serializers.GroupAttributeSerializer(pd_group, many=True, context={'request': request}).data)
        elif request.method == 'POST':
            value = request.data.get('value')
            pd_group = GroupAttribute.objects.create(value=value, product_group=self.get_object())

            return Response(serializers.GroupAttributeSerializer(pd_group).data)


class ReviewViewSet(viewsets.GenericViewSet):
    queryset = Review.objects.filter(active=True)
    serializer_class = serializers.ReviewSerializer

    @action(methods=['post'], detail=True, url_path='images')
    def add_images(self, request, pk):
        review = self.get_object()
        image = request.FILES.get('image')

        if not image:
            return Response({"detail": "Không có ảnh nào được chọn"}, status=status.HTTP_400_BAD_REQUEST)

        review_image = ReviewImage.objects.create(review=review, image=image)

        serializer = serializers.ReviewImageSerializer(review_image, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post', 'get'], detail=True, url_path='comments')
    def review_comment(self, request, pk):
        if request.method.__eq__('POST'):
            content = request.data.get('content')
            review = self.get_object()
            comment = Comment.objects.create(content=content, user=request.user, review=review)
            return Response(serializers.CommentSerializer(comment).data)
        elif request.method.__eq__('GET'):
            comments = self.get_object().comment_review.filter(active=True)
            return Response(serializers.CommentSerializer(comments, many=True).data)


class CommentViewSet(viewsets.GenericViewSet):
    queryset = Comment.objects.filter(active=True)
    serializer_class = serializers.CommentSerializer

    @action(methods=['post', 'get'], detail=True, url_path='comments')
    def comment_comment(self, request, pk):
        if request.method.__eq__('POST'):
            content = request.data.get('content')
            comment = self.get_object()
            reply = Comment.objects.create(content=content, user=request.user, reply_to_comment=comment)
            return Response(serializers.CommentSerializer(reply).data)
        elif request.method.__eq__('GET'):
            comments = self.get_object().reply_comment.filter(active=True)
            return Response(serializers.CommentSerializer(comments, many=True).data)


class OrderItemViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # Giỏ hàng
        order_items = OrderItem.objects.filter(user=request.user)
        if not order_items:
            return Response({"detail": "Người dùng không có sản phẩm nào trong giỏ"},
                            status=status.HTTP_204_NO_CONTENT)
        return Response(serializers.OrderItemSerializer(order_items, context={'request': request}, many=True).data)

    def create(self, request, *args, **kwargs):
        quantity = request.data.get('quantity')
        sale_info_id = request.data.get('sale_info_id')
        sale_info = SaleInfo.objects.get(id=sale_info_id)

        product_image = ProductImage.objects.filter(product=sale_info.product, is_cover=True).first()
        image_url = product_image.image.url if product_image else ''

        order_item_data = {
            'order': request.data.get('order'),
            'sale_info': sale_info.id,
            'quantity': quantity,
            'name': sale_info.product.name,
            'unit_price': sale_info.price,
            'image': image_url,
            'user': request.user.id
        }

        serializer = self.get_serializer(data=order_item_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data)


class OrderViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(methods=['get'], detail=True, url_path='order_items')
    def order_order_items(self, request, pk):
        order_items = self.get_object().order_order_item.all()
        return Response(serializers.OrderItemSerializer(order_items, many=True).data)

    def list(self, request, *args, **kwargs):
        order = Order.objects.filter(user=request.user)
        if not order:
            return Response({"detail": "Người dùng không có đơn hàng nào"},
                            status=status.HTTP_204_NO_CONTENT)
        return Response(serializers.OrderSerializer(order, context={'request': request}, many=True).data)

    def create(self, request, *args, **kwargs):
        user = request.user

        # Tạo object Order trước
        order_data = {
            'user': user.id,
            'total_amount': 0,
            'status': OrderStatus.PENDING.value,
        }

        serializer = self.get_serializer(data=order_data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        # Lấy các OrderItem của người dùng hiện tại
        order_items = OrderItem.objects.filter(user=user)

        if not order_items.exists():
            return Response({'detail': 'Người dùng không có sản phẩm nào trong giỏ'}, status=400)

        total_amount = 0

        for item in order_items:
            item.order = order
            item.user = None
            item.save()
            total_amount += item.unit_price * item.quantity

        order.total_amount = total_amount
        order.save()

        return Response(serializer.data)
