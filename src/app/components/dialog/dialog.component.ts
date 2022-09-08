import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ['Brand New', 'Second Hand'];
  productForm !: FormGroup;

  actionBtn: string = "Create";

  constructor(private formBuilder: FormBuilder, private api: ApiService, private matDialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {

  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      buyingDate: ['', Validators.required],
      productType: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['productType'].setValue(this.editData.productType);
      this.productForm.controls['buyingDate'].setValue(this.editData.buyingDate);
      this.productForm.controls['description'].setValue(this.editData.description);
    }

  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.newProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product Created Successfully!');
            this.productForm.reset();
            this.matDialog.close('save');
          },
          error: () => {
            alert("Something went wrong!");
          }
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Product Updated Successfully!")
        this.productForm.reset();
        this.matDialog.close("update");
      },
      error: (err) => {
        alert("Something went wrong!");
      }
    })
  }


}
