from django.urls import path
from .views import product,product_add, get_products,delete_products,delete_single_product,edit_product


urlpatterns=[
    path("",product),
    path("create-product/",product_add,name="create-product"),
    path("get_products/",get_products),
    path("delete_single_product/<int:p_id>/", delete_single_product),
    path("delete_products/", delete_products),
    path("edit_product/<int:p_id>/",edit_product),
    
]