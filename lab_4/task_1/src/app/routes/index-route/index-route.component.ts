import { Component, effect, inject, signal } from "@angular/core";
import { Product } from "../../types/product";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { chunk } from "../../../lib/utils";
import { HttpClient } from "@angular/common/http";
import { ProductsService } from "../../services/products.service";
import { lastValueFrom } from "rxjs";

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

  private httpClient = inject(HttpClient);

  currentPage = signal<null | number>(null);
  pageCount = signal<number>(1);

  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
  ) {
    router.queryParams
      .subscribe((params) => {
        // this.currentPage.set()
        const rawPage = +params["page"];
        const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
        console.log(page);
        
        this.currentPage.set(page);
        lastValueFrom(productsService.getList(page - 1)).then(d=>{
          this.products = d.products
          this.pageCount.set(Math.ceil(d.total / 10))
        })
      });
  }


  range(length: number){
    return Array.from({ length }).map((_, i)=>i)
  }

  ngOnInit() {
  }
}
