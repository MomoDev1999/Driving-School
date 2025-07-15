import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyModuleDetailPage } from './study-module-detail.page';

describe('StudyModuleDetailPage', () => {
  let component: StudyModuleDetailPage;
  let fixture: ComponentFixture<StudyModuleDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyModuleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
