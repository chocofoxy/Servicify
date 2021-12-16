import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesComponent } from 'src/app/pages/admin/categories/categories.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  category = { name: '' }

  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory() {
    this.adminService.addCategory(this.category).then(() => {
      this.openSnackBar(" Category added successfully")
      this.dialogRef.close();
    }).catch(e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 500 });
  }

}
