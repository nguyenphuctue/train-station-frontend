import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { TrainStationService } from 'src/app/services/train-station.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  id?: string;
  report: any = {};
  form!: FormGroup;


  trainStations = [
    { label: 'None', value: 0 },
  ];

  states = [
    { label: 'Very good', value: 'Very good' },
    { label: 'Good', value: 'Good' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'Bad', value: 'Bad' },
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private reportService: ReportService,
    private trainStationService: TrainStationService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      trainStation: ['', [Validators.required]],
      state: ['', [Validators.required]],
      passenger: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.trainStationService.getAllNameStaitons().subscribe(res => {
      for (let station of res.data) {
        const s = { label: station.nameStation, value: station.id };
        this.trainStations.push(s);
      }
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.reportService.getReportById(this.id!).subscribe(res => {
      this.report = res.data;
      if (Object.keys(this.report).length !== 0) {
        this.form.get('title')?.setValue(this.report.title);
        this.form.get('trainStation')?.setValue(this.report.trainStationResponse.id);
        this.form.get('state')?.setValue(this.report.state);
        this.form.get('passenger')?.setValue(this.report.passenger);
        this.form.get('description')?.setValue(this.report.description);
      }
    });
  }

  submitForm(): void {
    if (this.form?.valid) {
      const body = Object.assign(
        { ...this.form.getRawValue() },
      )
      this.reportService.editReport(this.id!, body).subscribe(res => {
        if (res.success === true) {
          this.router.navigate(['/report/list']);
          this.message.create("success", `Successfully updated report.`);
        } else {
          this.message.create("error", `Updating report failed.`);
        }
      },
        (error) => {
          this.message.create("error", `Updating report failed.`);
        }
      )
    } else {
      this.message.create("error", `Information is not valid.`);
    }
  }
}
