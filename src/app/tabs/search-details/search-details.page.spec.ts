import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchDetailsPage } from './search-details.page';

describe('SearchDetailsPage', () => {
  let component: SearchDetailsPage;
  let fixture: ComponentFixture<SearchDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
