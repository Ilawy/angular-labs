import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { Product } from "../../types/product";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { FormsModule } from "@angular/forms";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-product-route",
  imports: [FormsModule],
  templateUrl: "./product-route.component.html",
  styleUrl: "./product-route.component.css",
})
export class ProductRouteComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: Error | null = null;
  //prevent adding items as long as there's a going cart request
  locked = false

  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  @Input()
  id!: string;

  availableQuantity = signal(0)

  buyProps = {
    quantity: 1,
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    firstValueFrom(this.productsService.getOne(this.id)).then(result=>{
      this.product = result
      this.availableQuantity.set(this.product.stock - this.cartService.cartedQuantityOfItem(this.product.id))
    }).catch(error=>{
      this.error = error
      console.log(error);
      
    })
    .finally(()=>this.loading = false)
    .finally(()=>{
    })
  }


  handleCartAdding(){
    this.locked = true
    this.cartService.addItem(this.product!.id, +this.buyProps.quantity).finally(()=>{
      this.locked = false
    })
    this.availableQuantity.set(this.product!.stock - this.cartService.cartedQuantityOfItem(this.product!.id))
    
  }

  currentImage = 0;
}
