import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseGenrePage } from './browse-genre.page';

describe('BrowseGenrePage', () => {
  let component: BrowseGenrePage;
  let fixture: ComponentFixture<BrowseGenrePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BrowseGenrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
