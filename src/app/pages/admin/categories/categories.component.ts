import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddCategoryComponent } from 'src/app/components/add-category/add-category.component';
import { AdminService } from 'src/app/services/admin.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'nb_employees', 'actions'];
  categories = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search = ''

  constructor(private adminService: AdminService, private suggestionService: SuggestionService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent,{ width: '500px' , data: {}});
    dialogRef.afterOpened().subscribe( ()=> {
      console.log('open')
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getList()
    });
  }

  ngOnInit() {
    this.categories.filterPredicate = (data: any , filter: string) => {
      return data.name.includes(filter);
    };
    this.getList()
  }

  getList() {
    this.suggestionService.listCategories().then((response: any) => {
      this.categories.data = response
    }).catch((e) => console.log(e))
  }

  ngAfterViewInit() {
    this.categories.paginator = this.paginator;
  }

  clear() {
      this.search = ''
  }

  filter() {
    this.categories.filter = this.search
  }

  delete(id) {
    this.adminService.deleteCategory(id).then(() => {     
      this.getList()
      this.openSnackBar(" You successfully deleted this category !")
    }).catch(e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 5 });

  }
}
