import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartRouteComponent } from './cart-route.component';

describe('CartRouteComponent', () => {
  let component: CartRouteComponent;
  let fixture: ComponentFixture<CartRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
