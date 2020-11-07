export class PrescriptionModel {
  public PrescriptionId: number;
  public PatientId: number;
  public ProviderId: number;
  public VisitId: number;
  public PrescribedDate: string;
  public FilledDate: string;
  public ExpiredDate: string;
  public IsRepeat: boolean;
  public OriginalPrescriptionId: number;
  public Type: number;
  public Status: number;
  public CreatedOn: string;
  public CreatedBy: number;
  public UpdatedOn: string;
  public UpdatedBy: number;
  public DoseValue: string;
  public DoseUnit: string;
  public FrequencyValue: string;
  public FrequencyUnit: string;
  public StartDate: string;
  public EndDate: string
  public Instruction: string;
  public DrugrouteId: number;
  public NameDrugRoute: string;
  public DrugId: number;
  public NameDrug: string;
  public Description: string;
  public ProblemId: number;
  public ProblemName: string;
  public Name: string;
}