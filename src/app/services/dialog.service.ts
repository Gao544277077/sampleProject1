import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver,) { }
  //BreakpointState is a observable uses to checking the width of your brower.
  private isSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Small);
  //open component with popup modal
  public openDialog(component: ComponentType<any>) {
    //configuaration of popup modal.
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    };
    //open and initialize the dialog componenet 
    const signInDialogRef = this.dialog.open(component, dialogConfig);
    const smallDialogSubscription = this.isSmall.subscribe(result => {
      //set up different size of dialog (width=960)
      if (result.matches) {
        //less than 960
        signInDialogRef.updateSize('100%', '100%');
      } else {
        //greater than 960
        signInDialogRef.updateSize('80%%', '80%');
      }
    });
    //dialog close unsubscribe the subscription.
    signInDialogRef.disableClose = true;
    signInDialogRef.afterClosed().subscribe(result => {
      smallDialogSubscription.unsubscribe();
    });
  }
}
