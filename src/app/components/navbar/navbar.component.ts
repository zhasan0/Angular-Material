import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MaterialCrudComponent } from '../material-crud/material-crud.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends MaterialCrudComponent implements OnInit {

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      'width': '40%'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'save') {
        location.reload();
      }
    });
  }

}
