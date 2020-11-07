export class DiagnosesReportModel {
    public ProblemName: string;
    public VisitDiagnoses: [DiagnosesModel];
}

export class DiagnosesModel {
    public ProblemName: string;
    public VisitDiagnoses: DiagnosesModel;
}
