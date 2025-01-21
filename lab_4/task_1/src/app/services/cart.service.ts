import { inject, Injectable, signal } from "@angular/core";
import { ProductsService } from "./products.service";
import { firstValueFrom } from "rxjs";

export interface CartItem {
  itemId: number;
  quantity: number;
}

const cart_storage_key = "ecom_cart"

@Injectable({
  providedIn: "root",
})
export class CartService {
  items: CartItem[] = [];

  private productsService = inject(ProductsService);
  totalItems = signal(0)

  constructor() {
    this.#_load()
  }

  #_store(){
    window.localStorage.setItem(cart_storage_key, JSON.stringify(this.items))
    this.totalItems.set(
      this.items.reduce((total, item)=>total+item.quantity, 0)
    )
  }

  #_load(){
    const raw = window.localStorage.getItem(cart_storage_key)
    if(raw){
      try{
        this.items = JSON.parse(raw)
        this.totalItems.set(
          this.items.reduce((total, item)=>total+item.quantity, 0)
        )
      }catch(e){
        window.localStorage.removeItem(cart_storage_key)
      }
    }
  }

  cartedQuantityOfItem(itemId: number) {
    return this.items.find((item) => item.itemId === itemId)?.quantity || 0;
  }

  async addItem(itemId: number, quantity: number) {
    const availableStock = await firstValueFrom(
      this.productsService.getOne(`${itemId}`),
    ).then((d) => d.stock);

    const index = this.items.findIndex((item) => item.itemId === itemId);
    if (index < 0) {
      //new item
      if (availableStock >= quantity) {
        this.items.push({
          itemId,
          quantity,
        });
      } else {
        alert("cannot add item, stock won't cover requested quantity");
      }
    } else {
      if (availableStock >= this.items[index].quantity + quantity) {
        this.items[index].quantity += quantity;
      } else {
        alert("cannot add item, stock won't cover requested quantity");
      }
    }
    this.#_store()
  }

  async removeItem(itemId: number, quantity: number){
    const index = this.items.findIndex((item) => item.itemId === itemId);
    if(index >= 0){
      const ref = this.items[index]
      ref.quantity -= quantity;
      console.log(ref);
      if(ref.quantity <= 0)this.items = this.items.filter(item=>item.itemId !== itemId);
      this.#_store()

    }
  }



  async listItems(){
    return this.items
  }
}
