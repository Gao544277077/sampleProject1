import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ExchangeRateService } from '../services/exchange-rate.service';

@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css']
})
export class ApiDataComponent implements OnInit {
  dataSubject: BehaviorSubject<any> = this.exchangeSvc.apiData;


  constructor(private exchangeSvc: ExchangeRateService,
    private dialogRef: MatDialogRef<ApiDataComponent>,) { }
  //Array of gril-list
  tiles: any[] = [
    { label: "WARNING_UPGRADE_TO_V6", text: this.dataSubject.value.WARNING_UPGRADE_TO_V6, cols: 1, rows: 1, color: 'gray' },
    { label: "base", text: this.dataSubject.value.base, cols: 1, rows: 1, color: 'azure' },
    { label: "date", text: this.dataSubject.value.date, cols: 1, rows: 1, color: 'gray' },
    { label: "provider", text: this.dataSubject.value.provider, cols: 1, rows: 1, color: 'azure' },
    { label: "terms", text: this.dataSubject.value.terms, cols: 1, rows: 1, color: 'gray' },
    { label: "time_last_updated", text: this.dataSubject.value.time_last_updated, cols: 1, rows: 1, color: 'azure' },
  ];


  ngOnInit(): void {
    console.log(this.dataSubject);
  }
  //close dialog
  close() {
    this.dialogRef.close();
  }
}
