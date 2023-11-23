import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { TrainStationService } from 'src/app/services/train-station.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
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
  }

  submitForm(): void {
    if (this.form?.valid) {
      const body = Object.assign(
        { ...this.form.getRawValue() },
      )
      this.reportService.addReport(body).subscribe(res => {
        if (res.success === true) {
          this.router.navigate(['/report/list']);
          this.message.create("success", `Successfully created report.`);
        } else {
          this.message.create("error", `Creating report failed.`);
        }
      },
        (error) => {
          this.message.create("error", `Creating report failed.`);
        }
      )
    } else {
      this.message.create("error", `Information is not valid.`);
    }
  }
}
