import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStartupComponent } from './recipe-startup.component';

describe('RecipeStartupComponent', () => {
  let component: RecipeStartupComponent;
  let fixture: ComponentFixture<RecipeStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeStartupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
