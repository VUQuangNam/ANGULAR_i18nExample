import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { GridModule } from "@progress/kendo-angular-grid";
import { ChartsModule } from "@progress/kendo-angular-charts";
import "hammerjs";
//

import { VerifyComponent } from "./components/invoice/components/verify/verify.component";
import { CreateInvoiceComponent } from "./components/invoice/components/create-invoice/create-invoice.component";
import { MedicalBillComponent } from "./components/invoice/components/medical-bill/medical-bill.component";
import { BillsComponent } from "./components/account/components/bills/bills.component";
import { ContractsComponent } from "./components/account/components/contracts/contracts.component";
import { InvoicesComponent } from "./components/account/components/invoices/invoices.component";
import { HistoryComponent } from "./components/history/history.component";
import { CreateListOfChargeComponent } from "./components/invoice/components/create-list-of-charge/create-list-of-charge.component";
import { EditListOfChargeComponent } from "./components/invoice/components/edit-list-of-charge/edit-list-of-charge.component";
import { PrintComponent } from "./components/invoice/components/print/print.component";
import { DemographicsComponent } from "./components/personal-profile/components/demographics/demographics.component";
import { EditDemographicsComponent } from "./components/personal-profile/components/demographics/dialog/edit-demographics/edit-demographics.component";
import { CreateImmunizationComponent } from "./components/personal-profile/components/immunization/dialog/create-immunization/create-immunization.component";
import { DetailImmunizationComponent } from "./components/personal-profile/components/immunization/dialog/detail-immunization/detail-immunization.component";
import { EditImmunizationComponent } from "./components/personal-profile/components/immunization/dialog/edit-immunization/edit-immunization.component";
import { ImmunizationComponent } from "./components/personal-profile/components/immunization/immunization.component";
import { ListOfVisitsComponent } from "./components/personal-profile/components/list-of-visits/list-of-visits.component";
import { CreateMedicalHistoryComponent } from "./components/personal-profile/components/medical-history/dialog/create-medical-history/create-medical-history.component";
import { DetailMedicalHistoryComponent } from "./components/personal-profile/components/medical-history/dialog/detail-medical-history/detail-medical-history.component";
import { EditMedicalHistoryComponent } from "./components/personal-profile/components/medical-history/dialog/edit-medical-history/edit-medical-history.component";
import { MedicalHistoryComponent } from "./components/personal-profile/components/medical-history/medical-history.component";
import { PersonalProfileComponent } from "./components/personal-profile/components/personal-profile.component";
import { SocialHistoryComponent } from "./components/personal-profile/components/social-history/social-history.component";
import { ReportComponent } from "./components/report/component/report.component";
import { BiopsyComponent } from "./components/tests/components/biopsy/biopsy.component";
import { ViewTestComponent } from "./components/tests/components/biopsy/view-test/view-test.component";
import { FunctionalTestsComponent } from "./components/tests/components/functional-tests/functional-tests.component";
import { ImagingComponent } from "./components/tests/components/imaging/imaging.component";
import { LabComponent } from "./components/tests/components/lab/lab.component";
import { CreateVitalComponent } from "./components/vitals/component/create-vital/create-vital.component";
import { UpdateVitalComponent } from "./components/vitals/component/update-vital/update-vital.component";
import { VitalsComponent } from "./components/vitals/component/vitals.component";
import { TestsComponent } from "./components/tests/components/tests.component";
import { AllegryComponent } from "./components/allegry/component/allegry.component";
import { CreateAllegryComponent } from "./components/allegry/component/create-allegry/create-allegry.component";
import { EditAllegryComponent } from "./components/allegry/component/edit-allegry/edit-allegry.component";
import { DetailsAllergyComponent } from "./components/allegry/component/details-allergy/details-allergy.component";
import { DiagnosisComponent } from "./components/diagnosis/components/diagnosis.component";
import { DiagnosisDetailComponent } from "./components/diagnosis/components/detail/detail.component";
import { DetailExamComponent } from "./components/exam/component/detail-exam/detail-exam.component";
import { ExamComponent } from "./components/exam/component/exam.component";
import { HistoryDetailComponent } from "./components/history/history-detail/history-detail.component";
import { SelectExamComponent } from "./components/exam/component/detail-exam/select-exam/select-exam.component";

import { CreateNewSymptomsComponent } from './components/history/history-detail/dialog/create-new-symptoms/create-new-symptoms.component';
import { UpdateMedicationComponent } from './components/medication/components/update-medication/update-medication.component';
import { ProblemsMedicationComponent } from './components/medication/components/list-medication/problems-medication/problems-medication.component';
import { CurrentMedicationComponent } from './components/medication/components/list-medication/current-medication/current-medication.component';
import { CreateMedicationComponent } from './components/medication/components/create-medication/create-medication.component';
import { EditMedicationComponent } from './components/medication/components/edit-medication/edit-medication.component';
import { MedicationHistoryComponent } from './components/medication/components/list-medication/history-medication/medication-history.component';
import { PlanComponent } from './components/plan/components/plan.component';
import { PlanHighBloodPressureComponent } from './components/plan/components/detail/plan-high-blood-pressure.component';
import { OrderTestsComponent } from './components/plan/components/detail/order-tests/order-tests.component';
import { HealthEducationComponent } from './components/plan/components/detail/health-education/health-education.component';
import { PrescriptionComponent } from './components/plan/components/detail/prescription/prescription.component';
import { FollowUpComponent } from './components/plan/components/detail/follow-up/follow-up.component';
import { EditHistoryComponent } from './components/history/history-detail/dialog/edit-history/edit-history.component';
import { CreatePresciptionComponent } from './components/plan/components/detail/prescription/create-presciption/create-presciption.component';
import { InvoiceComponent } from './components/invoice/components/invoice.component';
import { MedicationComponent } from './components/medication/components/medication.component';
import { DetailFamilyComponent } from './components/personal-profile/components/family-history/component/dialog/detail-family/detail-family.component';
import { FamilyHistoryComponent } from './components/personal-profile/components/family-history/component/family-history.component';
import { CreateFamilyHistoryComponent } from './components/personal-profile/components/family-history/component/dialog/create-family-history/create-family-history/create-family-history.component';
import { EditFamilyHistoryComponent } from './components/personal-profile/components/family-history/component/dialog/edit-family-history/edit-family-history.component';
import { ProblemListComponent } from './components/problem-list/component/problem-list.component';
import { MessagesComponent } from './components/messages/component/messages.component';
import { EditPrescriptionComponent } from './components/plan/components/detail/prescription/edit-prescription/edit-prescription.component';
import { DetailsPrescriptionComponent } from './components/plan/components/detail/prescription/details-prescription/details-prescription.component';
import { AccountComponent } from './components/account/components/account.component';

@NgModule({
    declarations: [
        TestsComponent,
        InvoiceComponent,
        VerifyComponent,
        CreateInvoiceComponent,
        MedicalBillComponent,
        PrintComponent,
        PersonalProfileComponent,
        DemographicsComponent,
        ListOfVisitsComponent,
        MedicationComponent,
        CurrentMedicationComponent,
        MedicationHistoryComponent,
        ProblemListComponent,
        AccountComponent,
        LabComponent,
        BiopsyComponent,
        FunctionalTestsComponent,
        ImagingComponent,
        InvoicesComponent,
        ContractsComponent,
        BillsComponent,
        SocialHistoryComponent,
        MedicalHistoryComponent,
        FamilyHistoryComponent,
        ImmunizationComponent,
        AllegryComponent,
        MessagesComponent,
        DiagnosisComponent,
        ExamComponent,
        ReportComponent,
        SocialHistoryComponent,
        HistoryComponent,
        CreateImmunizationComponent,
        SocialHistoryComponent,
        HistoryComponent,
        PlanComponent,
        PlanHighBloodPressureComponent,
        OrderTestsComponent,
        HealthEducationComponent,
        PrescriptionComponent,
        FollowUpComponent,
        DiagnosisDetailComponent,
        DetailExamComponent,
        ViewTestComponent,
        CreateFamilyHistoryComponent,
        CreateAllegryComponent,
        CreateMedicalHistoryComponent,
        EditMedicalHistoryComponent,
        EditFamilyHistoryComponent,
        EditAllegryComponent,
        CreateMedicationComponent,
        EditMedicationComponent,
        CreateListOfChargeComponent,
        EditListOfChargeComponent,
        VitalsComponent,
        CreateVitalComponent,
        UpdateVitalComponent,
        DetailMedicalHistoryComponent,
        EditImmunizationComponent,
        DetailImmunizationComponent,
        EditDemographicsComponent,
        DetailFamilyComponent,
        DetailsAllergyComponent,
        HistoryDetailComponent,
        SelectExamComponent,

        CreateNewSymptomsComponent,
        ProblemsMedicationComponent,
        UpdateMedicationComponent,
        EditHistoryComponent,
        CreatePresciptionComponent,
        EditPrescriptionComponent,
        DetailsPrescriptionComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        MatTableModule,
        NgbModule,
        ButtonsModule,
        GridModule,
        MatSelectModule,
        ChartsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProfileModule { }
