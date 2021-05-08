import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { SearchService } from '../services/search.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchInput: DebugElement
  let exchangeSvc: ExchangeRateService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule, HttpClientModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [SearchService, ExchangeRateService,],
    })

      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchInput = fixture.debugElement.query(By.css('input[type=search]'))
    exchangeSvc = TestBed.inject(ExchangeRateService);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('search for correct input', async (done: DoneFn) => {
    //setup the component;
    component = fixture.componentInstance;

    let control = component.currencyControl;
    //setup the input value.
    control.patchValue('USD');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input[type=search]'));
    //compare two way binding;
    expect(input.nativeElement.value).toEqual('USD');
    //call function.
    component.completedSearch();
    //checking for service's variable.
    expect(exchangeSvc.currency
    ).toEqual('USD');
    //test Response of API.
    await exchangeSvc.getDataByAPI().subscribe((rep: any) => {
      expect(exchangeSvc.showCardsubject.value).toEqual(true);
      expect(rep.base).toEqual('USD');
      expect(exchangeSvc.baseSubject.value).toEqual('USD');


    })

    //clearing formcontrol value.
    component.clearSearch();
    expect(control.value).toEqual('');
    done();
  });


  it('invalid input', async (done: DoneFn) => {
    component = fixture.componentInstance;

    let control = component.currencyControl;
    //input the invail value.
    control.patchValue('1234');
    //test for validation
    expect(control.valid).toEqual(false);
    fixture.detectChanges();
    //compare input value and control value.
    const input = fixture.debugElement.query(By.css('input[type=search]'));
    expect(input.nativeElement.value).toEqual(control.value);
    component.completedSearch();
    //checking for invalid result.
    expect(exchangeSvc.currency
    ).toBe(undefined)
    //second case of invail input
    control.patchValue('ABC');
    component.completedSearch();
    //pass the validation, service.currency has been setup.
    expect(exchangeSvc.currency
    ).toEqual('ABC')
    exchangeSvc.getDataByAPI().subscribe((rep: any) => {
      //test for error response
      exchangeSvc.baseSubject.next(rep.base);
      expect(exchangeSvc.showCardsubject.value).toEqual(false);
      expect(exchangeSvc.baseSubject.value).toEqual('');

    })
    done();

  });

});


