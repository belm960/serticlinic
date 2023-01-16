import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientsService } from './patients.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from './patient.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';

import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteComponent } from './dialog/delete/delete.component';
import Swal from 'sweetalert2';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-allpatients',
  templateUrl: './allpatients.component.html',
  styleUrls: ['./allpatients.component.sass'],
})
export class AllpatientsComponent implements OnInit {
  displayedColumns = [
    'select',
    'id',
    'img',
    'first',
    'email',
    'gender',
    'mobile',
    'dob',
    'procedure',
    'patientStatus',
    'actions',
  ];
  exampleDatabase: PatientsService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Patient>(true, []);
  index: number;
  patient: Patient | null;
  patients: Patient = new Patient({})
  patientForm: FormGroup;
  id: any;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientsService: PatientsService,
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
  /*addNew() {
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
          this.patientsService.getAllPatients()
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
  }*/
  addNew(){
    this.router.navigate(['/reception/patients/add-patient'])
    this.showNotification(
      'black',
      'You Can Add New Patient Here!',
      'bottom',
      'center'
    );
  }
  editCall(row) {
    this.id = row.id;
    console.log(this.id);
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.patientsService.getAllPatients();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  onSubmit(id: any) {
    Swal.fire({
      title: 'Transfer to OPD?',
      text: "If you do this it will be transferd to OPD.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, transfer it!'
    }).then(result => {
      if (result.value) {
        Swal.fire('Transferd!', 'the patient is now in the OPD.', 'success');
        const rooturl = apiUrl+'/Patient/assign';
        this.httpClient.put(rooturl+'/'+id,{"status":"opened","sortDate": new Date()}).subscribe(data=>{ 
          console.log(data);
          this.httpClient.post(apiUrl+'/Payment/',
          { "cost": 100,
            "total": 432,
            "title": "Registration",
            "date": new Date(),
            "pid": id,
            "vid": "1",
            "status": "NOT_PAYED"}
        ).subscribe(
          data=> {
            this.refreshTable();
            this.httpClient.put(apiUrl+'/Patient/Payment/'+id,{"pStatus":"PENDING"}).subscribe();
          }
        );
        
      });}
    });
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
  deleteItem(i: number, row) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      
        const rooturl = apiUrl+'/Patient';      
        this.httpClient.delete(rooturl + '/' + row.patient_ID).subscribe(data =>{
          this.loadData();
          this.refreshTable();
       });}
    });
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
    this.exampleDatabase = new PatientsService(this.httpClient);
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
    public _exampleDatabase: PatientsService,
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
    this._exampleDatabase.getAllPatients();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((patient: Patient) => {
            const searchStr = (
              patient.patient_ID+
              patient.first +
              patient.last+
              patient.gender +
              patient.dob +
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
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'patient_ID':
          [propertyA, propertyB] = [a.patient_ID, b.patient_ID];
          break;
        case 'last':
          [propertyA, propertyB] = [a.last, b.last];
          break;
        case 'gender':
          [propertyA, propertyB] = [a.gender, b.gender];
          break;
        case 'dob':
          [propertyA, propertyB] = [a.dob, b.dob];
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
