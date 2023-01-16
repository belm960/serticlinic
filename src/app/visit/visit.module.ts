import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitComponent } from './visit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { VisitRoutingModule } from './visit-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaskModule } from 'ngx-mask';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PerfectScrollbarModule,
    VisitRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatToolbarModule,
    DragDropModule,
    MaterialFileInputModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatListModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatStepperModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaskModule,
    ColorPickerModule,
    MatBadgeModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    NgbModule,
    MatProgressButtonsModule,
  ],
  declarations: [VisitComponent],
})
export class VisitModule {}
