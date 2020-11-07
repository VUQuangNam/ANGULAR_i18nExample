export class ListofvisitsModel {

   public  VisitId :number;
   public  PatientId: number;
   public  StartDate: string;
//Lịch gặp dùng trường startdate, bỏ enddate
   public  LocationId: number;
   public  ScheduleId: number; 
   public  Type: number; 
   public  Status: number; 
   public  CreatedOn: string; 
   public  CreatedBy: number;
   public  UpdatedOn: string; 
   public  UpdatedBy: string; 
   public  MediaURL: string;
   public  VisitMediaId: number;

}