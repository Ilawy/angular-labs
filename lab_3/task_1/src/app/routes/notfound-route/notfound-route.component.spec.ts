import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundRouteComponent } from './notfound-route.component';

describe('NotfoundRouteComponent', () => {
  let component: NotfoundRouteComponent;
  let fixture: ComponentFixture<NotfoundRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotfoundRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotfoundRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
