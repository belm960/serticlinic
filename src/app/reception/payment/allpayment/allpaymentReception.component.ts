import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentReceptionService } from './paymentReceptionservice';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Payment } from './payment.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormReceptionDialogComponent } from './dialog/form-dialog/formReception-dialog.component';
import { DeleteReceptionDialogComponent }from './dialog/delete/deleteReception.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { FormInvoiceDialogComponent } from './dialog/invoice/forminvoice-dialog.component';

@Component({
  selector: 'app-allpaymentReception',
  templateUrl: './allpaymentReception.component.html',
  styleUrls: ['./allpaymentReception.component.sass'],
})
export class AllpaymentReceptionComponent implements OnInit {
  displayedColumns = [
    'select',
    'id',
    'pName',
    'title',
    'charges',
    'date',
    'status',
    'actions',
  ];
  exampleDatabase: PaymentReceptionService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Payment>(true, []);
  index: number;
  id: number;
  payment: Payment | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public paymentReceptionService: PaymentReceptionService,
    private snackBar: MatSnackBar
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
    const dialogRef = this.dialog.open(FormReceptionDialogComponent, {
      data: {
        payment: this.payment,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.unshift(
          this.paymentReceptionService.getDialogData()
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
    this.id = row.id;
    const dialogRef = this.dialog.open(FormInvoiceDialogComponent, {
      data: {
        payment: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.payment_id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.paymentReceptionService.getDialogData();
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
  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteReceptionDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe(
      _=>this.refresh()
    );
    this.refreshTable();
    this.refresh();

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
    var total=0;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      total+=item.cost;
    }); 
    Swal.fire({
      title: 'Sure?',
      text: "Total Amount IS: "+ total+" Birr",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, transfer it!'
    }).then(result => {
      if (result.value) {
        this.selection.selected.forEach((item) => {
          const index: number = this.dataSource.renderedData.findIndex(
            (d) => d === item
          );
          this.exampleDatabase.pay(item.payment_id);

          // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
          this.exampleDatabase.dataChange.value.splice(index, 1);
          this.refreshTable();
          this.selection = new SelectionModel<Payment>(true, []);
        });
        Swal.fire('Successfull!');
        this.refreshTable();
      }});
  }
  public loadData() {
    this.exampleDatabase = new PaymentReceptionService(this.httpClient);
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
export class ExampleDataSource extends DataSource<Payment> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Payment[] = [];
  renderedData: Payment[] = [];
  constructor(
    public _exampleDatabase: PaymentReceptionService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Payment[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllPayments();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((payment: Payment) => {
            const searchStr = (
              payment.first +
              payment.last+
              payment.cost +
              payment.date +
              payment.title +
              payment.status 
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
  sortData(data: Payment[]): Payment[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.payment_id, b.payment_id];
          break;
        case 'pName':
          [propertyA, propertyB] = [a.first, b.last];
          [propertyA, propertyB] = [a.last,b.last];
          break;
        case 'charges':
          [propertyA, propertyB] = [a.cost, b.cost];
          break;
        case 'date':
          [propertyA, propertyB] = [a.date, b.date];
          break;
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
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
