# Generated by Django 5.0.6 on 2024-06-22 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_employeradmin_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employer',
            name='email',
            field=models.EmailField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='employer',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='employeradmin',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
