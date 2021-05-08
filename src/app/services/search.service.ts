import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
//this one is not neccessary.
  constructor(private _snackBar: MatSnackBar) { }
  //focus on the element;
 public onSearch() {
    setTimeout((_: any) => {
      let element = document.getElementById('searchInput')
      if (element)
        element.focus()
      300
    }
    );
  }
  //show snakbar message
  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
