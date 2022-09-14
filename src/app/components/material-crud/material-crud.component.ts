import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-material-crud',
  templateUrl: './material-crud.component.html',
  styleUrls: ['./material-crud.component.css']
})
export class MaterialCrudComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'productType', 'buyingDate', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        // console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('error');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      'width': '40%',
      data: row
    }).afterClosed().subscribe(result => {
      if (result == 'update') {
        this.getProduct();
      }
    });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert("Product Deleted Successfully!")
        this.getProduct();
      },
      error: (err) => {
        alert("Something went wrong!")
      }
    })
  }
}
