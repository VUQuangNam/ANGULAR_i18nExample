import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";

import { CreateAllegryComponent } from "./create-allegry/create-allegry.component";
import { EditAllegryComponent } from "./edit-allegry/edit-allegry.component";
import { AllergyService } from "../service";

@Component({
  selector: "app-allegry",
  templateUrl: "./allegry.component.html",
  styleUrls: ["./allegry.component.scss"],
})
export class AllegryComponent implements OnInit {
  displayedColumns: string[] = ["Allegry for", "Since", "Symtoms", "Frequency"];

  @ViewChild("namesDropDown") private namesDdl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private allergyService: AllergyService,
    public dialog: MatDialog
  ) {}
  dataSource: any;
  isShow: boolean = false;
  patientId: number;
  allergyPatientList: any;
  allergyList: any;
  symptomsList: any;
  dose: string;
  allergyId: 1;
  endDate: string;
  route: string;
  type: number;
  detail: string;
  purpose: string;
  status: number;
  duration: string;
  currentAllergy: any;
  name: string;
  showButton: boolean = false;
  allergyName: string;
  symptomName: string;
  frequency: string;
  startDate: number;
  paginator: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (param) => (this.patientId = +param.get("patientId"))
    );
    this.getAllegryPatient();
  }

  openDialog() {
    this.dialog
      .open(CreateAllegryComponent, {
        panelClass: "addAllegry-1",
        data: this.patientId,
      })
      .afterClosed()
      .subscribe((result) => {
        this.ngOnInit();
      });
  }

  openEditDialog() {
    this.dialog
      .open(EditAllegryComponent, {
        panelClass: "addAllegry",
        data: this.patientId,
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  getAllegryPatient() {
    this.allergyService.getAllegryPatient(this.patientId).subscribe((res) => {
      this.allergyPatientList = res;
      this.dataSource = new MatTableDataSource(this.allergyPatientList);
      this.dataSource.paginator = this.paginator;
    });
  }

  createAllegryPatient() {
    this.dialog
      .open(CreateAllegryComponent, {
        panelClass: "createVistal",
        data: this.patientId,
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllegryPatient();
      });
  }

  updateAllegryPatient() {
    this.dialog
      .open(EditAllegryComponent)
      .afterClosed()
      .subscribe(() => {
        this.getAllegryPatient();
      });
  }
}
