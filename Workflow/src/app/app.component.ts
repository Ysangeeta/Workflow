import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import infoData from '../assets/info.json';
import { INFO } from './info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  workinfo: INFO[] = [];
  usersInfo: INFO[]=[];
  userName: string[] = [];

  //charts code starts
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Total Commits', 'Total Pass','Total Fail', 'Pass Rate', 'Avg Time'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [  ];
  
  ngOnInit(): void {
    this.workinfo = infoData;
    this.workinfo.map(item => {
      if(!this.userName.includes(item.user))
      this.userName.push(item.user);
    })
    //this.userName = this.userName.filter((value, index) => this.userName.indexOf(value) !== index);

    
  }
  title = 'workflow';

  showData(e: any) {
    const userName = e.target.value;
    this.usersInfo = this.workinfo.filter(item => item.user === userName);
    let  totalCommits:number = this.usersInfo.length;
    let totalPass: number = this.usersInfo.filter(item => item.status==='success')?.length;
    let totalFail: number = this.usersInfo.filter(item => item.status==='failed')?.length;
    let passRate :number = (totalPass *100)/totalCommits;
    //let avgTime;
    this.barChartData =[{
      data: [totalCommits,totalPass,totalFail,passRate,16], backgroundColor: [
                'rgb(34,139,34)',
                'rgb(34,139,34)',
                'rgb(255,0,0)',
                'rgb(34,139,34)',
                'rgb(255,0,0)'
            ],
      label: userName
    }]
  }

  
}
