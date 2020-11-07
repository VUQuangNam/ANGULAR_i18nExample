export class ExamReportModel {
    public ProblemName: string;
    public VisitExam: [VisitExamModel];
}

export class VisitExamModel {
    public ExamsectionId: number;
    public VisitExamId: number;
    public ReportId: number;
    public ProblemName: string;
    public Name: string;
    public ResultValue: string;
    public Desctiption: string;
    public VisitExamResults: [VisitExamResultsModel];
    public SubExams: [VisitExamModel];
}

export class VisitExamResultsModel {
    public ExamsectionResultId: number;
    public ExamsectionId: number;
    public VisitExamResultId: number;
    public ReportId: number;
    public ProblemName: string;
    public LeftRight: number;
    public ResultValue: string;
    public Description: string;
    public LOINCCode: string;
    public SNOMEDTerm: string;
    public SNOMEDCode: string;
    public SNOMEDDescription: string;
    public Type: number;
    public Status: number;
    public CreatedOn: string;
    public CreatedBy: string;
    public UpdatedBy: string;
    public UpdatedOn: string;
}

