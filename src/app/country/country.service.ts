import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface CountryData {
  name: string;
  region: string;
  flag: string;
  capital: string;
  population: number;
  latlng: number[];
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountryList() {
    return this.http.get<CountryData[]>(
      'https://restcountries.eu/rest/v2/all?fields=name;region;flag;capital;population;latlng;'
    );
  }
}
