import { Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private cartService = inject(CartService);
  total: Signal<number>
  constructor(){
    this.total = this.cartService.totalItems
  }

  
}
