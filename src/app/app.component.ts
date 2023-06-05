import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  countryName: string = '';
  countryCapital: string = '';
  countryRegion: string = '';
  countryIncomeLevel: string = '';
  countryLatitude: string = '';
  countryLongitude: string = '';

  addCountry(newCountryName: string){
    this.countryName = newCountryName;
  }

}
