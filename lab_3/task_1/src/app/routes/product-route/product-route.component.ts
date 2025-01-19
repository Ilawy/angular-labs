import { Component, Input, OnInit } from "@angular/core";
import { Product } from "../../types/product";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-route",
  imports: [],
  templateUrl: "./product-route.component.html",
  styleUrl: "./product-route.component.css",
})
export class ProductRouteComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: Error | null = null;

  @Input()
  id!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    fetch("./products.json")
      .then((d) => d.json())
      .then((d: { products: Product[] }) => {
        const currentProduct = d.products.find((product) =>
          product.id === +(this.id)
        );
        if (!currentProduct) {
          this.error = new Error("Product not found");
        } else {
          this.product = currentProduct;
        }
        return currentProduct
      })
      // .then(p=>console.log())
      .catch((e) => this.error = e)
      .finally(() => this.loading = false);
  }

  currentImage = 0;
}
