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
     let val = document.getElementById('checkoutAlert');
     console.log("val",val.id);
    val.style.display = "none";
    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      this.total += (objProd.price * objProd.quantity);
      
      if (this.total <1000) {
        val.style.display = "block";
      } else {
        val.style.display = "none";
      }
    } 
  }

  addToCart(pid){
    console.log(pid);
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
    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      if(objProd.id == pid){
        this.arrProds.splice(parseInt(ele),1);
      }
      }
    this.totalPrice();
  }
  addQuantity(pid){
    for (var ele of Object.keys(this.arrProds)){
      let objProd = this.arrProds[ele];
      if(objProd.id == pid){
        objProd.quantity +=1;
      }
      }
    this.totalPrice();
  }

  delQuantity(pid){
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
    let disAlert = document.getElementById('discountAlert');
    disAlert.style.display = "none";
  if(val>1000){
    let dis:number ;
     dis = 10/100;
      this.discount += (val-(val* dis));
      disAlert.style.display = "block";
  }else{
    disAlert.style.display = "none";
    
  }
  }

}
