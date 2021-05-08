import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';
import { ExchangeRateService } from '../services/exchange-rate.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  LoadingSubject:BehaviorSubject<boolean>=this.srv.loadingSubject;
  dataSource=this.srv.dataSource;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('input')
  input!: ElementRef;
  displayedColumns: string[] = ['currency', 'rate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(private srv:ExchangeRateService,     private dialogRef: MatDialogRef<TableComponent>,
    ){
   
  }

  ngOnInit(){
    
  }
  close(){
    this.dialogRef.close();
  }

}
