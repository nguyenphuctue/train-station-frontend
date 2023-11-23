import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  barChart: any;
  pieChart: any;
  labelPassengerChart = ['Ga Ha Noi', 'Ga Hung Yen', 'Ga Hai Duong', 'Ga Phu Thai', 'Ga Hai Phong'];
  dataPassenger = ['5000', '2000', '3000', '1000', '4000'];
  colorPieChart = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'];

  ngOnInit(): void {
    this.createBarChart();
    // this.createPieChart();
  }

  createBarChart() {
    this.barChart = new Chart("passenger-bar-chart", {
      type: 'bar',
      data: {
        labels: this.labelPassengerChart,
        datasets: [
          {
            label: "Passenger",
            data: this.dataPassenger,
            backgroundColor: '#87CEFA',
            maxBarThickness: 60,
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  // createPieChart() {
  //   this.pieChart = new Chart("passenger-pie-chart", {
  //     type: 'pie',
  //     data: {
  //       labels: this.labelPassengerChart,
  //       datasets: [
  //         {
  //           label: "Passenger",
  //           data: this.dataPassenger,
  //           backgroundColor: this.colorPieChart,
  //         },
  //       ],

  //     },
  //     options: {
  //       responsive: true,
  //     }
  //   });
  // }
}
