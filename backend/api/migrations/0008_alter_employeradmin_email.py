# Generated by Django 5.0.6 on 2024-06-28 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_employee_national_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeradmin',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
    ]