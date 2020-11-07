import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { AlertService } from "../../../../shared/services/alert.service";
import { ProblemModel } from '../../models/problem.model';
import { ProblemService } from '../../services/problem.service';
import { Location} from "@angular/common";
@Component({
  selector: 'app-reason-for-booking',
  templateUrl: './reason-for-booking.component.html',
  styleUrls: ['./reason-for-booking.component.scss']
})
export class ReasonForBookingComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    public patientService: PatientService,
    private alertService: AlertService,
    public problemService: ProblemService,
    public location: Location
  ) { }
  patientId: number;
  patientList: any;
  problemList: any;
  problemNewList: any = [];
  name: string;
  patient: any;
  mediaURL: any;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  notePatient: string;
  isNew: boolean=true;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
    console.log("this.patientId", this.patientId);
    this.getPatient();
  }
  back(){
    this.location.back();
  }

  clear(name){
    let index = this.problemNewList.findIndex(i => i == name);
    this.problemNewList.splice(index,1);
  }

  createNewProblem() {
    this.isNew=!this.isNew;
  }
  saveAll(){
    console.log("problemNewListAll", this.problemNewList);
    this.problemNewList.forEach(element => {
      console.log("element",element);
      this.problemService.addNewProblem(element).subscribe(res=>{
        this.alertService.changeMessage({
          color: 'green',
          text: `Tạo thành công!`
        });
      })
    });
    let data={
      "Notes": this.notePatient,
      "PatientId": this.patientId
    }
    this.problemService.postSchedule(data).subscribe(res=>{
      
    })
  }
  saveNewProblem() {
    this.isNew=!this.isNew;
    let data = new ProblemModel();
    data.Name = this.name;
    data.Description = this.notePatient;
    data.SNOMEDCode = '';
    data.LanguageId = 1;
    data.Type = 1;
    data.Status = 1;
    data.PatientId = this.patientId;
    this.problemNewList.push(data);
    console.log("problemNewList", this.problemNewList);
  }


  getPatient() {
    this.patientService.list().subscribe(data => {
      this.patientList = data;
      this.patientId = this.patientList[this.patientList.length - 1].PatientId;

      console.log("this.patient", this.patientId);
      this.getPatientByPatientId();
      this.getProblemPatient();
    })
  }

  getPatientByPatientId() {
    this.patientService.getPatientByPatientId(this.patientId).subscribe(data => {
      this.patient = data[0];
      console.log("this.patient=data", this.patient);
      this.lastName = this.patient.LastName;
      this.phone = this.patient.Phone;
      this.email = this.patient.Email;
      this.address = this.patient.Address;
      this.mediaURL = this.patient.MediaURL;
      this.date = this.patient.DOB;
    })
  }

  getProblemPatient() {
    this.problemService.getProblemByPatientId(this.patientId).subscribe(data => {
      this.problemList = data;
      console.log("this.problemList", this.problemList);

    })
  }

  updateProblem(type: number, patientProblemId: number) {
    let data = new ProblemModel();
    data.Type = type;
    this.problemService.updateProblem(patientProblemId, data).subscribe(res => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Sửa thành công`
      });
      this.getPatient();
    })
  }
}
