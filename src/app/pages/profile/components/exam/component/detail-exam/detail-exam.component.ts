import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { differenceBy } from 'lodash';

import { ExamModel } from "../../model";
import { ExamService } from "../../service";
import { SelectExamComponent } from "./select-exam/select-exam.component";

@Component({
    selector: "app-detail-exam",
    templateUrl: "./detail-exam.component.html",
    styleUrls: ["./detail-exam.component.scss"],
})
export class DetailExamComponent implements OnInit {
    @Input() data;
    @Input() listExam;
    isAbnormal: boolean = true;
    listExamSub: any = [];
    listSection: any = [];
    leftRight: any = [];
    isLoading = false;

    constructor(
        public dialog: MatDialog,
        private examService: ExamService
    ) { }

    async ngOnInit() {
        try {
            this.isLoading = false;
            const respone = await this.examService.listExamVisit(
                this.data.VisitId,
                this.data.ProblemId
            );
            respone.Payload = respone.Payload || [];
            if (respone.Payload.length) {
                let checked = false;
                this.data.listLv2 = respone.Payload.map((x) => {
                    return {
                        Name: x.ExamName,
                        ExamId: x.ExamId,
                        ResultId: x.ResultId,
                        LeftRight: x.LeftRight || 0,
                        ParentExamId: x.ParentExamId,
                        VisitId: this.data.VisitId,
                        isAbnormal: x.ResultId !== 1 ? true : false,
                        SubVisitExamModels: x.SubVisitExamModels || [],
                    };
                });
                this.data.listLv2.forEach(async (x) => {
                    const respone = await this.examService.listExam(x.ExamId);
                    if (!checked && !respone.Payload.length && x.ResultId === 2) {
                        this.listExamSub = this.onChangeListExamSub(x);
                        const value = this.listExamSub.find((a) => a.ResultId === 2);
                        if (value) {
                            this.onClickActiveListExamSub(value);
                        }
                        this.isAbnormal = false;
                        checked = true;
                    }
                    if (respone.Payload.length) {
                        for (let index = 0; index < x.SubVisitExamModels.length; index++) {
                            const e = x.SubVisitExamModels[index];
                            if (this.listSection.length == 0 && e.ResultId == 2) {
                                this.listSection = respone.Payload.map((k) => {
                                    const value = x.SubVisitExamModels.find(
                                        (u) => u.ExamId === k.ExamId
                                    );
                                    return {
                                        ExamId: k.ExamId,
                                        ParentExamId: k.ParentExamId,
                                        LeftRight: k.LeftRight,
                                        Name: k.Name,
                                        Status: k.Status,
                                        Type: k.Type,
                                        active: x.SubVisitExamModels
                                            ? x.SubVisitExamModels.map((o) => {
                                                return o.ExamId;
                                            }).includes(k.ExamId)
                                            : false,
                                        ResultId: value ? value.ResultId : 1,
                                        isUpdate: x.SubVisitExamModels
                                            ? x.SubVisitExamModels.map((o) => {
                                                return o.ExamId;
                                            }).includes(k.ExamId)
                                            : false,
                                    };
                                });
                            }
                        }
                    }
                });
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            this.isLoading = true;
        }
    }

    onChangeListExamSub = (x) => {
        if (x.SubVisitExamModels) {
            const data = x.SubVisitExamModels.map((a) => {
                return {
                    Name: a.ExamName,
                    ExamId: a.ExamId,
                    ResultId: a.ResultId,
                    LeftRight: a.LeftRight || 0,
                    ParentExamId: a.ParentExamId,
                    VisitId: this.data.VisitId,
                    isAbnormal: a.ResultId != 1 ? true : false,
                    checked: true,
                };
            });
            return data;
        }
        return [];
    };

    onSelectExamAbnormalLv1 = async (i) => {
        try {
            this.listExamSub = this.onChangeListExamSub(i);
            i.isAbnormal = true;
            const dataModel = new ExamModel({
                ParentExamId: i.ParentExamId,
                Type: 1,
                Status: 1,
                ResultId: 2,
                LeftRight: i.LeftRight || 0,
                ExamId: i.ExamId,
                ProblemId: this.data.ProblemId,
                VisitId: this.data.VisitId,
                GroupNumber: 0,
            });
            await this.examService.updateVisitExam(
                this.data.VisitId,
                i.ExamId,
                this.data.ProblemId,
                dataModel
            );
            localStorage.setItem("Active", i.ExamId);
            const respone = await this.examService.listExam(i.ExamId);
            if (respone.Payload.length) {
                this.isAbnormal = true;
                this.listSection = respone.Payload.map((x) => {
                    return {
                        ParentExamId: x.ParentExamId,
                        ExamId: x.ExamId,
                        LeftRight: x.LeftRight,
                        Status: x.Status,
                        Type: x.Type,
                        Name: x.Name,
                    };
                });
            } else {
                this.isAbnormal = false;
                this.listSection = [];
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            this.onClickActiveLv2(i);
            this.leftRight = [];
        }
    };

    onSelectExamNormalLv1 = async (i) => {
        try {
            this.onClickActiveLv2(i);
            const data = this.data.listLv2.find((x) => x.ExamId == i.ExamId);
            data.isAbnormal = false;
            const dataModel = new ExamModel({
                ParentExamId: i.ParentExamId,
                Type: 1,
                Status: 1,
                ResultId: 1,
                LeftRight: i.LeftRight || 0,
                ExamId: i.ExamId,
                ProblemId: this.data.ProblemId,
                VisitId: this.data.VisitId,
                GroupNumber: 0,
            });
            await this.examService.updateVisitExam(
                this.data.VisitId,
                i.ExamId,
                this.data.ProblemId,
                dataModel
            );
        } catch (ex) {
            console.log(ex);
        } finally {
            this.listSection = [];
            this.leftRight = [];
            this.listExamSub = [];
            this.isAbnormal = true;
        }
    };

    onSelectExamAbnormalLv2 = async (i) => {
        try {
            const dataParent = this.data.listLv2.find(
                (x) => x.ExamId === i.ParentExamId
            );
            const dataExam = dataParent.SubVisitExamModels.find(
                (x) => x.ExamId === i.ExamId
            );
            i.isAbnormal = true;
            const respone = await this.examService.listExam(i.ExamId);
            this.listSection = respone.Payload.map((x) => {
                dataExam.SubVisitExamModels = dataExam.SubVisitExamModels || [];
                const result = dataExam.SubVisitExamModels.find(
                    (a) => a.ExamId === x.ExamId
                );
                return {
                    ParentExamId: x.ParentExamId,
                    ExamId: x.ExamId,
                    LeftRight: x.LeftRight,
                    Status: x.Status,
                    Type: x.Type,
                    Name: x.Name,
                    ResultId: result ? result.ResultId : 0,
                    active: dataExam.SubVisitExamModels
                        ? dataExam.SubVisitExamModels.map((a) => {
                            return a.ExamId;
                        }).includes(x.ExamId)
                        : false,
                };
            });
            const data = new ExamModel({
                ParentExamId: i.ParentExamId,
                Type: 1,
                Status: 1,
                ResultId: 2,
                LeftRight: i.LeftRight,
                ExamId: i.ExamId,
                ProblemId: this.data.ProblemId,
                VisitId: this.data.VisitId,
                GroupNumber: 0,
            });
            await this.examService.updateVisitExam(
                this.data.VisitId,
                i.ExamId,
                this.data.ProblemId,
                data
            );
        } catch (ex) {
            console.log(ex);
        } finally {
            this.listExamSub.forEach((x) => {
                if (x.ExamId == i.ExamId) {
                    x.active = true;
                } else {
                    x.active = false;
                }
            });
        }
    };

    onSelectExamNormalLv2 = async (i) => {
        try {
            i.isAbnormal = false;
            const data = new ExamModel({
                ParentExamId: i.ParentExamId,
                Type: i.Type,
                Status: i.Status,
                ResultId: 1,
                LeftRight: i.LeftRight,
                ExamId: i.ExamId,
                VisitId: this.data.VisitId,
                ProblemId: this.data.ProblemId,
                GroupNumber: 0,
            });
            await this.examService.updateVisitExam(
                i.VisitId,
                i.ExamId,
                this.data.ProblemId,
                data
            );
        } catch (ex) {
            console.log(ex);
        } finally {
            this.listSection = [];
            this.leftRight = [];
            this.listExamSub.forEach((x) => {
                if (x.ExamId == i.ExamId) {
                    x.active = true;
                } else {
                    x.active = false;
                }
            });
        }
    };

    //done
    onSeclectionExam = async (item) => {
        this.listSection.forEach((x) => {
            if (x.ExamId == item.ExamId) {
                x.active = true;
            } else {
                x.active = false;
            }
        });
        if (item.ResultId == 2) {
            const respone = await this.examService.listResultIdExam(
                this.data.VisitId,
                this.data.ProblemId,
                item.ExamId
            );
            const respone2 = await this.examService.listExamAvailableResults(
                item.ExamId
            );
            this.leftRight = respone2.Payload.map((x) => {
                return {
                    GroupNumber: x.GroupNumber,
                    LeftRight: x.LeftRight,
                    ParentExamId: item.ParentExamId,
                    ExamId: item.ExamId,
                    ListResultId: x.ListResultId,
                    ListResultName: x.ListResultName,
                    ResultId: 2,
                    isRequest: false,
                    ListResult0: x.ListResultId.map((y, ix) => {
                        const data = respone.Payload.filter((a) => a.LeftRight === 0);
                        return {
                            id: y,
                            name: x.ListResultName[ix],
                            checked: data.length
                                ? data
                                    .map((x) => {
                                        return x.ResultId;
                                    })
                                    .includes(y)
                                : false,
                            LeftRight: 0,
                        };
                    }),
                    ListResult1: x.ListResultId.map((y, ix) => {
                        const data = respone.Payload.filter((a) => a.LeftRight === 1);
                        return {
                            id: y,
                            name: x.ListResultName[ix],
                            checked: data.length
                                ? data
                                    .map((x) => {
                                        return x.ResultId;
                                    })
                                    .includes(y)
                                : false,
                            LeftRight: 1,
                        };
                    }),
                    ListResult2: x.ListResultId.map((y, ix) => {
                        const data = respone.Payload.filter((a) => a.LeftRight === 2);
                        return {
                            id: y,
                            name: x.ListResultName[ix],
                            checked: data.length
                                ? data
                                    .map((x) => {
                                        return x.ResultId;
                                    })
                                    .includes(y)
                                : false,
                            LeftRight: 2,
                        };
                    }),
                };
            });
        } else {
            this.leftRight = [];
        }
    };

    //done
    onSeclectSetionAbnormal = async (item) => {
        item.select = true;
        const respone = await this.examService.listResultIdExam(
            this.data.VisitId,
            this.data.ProblemId,
            item.ExamId
        );
        const respone2 = await this.examService.listExamAvailableResults(
            item.ExamId
        );
        this.leftRight = respone2.Payload.map((x) => {
            return {
                GroupNumber: x.GroupNumber,
                LeftRight: x.LeftRight,
                ParentExamId: item.ParentExamId,
                ExamId: item.ExamId,
                ListResultId: x.ListResultId,
                ListResultName: x.ListResultName,
                ResultId: 2,
                isRequest: false,
                ListResult0: x.ListResultId.map((y, ix) => {
                    const data = respone.Payload.filter((a) => a.LeftRight === 0);
                    return {
                        id: y,
                        name: x.ListResultName[ix],
                        checked: data
                            .map((x) => {
                                return x.ResultId;
                            })
                            .includes(y),
                        LeftRight: 0,
                    };
                }),
                ListResult1: x.ListResultId.map((y, ix) => {
                    const data = respone.Payload.filter((a) => a.LeftRight === 1);
                    return {
                        id: y,
                        name: x.ListResultName[ix],
                        checked: data
                            .map((x) => {
                                return x.ResultId;
                            })
                            .includes(y),
                        LeftRight: 1,
                    };
                }),
                ListResult2: x.ListResultId.map((y, ix) => {
                    const data = respone.Payload.filter((a) => a.LeftRight === 2);
                    return {
                        id: y,
                        name: x.ListResultName[ix],
                        checked: data
                            .map((x) => {
                                return x.ResultId;
                            })
                            .includes(y),
                        LeftRight: 2,
                    };
                }),
            };
        });
        const data = new ExamModel({
            VisitId: this.data.VisitId,
            ExamId: item.ExamId,
            ProblemId: this.data.ProblemId,
            ParentExamId: item.ParentExamId,
            LeftRight: item.LeftRight,
            ResultId: 2,
            Type: 1,
            Status: 1,
            GroupNumber: 0,
        });
        if (!item.isUpdate) {
            await this.examService.createdVisitExam(data);
        } else {
            await this.examService.updateVisitExam(
                this.data.VisitId,
                item.ExamId,
                this.data.ProblemId,
                data
            );
        }
        item.ResultId = 2;
    };

    //done
    onSeclectSetionNormal = async (item) => {
        item.select = true;
        const data = new ExamModel({
            VisitId: this.data.VisitId,
            ExamId: item.ExamId,
            ProblemId: this.data.ProblemId,
            ParentExamId: item.ParentExamId,
            LeftRight: item.LeftRight,
            ResultId: 1,
            Type: 1,
            Status: 1,
            GroupNumber: 0,
        });
        if (!item.isUpdate) {
            await this.examService.createdVisitExam(data);
        } else {
            await this.examService.updateVisitExam(
                this.data.VisitId,
                item.ExamId,
                this.data.ProblemId,
                data
            );
        }
        this.leftRight = [];
        item.ResultId = 1;
    };

    onSeclectSetionNotExam = async (item) => {
        item.select = true;
        const data = new ExamModel({
            VisitId: this.data.VisitId,
            ExamId: item.ExamId,
            ProblemId: this.data.ProblemId,
            ParentExamId: item.ParentExamId,
            LeftRight: item.LeftRight,
            ResultId: 0,
            Type: 1,
            Status: 1,
            GroupNumber: 0,
        });
        if (!item.isUpdate) {
            await this.examService.createdVisitExam(data);
        } else {
            await this.examService.updateVisitExam(
                this.data.VisitId,
                item.ExamId,
                this.data.ProblemId,
                data
            );
        }
        this.leftRight = [];
        item.ResultId = 1;
    }

    //done
    onClickActiveLv2 = (i) => {
        this.data.listLv2.forEach((x) => {
            if (x.ExamId == i.ExamId) {
                x.active = true;
            } else {
                x.active = false;
            }
        });
    };

    //done
    onClickActiveListExamSub = (i) => {
        if (i.ResultId === 2) {
            this.onSelectExamAbnormalLv2(i);
        }
        if (i.ResultId === 1) {
            this.onSelectExamNormalLv2(i);
        }
        this.listExamSub.forEach((x) => {
            if (x.ExamId == i.ExamId) {
                x.active = true;
            } else {
                x.active = false;
            }
        });
    };

    //done
    openDialog() {
        let listExamFilter = this.listExam;
        if (this.listExamSub.length) {
            listExamFilter = this.listExam.filter(
                (x) =>
                    !this.listExamSub
                        .map((a) => {
                            return a.ExamId;
                        })
                        .includes(x.ExamId)
            );
        }
        const listExamSub = listExamFilter.map((x) => {
            this.data.listLv2 = this.data.listLv2 ? this.data.listLv2 : [];
            const data = this.data.listLv2.find((a) => a.ExamId === x.ExamId);
            return {
                Name: x.Name,
                ParentExamId: null,
                LeftRight: 0,
                ExamId: x.ExamId,
                checked: this.data.listLv2
                    ? this.data.listLv2
                        .map((a) => {
                            return a.ExamId;
                        })
                        .includes(x.ExamId)
                    : false,
                isCreate: this.data.listLv2
                    ? this.data.listLv2
                        .map((a) => {
                            return a.ExamId;
                        })
                        .includes(x.ExamId)
                    : false,
                isAbnormal: data ? data.isAbnormal : false,
            };
        });
        this.dialog
            .open(SelectExamComponent, {
                panelClass: "selectExam",
                data: listExamSub,
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    const datalistLv2 = this.data.listLv2;
                    this.data.listLv2 = result.filter((x) => x.checked);
                    const data = differenceBy(datalistLv2, this.data.listLv2, 'ExamId');
                    this.data.listLv2
                        .filter((a) => !a.isCreate)
                        .forEach(async (x) => {
                            x.isAbnormal = false;
                            x.isRequest = false;
                            const data = {
                                LeftRight: 0,
                                ResultId: 1,
                                Type: 1,
                                Status: 1,
                                ExamId: x.ExamId,
                                ParentExamId: null,
                                VisitId: this.data.VisitId,
                                ProblemId: this.data.ProblemId,
                            };
                            await this.examService.createdVisitExam(data);
                        });
                    if (data.length) {
                        let dataUpdate: any = {};
                        dataUpdate.examId = data.map((x: any) => {
                            return x.ExamId;
                        })
                        this.examService.deleteExam(this.data.VisitId, this.data.ProblemId, dataUpdate)
                            .subscribe(res => {
                                console.log(res);
                            });
                    }
                }
            });
    }

    //done
    openDialog2() {
        const value = this.data.listLv2.find(
            (x) => x.ExamId == localStorage.getItem("Active")
        );
        const listExamFilter = this.listExam.filter(
            (x) =>
                !this.data.listLv2
                    .map((a) => {
                        return a.ExamId;
                    })
                    .includes(x.ExamId)
        );
        const listExamSub = listExamFilter.map((x) => {
            value.SubVisitExamModels = value.SubVisitExamModels
                ? value.SubVisitExamModels
                : [];
            const data = value.SubVisitExamModels.find((a) => a.ExamId === x.ExamId);
            return {
                Name: x.Name,
                ParentExamId: value.ExamId,
                LeftRight: x.LeftRight,
                ExamId: x.ExamId,
                checked: value.SubVisitExamModels
                    ? value.SubVisitExamModels.map((a) => {
                        return a.ExamId;
                    }).includes(x.ExamId)
                    : false,
                isCreate: value.SubVisitExamModels
                    ? value.SubVisitExamModels.map((a) => {
                        return a.ExamId;
                    }).includes(x.ExamId)
                    : false,
                ResultId: data ? data.ResultId : 1,
            };
        });
        this.dialog
            .open(SelectExamComponent, {
                panelClass: "selectExam",
                data: listExamSub,
            })
            .afterClosed()
            .subscribe((result) => {
                if (result.length) {
                    this.listExamSub = result.filter((x) => x.checked);
                    this.listExamSub.forEach((x) => {
                        if (x.ResultId === 2) {
                            x.isAbnormal = true;
                        } else {
                            x.isAbnormal = false;
                        }
                    });
                    value.SubVisitExamModels = this.listExamSub.map((x) => {
                        return {
                            ExamId: x.ExamId,
                            ParentExamId: value.ExamId,
                            LeftRight: x.LeftRight,
                            Name: x.Name,
                            Status: 1,
                            Type: 1,
                            isCreate: x.isCreate,
                        };
                    });
                    this.listExamSub
                        .filter((a) => !a.isCreate)
                        .forEach(async (x) => {
                            const data = {
                                ExamId: x.ExamId,
                                ParentExamId: x.ParentExamId,
                                ResultId: 0,
                                LeftRight: x.LeftRight,
                                Status: x.Status,
                                Type: x.Type,
                                VisitId: this.data.VisitId,
                                ProblemId: this.data.ProblemId,
                            };
                            await this.examService.createdVisitExam(data);
                        });
                }
            });
    }

    onSeclectionLeftRigt = async (item, type, i) => {
        const data = new ExamModel({
            LeftRight: type,
            ResultId: i.id,
            ParentExamId: item.ParentExamId,
            ExamId: item.ExamId,
            Type: 1,
            Status: 1,
            VisitId: this.data.VisitId,
            ProblemId: this.data.ProblemId,
            GroupNumber: item.GroupNumber,
        });
        switch (type) {
            case 0:
                const checked = item.ListResult0.find((x) => x.checked);
                if (!checked) {
                    await this.examService.createdVisitExam(data);
                } else {
                    await this.examService.updateVisitExam(
                        this.data.VisitId,
                        item.ExamId,
                        this.data.ProblemId,
                        data
                    );
                }
                item.ListResult0.forEach((x) => {
                    if (x.id === i.id) {
                        x.checked = true;
                    } else {
                        x.checked = false;
                    }
                });
                break;
            case 1:
                const checked1 = item.ListResult1.find((x) => x.checked);
                if (!checked1) {
                    await this.examService.createdVisitExam(data);
                } else {
                    await this.examService.updateVisitExam(
                        this.data.VisitId,
                        item.ExamId,
                        this.data.ProblemId,
                        data
                    );
                }
                item.ListResult1.forEach((x) => {
                    if (x.id === i.id) {
                        x.checked = true;
                    } else {
                        x.checked = false;
                    }
                });
                break;
            case 2:
                const checked2 = item.ListResult2.find((x) => x.checked);
                if (!checked2) {
                    await this.examService.createdVisitExam(data);
                } else {
                    await this.examService.updateVisitExam(
                        this.data.VisitId,
                        item.ExamId,
                        this.data.ProblemId,
                        data
                    );
                }
                item.ListResult2.forEach((x) => {
                    if (x.id === i.id) {
                        x.checked = true;
                    } else {
                        x.checked = false;
                    }
                });
                break;
            default:
                break;
        }
    };
}
