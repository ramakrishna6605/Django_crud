let addpbtn=document.getElementById("addpbtn")
let getBtn=document.getElementById("getBtn")
let tBody=document.getElementById("tBody")
let dlteTablebtn=document.getElementById("dlteTable")
let pForm=document.getElementById("pForm")
let editId=null
function loadProducts(){
    tBody.innerHTML=""
    fetch("/api/get_products/").then(res=>res.json()).then(res=>{
        console.log(res)
        res.products.forEach(x=>{
            let Trow=document.createElement("tr")
            Trow.innerHTML=`
            <td>${x.id}</td>
            <td>${x.name}</td>
            <td>${x.desc}</td>
            <td>${x.price}</td>
            <td>${x.cat}</td>
            <td><button onclick="editproduct(${x.id})">Edit</button></td>
            <td><button onClick="deleteProduct(${x.id})">Delete</button></td>
            <td>
            <img src='${x.img}' width=150/>
            </td>`
            tBody.append(Trow)
        });
    })
}
function editproduct(id) {
    editId = id
    addpbtn.style.display = "none"
    updatepbtn.style.display = "inline-block"

    fetch("/api/get_products/")
        .then(res => res.json())
        .then(res => {
            let item = res.products.find(p => p.id === id)

            document.getElementById("name").value = item.name
            document.getElementById("desc").value = item.desc
            document.getElementById("price").value = item.price
            document.getElementById("cat").value = item.cat
            document.getElementById("img").value = item.img
        })
}


updatepbtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (!editId) return

    let updatedProduct = {
        name: document.getElementById("name").value,
        desc: document.getElementById("desc").value,
        price: document.getElementById("price").value,
        cat: document.getElementById("cat").value,
        img: document.getElementById("img").value,
    }

    fetch(`/api/edit_product/${editId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
    })
    .then(res => res.json())
    .then(() => {
        loadProducts()
        pForm.reset()
        editId = null
        addpbtn.style.display = "inline-block"
    })
})


function deleteProduct(id){
    fetch(`/api/delete_single_product/${id}/`,{
        method:"DELETE"

    })
    .then(res=>res.json())
    .then(()=>loadProducts())
    .catch(err=>console.error(err))
}
dlteTablebtn.addEventListener("click",(e)=>{
    e.preventDefault()
    fetch(`/api/delete_products/`,{
        method:"DELETE"
    })
    .then(res=>res.json())
    .then(res=>loadProducts())
    })
getBtn.addEventListener("click",(e)=>{
    console.log("clicked")
    loadProducts();
})
if(addpbtn){
addpbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    let newp={
        name:document.getElementById("name").value,
        desc:document.getElementById("desc").value,
        price:document.getElementById("price").value,
        cat:document.getElementById("cat").value,
        img:document.getElementById("img").value,
    }
    fetch("/api/create-product/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newp)

    })
    .then(res=>res.json())
    .then(()=>loadProducts())
    pForm.reset()
    
})
}



document.addEventListener("DOMContentLoaded",()=>{
    loadProducts()})