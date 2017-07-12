import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']

})
export class ChartComponent implements OnInit {
    
        public line_ChartData = [
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]];
    public line_ChartOptions = {
        title: 'Company Performance',
        curveType: 'function',
        legend: {
            position: 'bottom'
        }
    };
    itemSelected(event) {
        alert(JSON.stringify(event));
    }

    itemDeselected(event) {
        alert("DESELECTED");
    }


  constructor(private router: Router) { }

  ngOnInit() {
  }
  
    onSubmit(){
              this.router.navigateByUrl('login');                   
               }
   
  }


