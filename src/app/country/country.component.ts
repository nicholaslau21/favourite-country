import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil
} from 'rxjs/operators';
import { Country } from '../models/Country.model';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'region', 'capital', 'flag', 'action'];

  dataSource: MatTableDataSource<Country>;
  private countries: Country[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  searchTerm = '';

  selection = new SelectionModel<string>(
    true,
    JSON.parse(localStorage.getItem('favouriteCountries') || '[]')
  );

  private readonly unsubscribe$: Subject<void> = new Subject();

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'World Population by Country',
    },
    series: [
      {
        type: 'bar',
        name: 'Population',
      },
    ],
    xAxis: {
      type: 'category',
    },
  };

  constructor(private countryService: CountryService) {
    this.dataSource = new MatTableDataSource<Country>();
  }

  ngOnInit(): void {
    this.countryService
      .getCountryList()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((countries) => {
          return countries.map((data) => ({
            id: data.name,
            name: data.name,
            region: data.region,
            flag: data.flag,
            capital: data.capital,
            population: data.population,
            coord: `${data.latlng[0]},${data.latlng[1]}`,
          }));
        })
      )
      .subscribe((countriesData) => {
        this.countries = countriesData;
        this.dataSource.data = countriesData;
        this.renderChart(this.countries, this.selection.selected);
      });

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((event: KeyboardEvent) => {
        this.searchTerm = event.target['value'].toLowerCase();

        this.dataSource.data = this.countries.filter(
          (country) =>
            country.name.toLowerCase().includes(this.searchTerm) ||
            country.capital.toLowerCase().includes(this.searchTerm)
        );
      });

    this.selection.changed.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      localStorage.setItem(
        'favouriteCountries',
        JSON.stringify(this.selection.selected)
      );

      this.renderChart(this.countries, this.selection.selected);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  renderChart(countriesData: Country[], selectedCountries: string[]) {
    const pops = [];

    for (let selectedCountry of selectedCountries) {
      pops.push([
        selectedCountry,
        countriesData.find((c) => c.id === selectedCountry).population,
      ]);
    }

    this.chartOptions = {
      series: [
        {
          data: pops,
          type: 'bar',
        },
      ],
    };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
