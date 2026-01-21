from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Products

# Create your views here.
def product(request):
    return render(request,"productForm.html")
@api_view(["GET"])
def get_products(request):
    a=Products.objects.all()
    lData=[]
    for i in a:
        lData.append({
            "id":i.id,
            "name":i.namep,
            "desc":i.descp,
            "price":i.pricep,
            "cat":i.catp,
            "img":i.imgp,
        })
    print(lData)
    return Response({
        "success":True,
        "total":len(a),
        "products":lData})


@api_view(["POST"])
def product_add(request):
    Data=request.data
    # print(pData)
    
    pn=Data.get("name")
    pd=Data.get("desc")
    pp=int(Data.get("price"))
    pc=Data.get("cat")
    pi=Data.get("img")

    Products.objects.create(
        namep=pn,
        descp=pd,
        pricep=pp,
        catp=pc,
        imgp=pi,
    )

    return Response({"msg":"product revieved successfully"})


@api_view(["DELETE"])
def delete_single_product(request,p_id):
    Products.objects.get(id=p_id).delete()
    return Response({"message": " products deleted"})



@api_view(["DELETE"])
def delete_products(request):
    Products.objects.all().delete()
    return Response({"message": "All products deleted"})

@api_view(["PUT"])
def edit_product(request,p_id):
    needtoedit=Products.objects.get(id=p_id)
    # print(needtoedit,"nedd to edit")
    dataFromc=request.data
    needtoedit.namep=dataFromc["name"]
    needtoedit.descp=dataFromc["desc"]
    needtoedit.pricep=dataFromc["price"]
    needtoedit.catp=dataFromc["cat"]
    needtoedit.imgp=dataFromc["img"]
    needtoedit.save()

    return Response({"msg":"updated.."})