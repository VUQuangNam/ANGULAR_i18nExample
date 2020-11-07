import { Component, Input, OnInit } from '@angular/core';

import { PatientImmunizationscheduleService } from '../service';

@Component({
    selector: 'app-tab-row-menu',
    templateUrl: './tab-row-menu.component.html',
    styleUrls: ['./tab-row-menu.component.scss']
})
export class TabRowMenuComponent implements OnInit {
    @Input() patientId;
    constructor(
        private patientService: PatientImmunizationscheduleService,
    ) { }
    currentPatient: any;

    ngOnInit(): void {
        this.getInfoPatient();
    }

    getInfoPatient() {
        this.patientService.getPatientById(this.patientId).subscribe((res) => {
            this.currentPatient = res;
        });
    }



}
