import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment-timezone';

import { CreateVitalComponent } from './create-vital/create-vital.component';
import { UpdateVitalComponent } from './update-vital/update-vital.component';
import { FormDataVital, VisitVitalService } from '../service';
import { ValueAxisLabels } from '@progress/kendo-angular-charts';

@Component({
    selector: 'app-vitals',
    templateUrl: './vitals.component.html',
    styleUrls: ['./vitals.component.scss']
})

export class VitalsComponent implements OnInit {
    isTable = true;
    data: any = {};
    model: any = {
        categories: [],
        series: [
            {
                type: "rangeColumn",
                data: [],
                name: "BP systolic, diastolic",
                color: "#D9D9D9",
                checked: false,
                axis: "value",
                hide: false
            },
            {
                type: "line",
                data: [],
                name: "Respiratory rate",
                color: "#FBB75D",
                checked: false,
                axis: "value",
                VitalId: 4,
                hide: false
            },
            {
                type: "line",
                data: [],
                name: "Pulse",
                color: "#B75A5A",
                checked: false,
                axis: "value",
                VitalId: 3,
                hide: false
            },
            {
                type: "line",
                data: [],
                name: "sPO2",
                color: "#2D71BE",
                checked: false,
                axis: "value",
                VitalId: 5,
                hide: false
            },
            {
                type: "line",
                data: [],
                name: "Temperature",
                color: "#68AE6C",
                checked: false,
                axis: "Temperature",
                VitalId: 7,
                hide: false
            }
        ],
        valueAxes: [
            {
                name: "value",
                min: 0,
                max: 360
            },
            {
                name: "Temperature",
            }
        ]
    }
    isLoading = false;
    modelData: any = {
        Date2: [],
        DataSub: [],
        Data2: []
    }

    patientId: string;
    isSortTable = false;
    isData = false;
    legendVisible = true;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private VitalService: VisitVitalService
    ) { }

    public valueAxisLabels: ValueAxisLabels = {
        font: 'bold 16px Arial, sans-serif'
    };

    ngOnInit() {
        this.onLoadData();
    }

    onLoadData = async () => {
        try {
            this.isLoading = false;
            this.modelData = {
                Date2: [],
                DataSub: [],
                Data2: []
            }
            this.model.seriesSub = this.model.series;
            this.data = FormDataVital;
            this.patientId = this.route.snapshot.params.patientId;
            this.VitalService.listVitalPatient(this.patientId).subscribe(res => {
                const data = res.filter(x => x.ListVital.length);
                data.forEach((x, ix) => {
                    const result = x.ListVital.filter(a => a.VitalId === 1).map(a => {
                        return {
                            VisitVitalId: a.VisitVitalId,
                            ResultDate: a.ResultDate,
                            colspan: x.ListVital.filter(a => a.VitalId === 1).length,
                            convertDate: this.convertDateToUnix(a.ResultDate)
                        }
                    });
                    if (ix === 0) {
                        this.modelData.Time2 = result;
                        this.modelData.Date2.push(result[0]);
                        this.modelData.DataSub = x.ListVital;
                    } else {
                        this.modelData.Time2 = result.concat(this.modelData.Time2);
                        this.modelData.Date2.push(result[0]);
                        this.modelData.DataSub = this.modelData.DataSub.concat(x.ListVital);
                    }
                });
                for (let index = 0; index < 8; index++) {
                    this.modelData.Data2[index] = this.modelData.DataSub.filter(x => x.VitalId === index + 1);
                    this.modelData.Data2[index] = this.modelData.Data2[index].map(x => {
                        return {
                            Name: x.Name,
                            NumericValue: x.NumericValue,
                            ResultDate: x.ResultDate,
                            convertDate: this.convertDateToUnix(x.ResultDate)
                        }
                    });
                    this.modelData.Data2[index] = this.modelData.Data2[index].sort(function (a, b) {
                        return a.convertDate - b.convertDate;
                    });

                }
                this.modelData.Time2 = this.modelData.Time2 ? this.modelData.Time2.sort(function (a, b) {
                    return a.convertDate - b.convertDate;
                }) : [];
                this.modelData.Date2 = this.modelData.Date2 ? this.modelData.Date2.sort(function (a, b) {
                    return a.convertDate - b.convertDate;
                }) : [];

                this.data = this.modelData.Data2.map(d => {
                    return {
                        VitalId: d[0].VitalId,
                        Name: d[0].Name,
                        Value: d.map(f => {
                            return f.NumericValue
                        })
                    }
                });

                this.model.categories = this.modelData.Time2.map(x => {
                    return new Date(x.ResultDate).getUTCDate() + '/'
                        + (new Date(x.ResultDate).getMonth() + 1) + ' '
                        + new Date(x.ResultDate).getHours() + ':' +
                        new Date(x.ResultDate).getMinutes()
                });
                const array = this.modelData.Data2.map(x => {
                    const value = x.map(y => {
                        return y.NumericValue
                    }).sort(function (a, b) {
                        return b - a;
                    });
                    return value[0];
                });
                this.model.valueAxes[0].max = array.sort(function (a, b) {
                    return b - a;
                })[0] + 30;
                const datachart = this.modelData.Data2.map((x, ix) => {
                    return {
                        VitalId: ix + 1,
                        Value: x.map(y => {
                            return y.NumericValue;
                        })
                    }
                });
                this.model.series.forEach(x => {
                    if (x.VitalId) {
                        const result = datachart.find(a => a.VitalId === x.VitalId);
                        x.data = result.Value;
                    } else {
                        x.data = datachart[0].Value.map((a, ix) => {
                            return [a, datachart[1].Value[ix]];
                        })
                    }
                });
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = true;
        }

    }

    convertDateToUnix = (date: string) => moment(date).unix();

    public labelContentFrom(e: any): string {
        return `${e.value.from}`;
    }

    public labelContentTo(e: any): string {
        return `${e.value.to}`;
    }

    public crossingValues: number[] = [0, 20];

    onSeriesClick = (event?) => {
        this.model.series.forEach((x, ix) => {
            if (event && ix === event.series.index) {
                x.checked = true;
            } else {
                x.checked = false;
            }
        });
    };

    openDialog() {
        this.dialog.open(CreateVitalComponent, {
            panelClass: "createVistal",
            data: this.patientId
        }).afterClosed().subscribe(() => {
            this.onLoadData();
            this.isTable = true;
        });
    }

    openEditDialog() {
        this.dialog.open(UpdateVitalComponent, {
            panelClass: "createVistal",
            data: this.patientId
        }).afterClosed().subscribe(() => {
            this.onLoadData();
            this.isTable = true;
        });
    }

    onClick = (item) => {
        item.hide = !item.hide;
        this.model.seriesSub = this.model.series.filter(x => !x.hide)
    }

    onNextList = () => {
        this.isTable = !this.isTable;
    }

    onClickSort = () => {
        if (this.isTable) {
            if (!this.isSortTable) {
                this.modelData.Time2 = this.modelData.Time2.sort(function (a, b) {
                    return b.convertDate - a.convertDate;
                });
                this.modelData.Date2 = this.modelData.Date2.sort(function (a, b) {
                    return b.convertDate - a.convertDate;
                });

                this.data = this.modelData.Data2.map(d => {
                    return {
                        VitalId: d[0].VitalId,
                        Name: d[0].Name,
                        Value: d.sort(function (a, b) {
                            return b.convertDate - a.convertDate;
                        }).map(f => {
                            return f.NumericValue
                        })
                    }
                });
                this.isSortTable = !this.isSortTable;
            } else {
                this.modelData.Time2 = this.modelData.Time2.sort(function (a, b) {
                    return a.convertDate - b.convertDate;
                });
                this.modelData.Date2 = this.modelData.Date2.sort(function (a, b) {
                    return a.convertDate - b.convertDate;
                });
                this.data = this.modelData.Data2.map(d => {
                    return {
                        VitalId: d[0].VitalId,
                        Name: d[0].Name,
                        Value: d.sort(function (a, b) {
                            return a.convertDate - b.convertDate;
                        }).map(f => {
                            return f.NumericValue
                        })
                    }
                });
                this.isSortTable = !this.isSortTable;
            }
        } else {
            this.model.categories = this.model.categories.reverse();
            this.model.seriesSub.forEach(x => {
                x.data = x.data.reverse();
            });
        }
        this.toggleLegend();
    }

    toggleLegend() {
        this.legendVisible = !this.legendVisible;
    }

}
