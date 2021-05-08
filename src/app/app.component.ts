import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ApiDataComponent } from './api-data/api-data.component';
import { SearchComponent } from './search/search.component';
import { DialogService } from './services/dialog.service';
import { ExchangeRateService } from './services/exchange-rate.service';
import { SearchService } from './services/search.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sampleProject1';
  showCard:BehaviorSubject<boolean>=this.exchangeSvc.showCardsubject;
  loadingSubject:BehaviorSubject<boolean>=this.exchangeSvc.loadingSubject
  currencyControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(3)]);
  constructor(private exchangeSvc: ExchangeRateService, private searchSvc: SearchService,private dialogSvc:DialogService,
    public dialog: MatDialog,
    ) {
  }

  //open the popup modal.
  openDialog(cardNumber:number){
    if(cardNumber===1){
    this.dialogSvc.openDialog(TableComponent);
    }else if(cardNumber===2){
      this.dialogSvc.openDialog(ApiDataComponent);
    }
  }
}
