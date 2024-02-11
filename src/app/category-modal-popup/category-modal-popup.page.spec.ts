import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CategoryModalPopupPage } from './category-modal-popup.page';

describe('CategoryModalPopupPage', () => {
  let component: CategoryModalPopupPage;
  let fixture: ComponentFixture<CategoryModalPopupPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(CategoryModalPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
