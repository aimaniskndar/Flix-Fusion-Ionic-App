import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseGenreDetailsPage } from './browse-genre-details.page';

describe('BrowseGenreDetailsPage', () => {
  let component: BrowseGenreDetailsPage;
  let fixture: ComponentFixture<BrowseGenreDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BrowseGenreDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
