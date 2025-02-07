# Generated by Django 5.1.2 on 2024-12-10 04:08

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0033_alter_reviewimage_image_alter_shop_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=cloudinary.models.CloudinaryField(default='https://res.cloudinary.com/dthrh2pgj/image/upload/v1728619680/fc047347b17f7df7ff288d78c8c281cf_wncxc8.png', max_length=255),
        ),
    ]
