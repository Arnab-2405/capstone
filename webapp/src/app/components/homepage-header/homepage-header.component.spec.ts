import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageHeaderComponent } from './homepage-header.component';

describe('HomepageHeaderComponent', () => {
  let component: HomepageHeaderComponent;
  let fixture: ComponentFixture<HomepageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageHeaderComponent]
    });
    fixture = TestBed.createComponent(HomepageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
