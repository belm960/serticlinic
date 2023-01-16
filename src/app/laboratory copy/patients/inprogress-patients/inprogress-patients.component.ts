import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsRadService } from '../allpatients/patientsrad.service';
import { Patient } from '../allpatients/patient.model';
import { FormDialogComponent } from '../allpatients/dialog/form-dialog/form-dialog.component';
import { FormComponent } from '../form/form.component';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-inprogress-patients',
  templateUrl: './inprogress-patients.component.html',
  styleUrls: ['./inprogress-patients.component.sass'],
})
export class InprogresspatientsComponent implements OnInit {
  displayedColumns = [
    'select',
    'patient_ID',
    'sortDate',
    'first',
    'email',
    'gender',
    'mobile',
    'dob',
    'pStatus'
  ];
  exampleDatabase: PatientsRadService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Patient>(true, []);
  index: number;
  patient: Patient | null;
  patientForm: FormGroup;
  id: any;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientsService: PatientsRadService,
    private snackBar: MatSnackBar,
    private router:Router,
    private fb: FormBuilder,
    private actRoute:ActivatedRoute
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
          this.patientsService.getInprogressPatients()
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
    window.localStorage.removeItem('patient_id_rad_tasted')
    window.localStorage.setItem('patient_id_rad_tasted',row.patient_ID);
    window.localStorage.removeItem('patient_vid_rad_tasted')
    window.localStorage.setItem('patient_vid_rad_tasted',row.v);
    this.router.navigateByUrl('/radiology/test-result')
  }

  onSubmit(id: any) {
    this.refresh();
    console.log('Form Value', {"status":"open"});
    console.log(id);
    const rooturl=apiUrl+'/Patient/assign';
    this.httpClient.put(rooturl+'/'+id,{"status":"open"}).subscribe(data=>{
      console.log(data);
      this.showNotification(
        'snackbar-danger',
        'Updating Recorded Successfully...!!!',
        'bottom',
        'center')
     });
     this.refresh();
     
  }

  

  updatepatient(rowid: any) {
  
  console.log(rowid);
    this.router.navigate(['/reception/patients/edit-patient',rowid]).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
     });
  }
  deleteItem(rowid: any) {
    const rooturl=apiUrl+'/Patient';
     this.httpClient.delete(rooturl+'/'+rowid).subscribe(data=>{
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
    this.exampleDatabase = new PatientsRadService(this.httpClient);
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
    public _exampleDatabase: PatientsRadService,
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
    this._exampleDatabase.getInprogressPatientsRadTest();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((patient: Patient) => {
            const searchStr = (
              patient.patient_ID +
              patient.name +
              patient.first +
              patient.gender +
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
      let propertyB: number | Date |string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.patient_ID, b.patient_ID];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'sortDate':
          [propertyA,propertyB] =[a.sortDate,b.sortDate];
          break;
        case 'gender':
          [propertyA, propertyB] = [a.gender, b.gender];
          break;
        case 'date':
          [propertyA, propertyB] = [a.date, b.date];
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
