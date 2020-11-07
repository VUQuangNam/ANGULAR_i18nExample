import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { ReportService, PatientService } from '../service';
import { EditReportComponent } from "./edit-report/edit-report.component";

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.scss"],
})

export class ReportComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private reportService: ReportService,
        private route: ActivatedRoute,
        private patentService: PatientService
    ) { }

    slides = 0;
    displayedColumns: string[] = [
        "Name",
        "Dose",
        "Frequency",
        "Route",
        "Details",
        "Purpose",
    ];
    model: any = {};
    isLoading = false;
    idPatent;
    dataSource;
    listDrug: any = [];
    visitId: number;

    columnsMedicalReport: string[] = ['Name', 'Dose', 'Frequency', 'Start', 'End', 'Route', 'Details'];
    dataSourceMedicalReport;
    async ngOnInit() {
        try {
            this.isLoading = true;
            this.idPatent = this.route.snapshot.params.patientId;
            let respone = await this.patentService.detailPatient(this.idPatent);
            this.visitId = respone.Payload.VisitId;
            if (!this.visitId) {
                respone = await this.patentService.listVisitPatient(this.idPatent);
                const VisitId = respone.Payload[respone.Payload.length - 1].VisitId;
                respone = await this.reportService.listVisitReport(VisitId);
                const listDrug = await this.reportService.listDrugRoutes();
                this.listDrug = listDrug.Payload;
                this.model = respone.Payload;
                this.model.VisitProblemMedicationHistory = this.onChangeVisitProblemMedicationHistory(this.model.VisitProblemMedicationHistory);
            } else {
                // onLoad Data
                respone = await this.reportService.listVisitReport(this.visitId);
                if (!respone.Payload) return swal.fire({
                    icon: 'warning',
                    title: 'Notification!',
                    text: 'No data!',
                    timer: 1500
                })
                this.model = respone.Payload;
                this.model.VisitProblemExam = this.model.VisitProblemExam.map(x => {
                    return {
                        ProblemName: x.ProblemName,
                        VisitExam: x.VisitExam,
                        listExam: this.onChangeValue(x)
                    }
                })
                this.onLoadMedication(this.idPatent);
                this.onLoadFamilyHistory(this.idPatent);
                this.onLoadSocialHistory(this.idPatent);
                this.onLoadAllergy(this.idPatent);
                this.onLoadMedicationByProblem(this.idPatent);
                this.onLoadReasonForBooking(this.idPatent);
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            this.isLoading = false;
        }
    }

    onLoadMedication = async (idPatent) => {
        const respone = await this.reportService.listMedicationHistory(idPatent);
        this.model.MedicalHistoryModel = respone.Payload.length ? respone.Payload.filter(x => x.Type === 1) : [];
        this.model.SurgicalHistoryModel = respone.Payload.length ? respone.Payload.filter(x => x.Type === 2) : [];
    }

    onLoadFamilyHistory = async (idPatent) => {
        const respone = await this.reportService.listFamilyHistory(idPatent);
        this.model.FamilyHistoryModel = respone.Payload || [];
    }

    onLoadSocialHistory = async (idPatent) => {
        const respone = await this.reportService.listSocialHistory(idPatent);
        this.model.SocialHistoryModel = respone.Payload ? respone.Payload.filter(x => x.Name) : [];
    }

    onLoadAllergy = async (idPatent) => {
        const respone = await this.reportService.listPatientAllergy(idPatent);
        this.model.AllergyModel = respone.Payload || [];
    }

    onLoadMedicationByProblem = async (idPatent) => {
        const respone = await this.reportService.listMedicationByProblem(idPatent);
        this.model.MedicationByProblemModel = respone.Payload || [];
    }

    onLoadReasonForBooking = async (idPatent) => {
        const respone = await this.reportService.listProblemOfVisit(this.visitId);
        const respone2 = await this.reportService.listOldProblemVisit(idPatent);
        this.model.ReasonForBookingModel = respone.Payload.concat(respone2.Payload.filter(x => x.Type == 2));
        this.onLoadHistoryReport();
        this.onLoadMedicalReport();
    }

    onLoadHistoryReport = () => {
        this.model.HistoryReport = [];
        this.model.ReasonForBookingModel.forEach(async (x, ix) => {
            const data = await this.reportService.listHistoryReport(this.visitId, x.ProblemId);
            x.Data = data.Payload;
            if (ix === this.model.ReasonForBookingModel.length - 1) {
                this.onLoadHistorySub(this.model.ReasonForBookingModel);
            }
        });
    }

    //medical
    onLoadMedicalReport = async () => {
        this.dataSourceMedicalReport = [];
        this.model.ReasonForBookingModel.forEach(async (x) => {
            const respone = await this.reportService.listMedicalReport(x.VisitId, x.ProblemId);
            this.dataSourceMedicalReport.push({ initial: x.Name, isGroupBy: true });
            this.dataSourceMedicalReport = this.dataSourceMedicalReport.concat(respone.Payload);
        });
    }

    onLoadHistorySub = (data) => {
        this.model.HistoryReport = data.map(x => {
            return {
                Name: x.Name,
                OldSymptoms: x.Data.filter(z => z.SymptomGroupType === 2),
                NewSymptoms: x.Data.filter(z => z.SymptomGroupType === 3),
                ReviewOfSystems: x.Data.filter(z => z.SymptomGroupType === 4),
                DailyLife: x.Data.filter(z => z.SymptomGroupType === 5)
            }
        })
    }

    onChangeValue = (x) => {
        const dataArray = [];
        let text = '';
        const data = x.VisitExam.map(x1 => {
            return {
                Name: x1.Name,
                SubExams: (x1.SubExams && x1.SubExams.length) ? x1.SubExams.map(x2 => {
                    return {
                        Name: x2.Name,
                        SubExams: (x2.SubExams && x2.SubExams.length) ? x2.SubExams.map(x3 => {
                            return {
                                Name: x3.Name,
                                SubExams: x3.SubExams ? x3.SubExams.map(x4 => {
                                    text = '';
                                    return {
                                        Name: x4.Name,
                                        SubExams: x4.SubExams
                                    }
                                }) : x3.VisitExamResults.filter(x5 => x5.GroupNumber !== 0).map(x4 => {
                                    text = x1.Name + ' - ' + x2.Name + ' - ' + x3.Name;
                                    if (x4.LeftRight === 1) {
                                        text = text + ' - Left:' + x4.ResultValue
                                    }
                                    if (x4.LeftRight === 2) {
                                        text = text + ' - Right:' + x4.ResultValue
                                    }
                                    dataArray.push(text);
                                    return {
                                        LeftRight: x4.LeftRight,
                                        ResultValue: x4.ResultValue,
                                        GroupNumber: x4.GroupNumber
                                    }
                                })
                            }
                        }) : x2.VisitExamResults.filter(x5 => x5.GroupNumber !== 0).map(x3 => {
                            text = x1.Name + ' - ' + x2.Name;
                            if (x3.LeftRight === 1) {
                                text = text + ' - Left:' + x3.ResultValue
                            }
                            if (x3.LeftRight === 2) {
                                text = text + ' - Right:' + x3.ResultValue
                            }
                            dataArray.push(text)
                            return {
                                LeftRight: x3.LeftRight,
                                ResultValue: x3.ResultValue,
                                GroupNumber: x3.GroupNumber
                            }
                        })
                    }
                }) : x1.VisitExamResults.filter(x5 => x5.GroupNumber !== 0).map(x2 => {
                    return {
                        Name: x2.Name,
                        SubExams: x2.SubExams
                    }
                })
            }
        });

        return dataArray;
    }

    onChangeVisitProblemMedicationHistory = (data) => {
        const result = data.map(x => {
            const checkName = this.listDrug.find(a => a.DrugrouteId === x.DrugrouteId);
            return {
                DrugName: x.DrugName,
                DoseValue: x.DoseValue,
                FrequencyValue: x.FrequencyValue,
                Purpose: x.Purpose,
                DrugrouteId: x.DrugrouteId,
                StartDate: x.StartDate,
                Detail: x.Detail,
                DrugrouteName: checkName ? checkName.Name : ''
            }
        });

        return result;
    }

    openEditDialog() {
        this.dialog.open(EditReportComponent, {
            width: "900px",
            height: "300px",
            panelClass: "edit",
        }).afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onSwipeLeft(event, data) {
        if (this.slides >= 2) {
            return;
        }
        this.slides = this.slides + 1;
    }

    onSwipeRight(event, data) {
        if (this.slides <= 0) {
            return;
        }
        this.slides = this.slides - 1;
    }

    isGroup(index, item): boolean {
        return item.isGroupBy;
    }
}