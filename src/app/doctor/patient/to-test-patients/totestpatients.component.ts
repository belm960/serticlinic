import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/admin/patients/allpatients/patient.service';
import { Patient } from 'src/app/admin/patients/allpatients/patient.model';
import { FormDialogComponent } from 'src/app/admin/patients/allpatients/dialog/form-dialog/form-dialog.component';
import { WindowScrollController } from '@fullcalendar/core';
import { Forms1Component } from './form/forms1.component';
import {apiUrl} from 'src/environments/environment';
import { Visit } from 'src/app/shared/security/visit';

@Component({
  selector: 'app-totestpatients',
  templateUrl: './totestpatients.component.html',
  styleUrls: ['./totestpatients.component.sass'],
})
export class TotestPatientsComponent implements OnInit {
  displayedColumns = [
    'select',
    'id',
    'sortDate',
    'first',
    'email',
    'gender',
    'mobile',
    'dob',
    'Lab Result',
    'Rad Result',
    'pStatus'
  ];
  exampleDatabase: PatientService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Patient>(true, []);
  index: number;
  id: any;
  patient: Patient | null;
  rowkey= 'ROW_KEY';
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientService: PatientService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: this.patient,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.unshift(
          this.patientService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editCall(row) {
    const dialogRef = this.dialog.open(Forms1Component, {
      data: {
        patient: row,
      }, 
    });
  }
  setid(rowid){
    window.localStorage.removeItem(this.rowkey);
    window.localStorage.setItem(this.rowkey,rowid);
  }
  getid(){
  return  window.localStorage.getItem('ROW_KEY');
  }
  
  

  updatepatient(rowid) {
    this.setid(rowid);
   
  
    this.router.navigate(['/doctor/patientprofile']).then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
       });
    }
 
  deleteItem(rowid: any) {
    const rooturl = apiUrl+'/Patient';      
     this.httpClient.delete(rooturl + '/' + rowid).subscribe(data =>{
      this.loadData();
      this.showNotification(
        'snackbar-danger',
        'Delete Record Successfully...!!!',
        'bottom',
        'center')
     })
    
   
       
       
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Patient>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new PatientService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
export class ExampleDataSource extends DataSource<Patient> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Patient[] = [];
  renderedData: Patient[] = [];
  constructor(
    public _exampleDatabase: PatientService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Patient[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllInprogressPatientsTod();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((patient: Patient) => {
            const searchStr = (
              patient.sortDate+
              patient.name +
              patient.first +
              patient.gender +
              patient.address +
              patient.date +
              patient.bGroup +
              patient.treatment +
              patient.mobile
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: Patient[]): Patient[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | Date | string = '';
      let propertyB: number | Date | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'sortDate':
          [propertyA, propertyB] = [a.sortDate, b.sortDate];
          break;
        case 'gender':
          [propertyA, propertyB] = [a.gender, b.gender];
          break;
        case 'date':
          [propertyA, propertyB] = [a.date, b.date];
          break;
        case 'address':
          [propertyA, propertyB] = [a.address, b.address];
          break;
        case 'mobile':
          [propertyA, propertyB] = [a.mobile, b.mobile];
          break;
          case 'first':
          [propertyA, propertyB] = [a.first, b.first];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
