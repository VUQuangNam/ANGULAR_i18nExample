import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-personal-profile',
    templateUrl: './personal-profile.component.html',
    styleUrls: ['./personal-profile.component.scss']
})

export class PersonalProfileComponent implements OnInit {
    @Input() selectedIndex: number | null
    constructor(
        private activatedRoute: ActivatedRoute,
    ) { }
    patientId: string;

    ngOnInit(): void { }

    ngAfterViewInit() {
        setTimeout(() => this.checkActiveTab());
    }

    checkActiveTab() {
        this.activatedRoute.queryParamMap.subscribe(params => {
            this.selectedIndex = +params.get('tab');
        });
    }
}
