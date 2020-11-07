import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/components/account.component';

// import component
import { AllegryComponent } from './components/allegry/component/allegry.component';
import { DiagnosisComponent } from './components/diagnosis/components/diagnosis.component';
import { ExamComponent } from './components/exam/component/exam.component';
import { HistoryComponent } from './components/history/history.component';
import { InvoiceComponent } from './components/invoice/components/invoice.component';
import { MedicalBillComponent } from './components/invoice/components/medical-bill/medical-bill.component';
import { PrintComponent } from './components/invoice/components/print/print.component';
import { VerifyComponent } from './components/invoice/components/verify/verify.component';
import { MedicationComponent } from './components/medication/components/medication.component';
import { MessagesComponent } from './components/messages/component/messages.component';
import { PersonalProfileComponent } from './components/personal-profile/components/personal-profile.component';
import { PlanComponent } from './components/plan/components/plan.component';
import { ProblemListComponent } from './components/problem-list/component/problem-list.component';
import { ReportComponent } from './components/report/component/report.component';
import { TestsComponent } from './components/tests/components/tests.component';
import { VitalsComponent } from './components/vitals/component/vitals.component';

const routes: Routes = [
    {
        path: 'detail/:patientId/invoice/verify',
        component: VerifyComponent
    },
    {
        path: 'detail/:patientId/exam',
        component: ExamComponent
    },
    {
        path: 'detail/:patientId/invoice',
        component: InvoiceComponent
    },
    {
        path: 'detail/:patientId/report',
        component: ReportComponent
    },
    {
        path: 'detail/:patientId/plan',
        component: PlanComponent
    },
    {
        path: 'detail/:patientId/allegry',
        component: AllegryComponent
    },
    {
        path: 'detail/:patientId/test',
        component: TestsComponent
    },
    {
        path: 'detail/:patientId/diagnosis',
        component: DiagnosisComponent
    },
    {
        path: 'detail/:patientId/message',
        component: MessagesComponent
    },
    {
        path: 'detail/:patientId/vital',
        component: VitalsComponent
    },
    {
        path: 'detail/:patientId/problem-list',
        component: ProblemListComponent
    },
    {
        path: 'detail/:patientId/medication',
        component: MedicationComponent
    },
    {
        path: 'detail/:patientId/account',
        component: AccountComponent
    },
    {
        path: 'invoice/:patientId/medical-bill',
        component: MedicalBillComponent
    },
    {
        path: 'invoice/:patientId/medical-bill/print',
        component: PrintComponent
    },
    {
        path: 'detail/:patientId/profile-info',
        component: PersonalProfileComponent,
    },
    {
        path: 'detail/:patientId/history',
        component: HistoryComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
