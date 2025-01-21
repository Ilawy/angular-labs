import { Component, EventEmitter, inject } from "@angular/core";
import { CartItem, CartService } from "../../services/cart.service";
import { Product } from "../../types/product";
import { ProductsService } from "../../services/products.service";
import { firstValueFrom, Observable } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-cart-route",
  imports: [RouterLink],
  templateUrl: "./cart-route.component.html",
  styleUrl: "./cart-route.component.css",
})
export class CartRouteComponent {
  private cartService = inject(CartService);
  private productsService = inject(ProductsService);

  loading: boolean = true;

  items: { product: Product; quantity: number }[] = [];

  constructor() {}

  async load() {
    this.loading = true
    const cartItems = await this.cartService.listItems();
    this.items = await Promise.all(cartItems.map(async (item) => {
      return {
        product: await firstValueFrom(
          this.productsService.getOne(`${item.itemId}`),
        ),
        quantity: item.quantity,
      };
    })).finally(()=>{
      this.loading = false
    });
  }

  async ngOnInit() {
    this.load();
  }

  increaseItemQuantity(itemId: number) {
    this.cartService.addItem(itemId, 1).finally(() => this.load());
  }

  decreaseItemQuantity(itemId: number) {
    this.cartService.removeItem(itemId, 1).finally(() => this.load());
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(
      itemId,
      this.items.find((i) => i.product.id === itemId)!.quantity,
    ).finally(() => this.load());
  }
}
