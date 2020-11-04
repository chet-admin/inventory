import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.css']
})
export class FinalPageComponent implements OnInit {
 
  constructor(private httpService:HttpClient) { }
  arrProds:string[];
  total:number = 0;
  discount:number = 0;
  ngOnInit(): void {
    this.httpService.get('./assets/products.json').subscribe(data=>{
      this.arrProds = data as string[];
      console.log(this.arrProds);
    },
    err=>{
      console.log (err.message);
    });
   // this.totalPrice();
  }

  totalPrice(){
    this.total = 0;
    let val = document.getElementById('discountAlert');
    console.log("val",val.id);
    val.style.display = "none";
    // for(var i=0;i<this.products.length;i++){
    //   this.total += (this.products[i].product_price * this.products[i].product_quality);
    // }
    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      this.total += (objProd.price * objProd.quantity);
      
      if (this.total > 1000) {
        val.style.display = "block";
      } else {
        val.style.display = "none";
      }
    } 
  }

  addToCart(pid){
    console.log(pid);
    // this.total = 0;

    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      if(objProd.id == pid){
         if(objProd.quantity > 0){
          this.totalPrice();
         }
      }
      }
    console.log("@@@@@",this.arrProds);
  }
  removeFromCart(pid){
    console.log(pid);
    // for(var i=0;i<this.products.length;i++){
    //   if(this.products[i].product_id === pid)
    //   {  
    //     this.products.splice(i,1);
    //   }           
    // }
    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      if(objProd.id == pid){
        //this.total+= objProd.price;
        this.arrProds.splice(parseInt(ele),1);
      }
      }
    this.totalPrice();
    console.log(this.arrProds);
  }
  addQuantity(pid){
    console.log(pid);
    // for(var i=0;i<this.arrProds.length;i++){
    //   if(this.arrProds[i].quantity === pid)
    //   {  
    //     this.arrProds[i].quantity += 1;
    //   }           
    // }
    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      if(objProd.id == pid){
        objProd.quantity +=1;
        console.log("total",objProd.quantity);
      }
      }
    this.totalPrice();
    console.log(this.arrProds);
  }

  delQuantity(pid){
    console.log(pid);
    // for(var i=0;i<this.products.length;i++){
    //   if(this.products[i].product_id === pid)
    //   {  
    //     this.products[i].product_quality -= 1;
    //   }           
    // }
    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      if(objProd.id == pid){
        objProd.quantity -=1;
        console.log("total",objProd.quantity);
      }
      }
   this.totalPrice();
    console.log(this.arrProds);
  }
  checkout(val){
    this.discount  = 0;
    let value = document.getElementById('checkoutAlert');
    console.log("value",value.id);
    value.style.display = "none";
  if(val>1000){
    let dis:number ;
     dis = 10/100;
      this.discount = (val-(val* dis));
      value.style.display = "none";
      console.log(this.discount);
  }else{
    value.style.display = "block";
    
  }
  }

}
