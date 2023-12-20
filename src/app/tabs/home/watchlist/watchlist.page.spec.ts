import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WatchlistPage } from './watchlist.page';

describe('WatchlistPage', () => {
  let component: WatchlistPage;
  let fixture: ComponentFixture<WatchlistPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(WatchlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
