import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyModulesPage } from './study-modules.page';

describe('StudyModulesPage', () => {
  let component: StudyModulesPage;
  let fixture: ComponentFixture<StudyModulesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyModulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
