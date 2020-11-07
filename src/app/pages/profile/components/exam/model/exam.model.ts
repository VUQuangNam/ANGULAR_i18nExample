
export class ExamModel {
    public VisitId: number;
    public ExamId: number;
    public ProblemId: number;
    public LeftRight: number;
    public ResultId: number;
    public ParentExamId?: number;
    public GroupNumber?: number;
    public Type: number;
    public Status: number;
    constructor(model?: ExamModel) {
        this.ExamId = model.ExamId;
        this.VisitId = model.VisitId;
        this.ProblemId = model.ProblemId;
        this.LeftRight = model.LeftRight;
        this.ResultId = model.ResultId;
        this.ParentExamId = model.ParentExamId;
        this.GroupNumber = model.GroupNumber;
        this.Type = model.Type || 1;
        this.Status = model.Status || 1;
    }
}
