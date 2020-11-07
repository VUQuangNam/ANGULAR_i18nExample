import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { SocialHistoryModel } from '../../model';
import { SocialHistoryService } from '../../service';

@Component({
    selector: 'app-social-history',
    templateUrl: './social-history.component.html',
    styleUrls: ['./social-history.component.scss']
})
export class SocialHistoryComponent implements OnInit {
    isShow = true
    Smoking: any;
    Alcohol: any;
    Excercise: any;
    patientId: any;
    socialHistory: any;
    frequencyValueAlcohol: any;
    frequencyValueExcercise: any;
    frequencyUnitExcercise: any;
    frequencyUnitAlcohol: any;
    selectedExcerciseDate: any = '1';
    selectedAlcohol: any = '1';
    selectedExcercise: any = '1';
    selectedAlcoholDate: any = '1';
    selectedForAncohol: any = '1';
    selectedForExcercise: any = '1';
    yearForNumber: any;
    year: any;
    dateForAlcohol: any;
    dateForExcercise: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        public socialHistoryService: SocialHistoryService,
        private alertService: AlertService,

    ) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.getSocialHistory();
    }

    getSocialHistory() {
        this.socialHistoryService.getSocialHistoryByPatientId(this.patientId).subscribe(data => {
            this.socialHistory = data;
            this.Smoking = this.socialHistory.filter(res => res.Name == "Smoking");
            this.Alcohol = this.socialHistory.filter(res => res.Name == "Alcohol");
            this.Excercise = this.socialHistory.filter(res => res.Name == "Excercise");
            this.frequencyValueAlcohol = this.Alcohol ? this.Alcohol[0].FrequencyValue : '';
            this.frequencyValueExcercise = this.Excercise[0] ? this.Excercise[0].FrequencyValue : '';
            this.frequencyUnitExcercise = this.Excercise[0] ? this.Excercise[0].FrequencyUnit : '';
            this.frequencyUnitAlcohol = this.Alcohol[0] ? this.Alcohol[0].FrequencyUnit : '';
            var today = new Date();
            if (this.Alcohol[0].Type == 1) {
                this.dateForAlcohol = today.getFullYear() - parseInt(this.Alcohol[0].StartDate);
            }
            else {
                if (this.Alcohol[0].Type == 3) {
                    this.dateForAlcohol = today.getFullYear() - parseInt(this.Alcohol[0].EndDate);
                }
            }
            if (this.Excercise[0].Type == 1) {
                this.dateForExcercise = today.getFullYear() - parseInt(this.Excercise[0].StartDate);
            }
            else {
                if (this.Excercise[0].Type == 3) {
                    this.dateForExcercise = today.getFullYear() - parseInt(this.Excercise[0].EndDate);
                }
            }
        })
    }
    updateSocialfactor(type: number, PatientSocialfactorId: number) {
        let data = new SocialHistoryModel();
        data.Type = type;
        console.log("type", type);
        this.socialHistoryService.updateSocialHistory(PatientSocialfactorId, data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Cập nhật thành công!`
            });
            this.getSocialHistory();
        })
    }
    chooseDateAlcohol(frequencyValue: number) {
        this.frequencyValueAlcohol = frequencyValue;
        console.log("frequencyValueAlcohol", frequencyValue);
    }
    chooseDateExcercise(frequencyValue: number) {
        this.frequencyValueExcercise = frequencyValue;
        console.log("frequencyValueAlcohol", frequencyValue);
    }
    updateDateAlcohol(PatientSocialfactorId: number) {
        let data = new SocialHistoryModel();
        data.FrequencyValue = this.frequencyValueAlcohol;
        this.socialHistoryService.updateSocialHistory(PatientSocialfactorId, data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Cập nhật thành công!`
            });
            this.getSocialHistory();
        })
    }
    updateDateExcercise(PatientSocialfactorId: number) {
        let data = new SocialHistoryModel();
        data.FrequencyValue = this.frequencyValueExcercise;
        this.socialHistoryService.updateSocialHistory(PatientSocialfactorId, data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Cập nhật thành công!`
            });
            this.getSocialHistory();
        })
    }
    chooseFrequencyUnitExcercise(frequencyUnit: number) {
        this.frequencyUnitExcercise = frequencyUnit;
        console.log("frequencyUnitExcercise", this.frequencyUnitExcercise);

    }
    chooseFrequencyUnitAlcohol(frequencyUnit: number) {
        this.frequencyUnitAlcohol = frequencyUnit;
    }
    updateFrequencyUnit(PatientSocialfactorId: number) {
        let data = new SocialHistoryModel();
        data.FrequencyUnit = this.frequencyUnitExcercise;
        this.socialHistoryService.updateSocialHistory(PatientSocialfactorId, data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Cập nhật thành công!`
            });
            this.getSocialHistory();
        })
    }
    updateFrequencyUnitAlcohol(PatientSocialfactorId: number) {
        let data = new SocialHistoryModel();
        data.FrequencyUnit = this.frequencyUnitAlcohol;
        this.socialHistoryService.updateSocialHistory(PatientSocialfactorId, data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Cập nhật thành công!`
            });
            this.getSocialHistory();
        })
    }

    chooseForAlcohol(yearForNumber: number) {
        this.yearForNumber = yearForNumber;
        // console.log("yearForNumber", this.yearForNumber);
    }

    updateDateForAlcohol(Type: number, PatientSocialfactorId: number) {
        let data = new SocialHistoryModel();
        var today = new Date();
        var startYear = today.getFullYear() - parseInt(this.dateForAlcohol);
        today.setFullYear(startYear);
        console.log("Type", data.Type);
        if (Type == 1) {
            data.StartDate = today.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            }).replace(/ /g, '-');
            console.log("data.StartDate", data.StartDate);
        }
        else {
            if (Type == 3) {
                data.EndDate = today.toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                }).replace(/ /g, '-');
                console.log("data.EndDate", data.EndDate);
            }
        }
        console.log("data.StartDate", today);
        this.socialHistoryService.updateSocialHistory(PatientSocialfactorId, data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Cập nhật thành công!`
            });
            this.getSocialHistory();
        })
        // console.log("this Year",startYear);
    }
    chooseForExcercise(yearForNumber: number) {
        this.yearForNumber = yearForNumber;
    }
    updateDateForExcercise(Type: number, PatientSocialfactorId: number) {
        let data = new SocialHistoryModel();
        var today = new Date();
        var startYear = today.getFullYear() - parseInt(this.dateForExcercise);
        today.setFullYear(startYear);
        if (Type == 1) {
            data.StartDate = today.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            }).replace(/ /g, '-');
            console.log("data.StartDate", data.StartDate);
        }
        else {
            if (Type == 3) {
                data.EndDate = today.toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                }).replace(/ /g, '-');
                console.log("data.EndDate", data.EndDate);
            }
        }

        console.log("Type", Type);

        this.socialHistoryService.updateSocialHistory(PatientSocialfactorId, data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Cập nhật thành công!`
            });
            this.getSocialHistory();
        })
    }
}

