# Generated by Django 5.1.2 on 2024-12-01 14:22

import ckeditor.fields
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0019_delete_shop'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, unique=True)),
                ('description', ckeditor.fields.RichTextField()),
                ('logo', models.ImageField(upload_to='shops_logo/%Y/%m/')),
                ('email', models.CharField(max_length=100, unique=True)),
                ('phone', models.CharField(max_length=15)),
                ('business_type', models.CharField(choices=[('individual', 'Individual'), ('business_household', 'Business Household'), ('company', 'Company')], default='individual', max_length=20)),
                ('address', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='ecommerceapp.address')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='staff', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
