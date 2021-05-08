import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }
  public currency: string | undefined;
  
  //Show progreess bar when value=true.
  public loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public baseSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // Datasource of exchangeRate table
  public dataSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  //Data for all API.
  public apiData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  //display mat-card in main page or not.
  public showCardsubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  public getDataByAPI(): any {
    return this.http.get<any>(`https://api.exchangerate-api.com/v4/latest/${this.currency}`).
      pipe(catchError(async (error) => {
        //open Angular Material Snackbar to show error message for 2 seconds.
        this.openSnackbar(error.message, error.name)
      }),tap((rep: { rates: any; base: string; }) => {
        //subscription start
        this.loadingSubject.next(true);
        if (rep) {
          //get response of API
          this.apiData.next(rep);
          //get response rates of API.
          this.dataSource.next(this.getDateSource(rep.rates));
          //showCard enable
          this.showCardsubject.next(true);
          //get base currency
          this.baseSubject.next(rep.base);
          this.openSnackbar(`connect to the api, your base currency was ${rep.base}`, 'success')
        }
        //subscription completed
        this.loadingSubject.next(false);
      }))
  }
  public setCurreny(inputData: string): any {
    //set up the selected currency.
    this.currency = inputData;
    this.getDataByAPI().subscribe();
  }
  //convert key value pair map to the list of object.
  public getDateSource(selectMap: any): any {
    let tableHeader = Object.keys(selectMap);
    let dataSource = []
    let rate = selectMap;
    let header = tableHeader;
    for (let i = 0; i < header.length; i++) {
      let element = { currency: header[i], rate: rate[header[i]] }
      dataSource.push(element);
    }
    return dataSource;
  }

  public openSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
