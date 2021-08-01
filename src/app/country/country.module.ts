import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { HighlightTextPipe } from '../shared/HighlightText.pipe';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountryComponent } from './country.component';
import { CountryService } from './country.service';

@NgModule({
  declarations: [CountryComponent, HighlightTextPipe, CountryDetailsComponent],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    HighchartsChartModule,
    RouterModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [CountryComponent],
  providers: [CountryService],
})
export class CountryModule {}
