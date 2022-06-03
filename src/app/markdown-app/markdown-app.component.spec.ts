import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownAppComponent } from './markdown-app.component';

describe('MarkdownAppComponent', () => {
  let component: MarkdownAppComponent;
  let fixture: ComponentFixture<MarkdownAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
