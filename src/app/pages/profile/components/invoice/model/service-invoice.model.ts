export class ServiceInvoiceModel  {
    public ServiceChargeId: number;
    public ServicepriceId: number;
    public Description: string;
    public SKU: string;
    public Quantity: number;
    public Discount: number;
    public Type: number;
    public Status: number;
    // public Nullable<System.DateTime> CreatedOn
    public CreatedBy:number;
    // public Nullable<System.DateTime> UpdatedOn
    public UpdatedBy: number;
    public InvoiceId: number;
    public Cost: number;
    public Price: number;
    public CurrencyCode: string;
}