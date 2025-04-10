import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { AuthService } from '../../services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LaoderComponent } from '../../laoder/laoder.component';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
  ApexLegend,
  ApexGrid,
  ApexResponsive,
  ApexFill,
  ApexMarkers,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries; // Allow both types
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions; // Optional if not used
  yaxis?: ApexYAxis; // Optional if not used
  tooltip?: ApexTooltip; // Optional if not used
  colors?: string[];
  title: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  legend: ApexLegend; // Optional if not used
};

@Component({
  selector: 'app-main-dashboard',
  imports: [
    CommonModule,
    LaoderComponent,
    NgxPaginationModule,
    NgApexchartsModule,
    NgApexchartsModule,
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss',
})
export class MainDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart!: ChartComponent;
  // public chartOptions: Partial<ChartOptions> = {};
  public chartOptions: Partial<ChartOptions> | undefined;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService
  ) {}
  ngAfterViewInit(): void {}
  isloader: boolean = false;
  loggedInUser: any;
  taskArray: any[] = [];

  ngOnInit(): void {
    this.loggedInUser = this.AuthService.getUserInfo().user;

    this.getAllTasks();
  }

  initializeChart(data: any) {
    this.chartOptions = {
      series: [
        {
          // name: data.taskCounts.map((item: any) => item.type),
          data: data.taskCounts.map((item: any) => item.count),
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      colors: ['#f3f3f3', 'transparent'],
      xaxis: {
        categories: data.taskCounts.map((item: any) => item.type),
        labels: {
          style: {
            colors: 'white', // 👈 X-axis label color change
            fontSize: '14px', // Optional: Label size adjust
            fontWeight: 'bold', // Optional: Bold labels
          },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
        floating: true,
        // align: 'center',
      },
    };
  }

  p: number = 1;
  total: number = 0;
  searchTasked: any[] = [];
  colors: any = ['bg-blue-800', 'bg-green-800', 'bg-red-800', 'bg-yellow-800'];
  countStatus: any;
  analytics: any;
  getAllTasks() {
    this.isloader = true;
    const id = this.loggedInUser._id;
    const itemsPerPage = 5;
    const url = `fetch_all_tasks/${id}?page=${this.p}&limit=${itemsPerPage}`;

    this.api.get(url).subscribe({
      next: (resp) => {
        this.isloader = false;

        if (resp.success) {
          this.taskArray = resp.data;
          this.countStatus = resp;

          this.searchTasked = [...this.taskArray];
          this.total = resp.totalElements;
          console.log('total', this.total);

          if (this.taskArray.length === 0 && this.p > 1) {
            this.p--;
            this.getAllTasks();
          }
          this.initializeChart(resp);
        } else {
        }
      },
      error: (error) => {
        this.isloader = false;
      },
    });
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllTasks();
  }
  progressPercentage: any = 10;

  viewTask(task: any) {
    this.router.navigate(['/dashboard/tasks/view-task', task._id]);
  }

  searchTerm: any = '';
  filteredTasks: any[] = [];
  taskSearch(event: any) {
    this.searchTerm = event.target.value.trim().toLowerCase();

    if (!this.searchTerm) {
      this.searchTasked = [...this.taskArray];
      return;
    }

    this.searchTask(this.searchTerm);
  }
  searchTask(searchTerm: any) {
    const url = `search_task/${searchTerm}`;
    this.api.get(url).subscribe({
      next: (resp) => {
        if (resp.success && resp.data.length > 0) {
          this.searchTasked = [...resp.data];
          this.total = resp.totalTasks;
          console.log(this.total, 'Total tasks');
        } else {
          this.searchTasked = [];
        }
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }
}
