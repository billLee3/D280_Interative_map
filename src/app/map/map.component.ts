import { Component, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  

  //Gathered from StackOverflow at the following link: https://stackoverflow.com/questions/41609937/how-to-bind-event-listener-for-rendered-elements-in-angular-2
  constructor(private elementRef:ElementRef) { }

  ngAfterViewInit(){
    //Traversing down the tree to get to all of the paths. 
    const image = this.elementRef.nativeElement.querySelector('svg');
    const paths = image.querySelectorAll('path');
    //Looping through each path to ensure that the click listener is applied. 
    paths.forEach((element: SVGPathElement) => {
      element.addEventListener('click', this.onClick.bind(this))
    });
    
  }
    
  onClick(event: MouseEvent){
    const selectedCountry = event.target as SVGPathElement;
    const countriesSelected = this.elementRef.nativeElement.querySelectorAll(".selected-path");
    countriesSelected.forEach((element: SVGPathElement) => {
      element.classList.remove("selected-path");
    })
    selectedCountry.classList.add("selected-path");
    }
    
  }

  

  
  // Send the ISO code to the API call
  // Transmit the API information into the right column



