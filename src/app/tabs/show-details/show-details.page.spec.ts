import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShowDetailsPage } from './show-details.page';

describe('ShowDetailsPage', () => {
  let component: ShowDetailsPage;
  let fixture: ComponentFixture<ShowDetailsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ShowDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
