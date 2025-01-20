import { Component } from "@angular/core";
import { Product } from "../../types/product";
import { RouterLink } from "@angular/router";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { chunk } from "../../../lib/utils";

@Component({
  selector: "app-index-route",
  imports: [RouterLink, ProductCardComponent],
  templateUrl: "./index-route.component.html",
  styleUrl: "./index-route.component.css",
})
export class IndexRouteComponent {
  products: Product[] = [];
  loading = false;
  error: Error | null = null;

  _sm_media = window.matchMedia("(max-width: 300px)");

  elementsPerChunk = this._sm_media.matches ? 2 : 4;

  ngOnInit() {
    fetch("./products.json")
      .then((d) => d.json())
      .then((d) => d.products)
      // .then(d=>(console.log(d), d))
      .then((d) => this.products = d)
      .catch((e) => this.error = e)
      .finally(() => this.loading = false);

    this._sm_media.onchange = () => {
      console.log(this._sm_media);
    };
  }
}
