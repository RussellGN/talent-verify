# Generated by Django 5.0.6 on 2024-07-09 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_role_duties'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employer',
            name='email',
            field=models.EmailField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
