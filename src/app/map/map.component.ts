import { Component, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { count } from 'rxjs';
import { WorldBankAPIService } from '../worldBank.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  countryName: string = '';
  countryCapital: string = '';
  countryRegion: string = '';
  countryIncomeLevel: string = '';
  countryLatitude: string = '';
  countryLongitude: string = '';
  //Gathered from StackOverflow at the following link: https://stackoverflow.com/questions/41609937/how-to-bind-event-listener-for-rendered-elements-in-angular-2
  //Starting down the route of adding a click event to every path element but determined that there had to be a more effecient solution and found this. 
  constructor(private elementRef:ElementRef, private worldBankApi: WorldBankAPIService) { }

  ngAfterViewInit(){
    //Traversing down the tree to get to all of the paths. 
    const image = this.elementRef.nativeElement.querySelector('svg');
    const paths = image.querySelectorAll('path');
    //Looping through each path to ensure that the click listener is applied. 
    paths.forEach((element: SVGPathElement) => {
      element.addEventListener('click', this.onClick.bind(this))
    });
    
  }
    
  @Output() newCountryNameEvent = new EventEmitter<string>();
  @Output() newCapitalCityEvent = new EventEmitter<string>();
  @Output() newCountryRegionEvent = new EventEmitter<string>();
  @Output() newCountryIncomeLevelEvent = new EventEmitter<string>();
  @Output() newCountryLatEvent = new EventEmitter<string>();
  @Output() newCountryLongEvent = new EventEmitter<string>();



  onClick(event: MouseEvent){
    const selectedCountry = event.target as SVGPathElement;
    
    const countriesSelected = this.elementRef.nativeElement.querySelectorAll(".selected-path");
    countriesSelected.forEach((element: SVGPathElement) => {
        element.classList.remove("selected-path");
      })
    selectedCountry.classList.add("selected-path");
    const isoCode = selectedCountry.id;
    this.worldBankApi.getCountryData(isoCode).subscribe((element: any)=> {
        //JSON module not necessary unlike in vanilla JS https module. 
        this.countryName = (element[1][0].name)
        this.countryCapital = (element[1][0].capitalCity)
        this.countryRegion = (element[1][0].region.value)
        this.countryIncomeLevel = (element[1][0].incomeLevel.value)
        this.countryLatitude = (element[1][0].latitude)
        this.countryLongitude = (element[1][0].longitude)

        //Initial testing code
        // console.log(element[1][0].name)
        // console.log(element[1][0].capitalCity)
        // console.log(element[1][0].region.value)
        // console.log(element[1][0].incomeLevel.value)
        // console.log(element[1][0].latitude)
        // console.log(element[1][0].longitude)
      })
    }
    

    
    
    
  }

  

  
  // Send the ISO code to the API call
  // Transmit the API information into the right column



