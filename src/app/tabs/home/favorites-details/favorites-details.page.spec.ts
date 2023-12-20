import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesDetailsPage } from './favorites-details.page';

describe('FavoritesDetailsPage', () => {
  let component: FavoritesDetailsPage;
  let fixture: ComponentFixture<FavoritesDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FavoritesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
