import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public baseSubject:BehaviorSubject<string>=this.exchangeSvc.baseSubject;
  currencyControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
  @ViewChild('searchInput')
  private searchInput!: ElementRef;
  constructor(private exchangeSvc: ExchangeRateService, private searchSvc: SearchService
  ) {
  }
  

  completedSearch() {
    if (this.currencyControl.valid && this.currencyControl.value != '') {
      this.exchangeSvc.setCurreny(this.currencyControl.value);
      if (this.searchInput.nativeElement instanceof HTMLElement) {
        this.searchInput.nativeElement.blur();
      }
    } else {
      this.searchSvc.openSnackBar('Please enter the correct Currency', 'error');
    }
  }
  //clear the input data of control.
  clearSearch() {
    this.currencyControl.patchValue('');
  }
  //focus on search box.
  onSearch() {
    this.searchSvc.onSearch();
  }

  ngOnInit(): void {
  }

}
