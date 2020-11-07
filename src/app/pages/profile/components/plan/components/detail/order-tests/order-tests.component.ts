import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { DataService, OrderTestService, OrgansService, TestCategoryService } from '../../../services';

@Component({
    selector: 'app-order-tests',
    templateUrl: './order-tests.component.html',
    styleUrls: ['./order-tests.component.scss']
})
export class OrderTestsComponent implements OnInit {
    @Input() data;

    constructor(
        private testCategoryService: TestCategoryService,
        private orderTest: OrderTestService,
        private organList: OrgansService,
        private dataService: DataService,
        private activatedRoute: ActivatedRoute,
    ) { }
    visiId: any;
    problemId: any;
    checkOrder: any;
    patientId: number;
    visitId: number;
    listTestCategory: any = [];
    listOrgans: any = [];
    listTest: any;
    organId: number = 1;
    listOrderTest: any;
    categoryId: number = 1;
    listTestId: any = [];
    testcategoryId: number = 5;
    displayedColumns = [
        'Name', 'icon'
    ];
    checkFocus: any;
    listXbraySub: any = [];
    listCategorySub: any = [];
    xBraySub: number = 16;
    checkOrderAll: boolean = false;

    async ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
            (pram) => (this.patientId = +pram.get("patientId"))
        );
        await this.getDetailPatient();
        this.getListOrderTest();
        this.listOrgan();
        this.getlistCategory();
        this.listTestCategoryId(this.categoryId);
    }

    listOrgan() {
        this.orderTest.listOrgans().subscribe(res => {
            this.listOrgans = res;
            this.listOrgans.map(x => {
                x.CheckOrderTest = false,
                    x.TestcategoryId = this.testcategoryId
            });
            console.log(this.listOrgans);
            this.orderTest.getListOrderTest(this.visiId, this.data.ProblemId).subscribe(res => {
                this.listOrgans.forEach(x => {
                    const check = res.find(i => i.OrganId == x.OrganId && i.TestCategoryId === x.TestcategoryId);
                    if (check !== undefined) {
                        x.CheckOrderTest = true;
                    }
                    else {
                        x.CheckOrderTest = false;
                    }
                });
            });
        });
    }

    getlistCategory() {
        this.orderTest.listCategory().subscribe(res => {
            this.listTestCategory = res;
            this.listTestCategory.map(x => x.CheckOrderTest = false);
            this.orderTest.getListOrderTest(this.visiId, this.data.ProblemId).subscribe(res => {
                this.listTestCategory.forEach(a => {
                    res.forEach(i => {
                        if (i.TestCategoryId >= 5 && i.TestCategoryId < 16 && a.TestcategoryId === 1) {
                            a.CheckOrderTest = true;
                        }
                        else if (i.TestCategoryId >= 16 && a.TestcategoryId === 4) {
                            a.CheckOrderTest = true;
                        }
                        else if (i.TestCategoryId === a.TestcategoryId) {
                            a.CheckOrderTest = true;
                        }
                    });
                });

            });

        });
    }

    onActiveItem = async (item) => {
        this.getlistCategory();
        this.listOrgan();
        this.categoryId = item.TestcategoryId;
        this.listTestCategoryId(item.TestcategoryId);

        try {
            this.listTestCategory.forEach(x => {
                if (x.TestcategoryId == item.TestcategoryId) {
                    x.isActive = true;
                } else {
                    x.isActive = false;
                }
            });
            if (!item.getRequest) {
                const respone = await this.testCategoryService.listTestCategories(item.TestcategoryId);
                item.getRequest = true;
                if (!respone.Check) {
                    item.subValue = respone.Payload;
                    this.listCategorySub = item.subValue;
                    this.listCategorySub.map(x => x.CheckOrderTest = false);
                    this.orderTest.getListOrderTest(this.visiId, this.data.ProblemId).subscribe(res => {
                        this.listCategorySub.forEach(a => {
                            const check = res.find(i => i.TestCategoryId == a.TestcategoryId);
                            if (check !== undefined) {
                                a.CheckOrderTest = true;
                            } else {
                                a.CheckOrderTest = false;
                            }
                        });

                    });
                    this.listCategorySub.forEach(x => {
                        x.isActive = false;
                        x.getRequest = false;
                    });
                    this.listXbraySub = [];
                    item.Check = false;
                } else {
                    item.subValue = respone.Payload;
                    this.listXbraySub = respone.Payload;
                    this.listXbraySub.map(x => x.CheckOrderTest = false);
                    this.orderTest.getListOrderTest(this.visiId, this.data.ProblemId).subscribe(res => {
                        this.listXbraySub.forEach(a => {
                            const check = res.find(i => i.TestCategoryId == a.TestcategoryId);
                            if (check !== undefined) {
                                a.CheckOrderTest = true;
                            } else {
                                a.CheckOrderTest = false;
                            }
                        });

                    });
                    this.listXbraySub.forEach(x => {
                        x.getRequest = false;
                    });
                    item.Check = true;
                }
            } else {
                if (item.Check) {
                    this.listXbraySub = item.subValue;
                    this.listXbraySub.map(x => x.CheckOrderTest = false);
                    this.orderTest.getListOrderTest(this.visiId, this.data.ProblemId).subscribe(res => {
                        this.listXbraySub.forEach(a => {
                            const check = res.find(i => i.TestCategoryId == a.TestcategoryId);
                            if (check !== undefined) {
                                a.CheckOrderTest = true;
                            } else {
                                a.CheckOrderTest = false;
                            }
                        });

                    });
                    this.listCategorySub = [];
                } else {
                    this.listXbraySub = [];
                    this.listCategorySub = item.subValue;
                    this.listCategorySub.map(x => x.CheckOrderTest = false);
                    this.orderTest.getListOrderTest(this.visiId, this.data.ProblemId).subscribe(res => {
                        this.listCategorySub.forEach(a => {
                            const check = res.find(i => i.TestCategoryId == a.TestcategoryId);
                            if (check !== undefined) {
                                a.CheckOrderTest = true;
                            } else {
                                a.CheckOrderTest = false;
                            }
                        });

                    });
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    onActiveOrgans = async (item) => {
        this.getlistCategory();
        this.organId = item.OrganId;
        this.listTestCategoryId(this.testcategoryId);
        this.listOrgans.forEach(x => {
            if (x.OrganId == item.OrganId) {
                x.isActive = true;
            } else {
                x.isActive = false;
            }
        });
    }

    onActiveXbraySub = async (item) => {
        this.xBraySub = item.TestcategoryId;
        this.listOrgan();
        this.listTestCategoryId(item.TestcategoryId);
        this.listXbraySub.forEach(x => {
            if (x.TestcategoryId == item.TestcategoryId) {
                x.isActive = true;
            } else {
                x.isActive = false;
            }
        });

        if (!item.getRequest) {
            const respone = await this.testCategoryService.listTestCategories(item.TestcategoryId);
            item.getRequest = true;
            item.subValue = respone.Payload;
            this.listCategorySub = item.subValue;

            this.listCategorySub.forEach(x => {
                x.isActive = false;
                x.getRequest = false;
            });
        } else {
            this.listCategorySub = item.subValue;
        }
    }
    getDetailPatient() {
        this.orderTest.getDetailPatient(this.patientId).subscribe(res => {
            this.visiId = res.VisitId;
        })
    }


    onActiveCatSub = (item, index) => {
        this.listOrgan();
        let newListTest = this.listTest.find(x => x.TestId === item.TestId);
        if (newListTest.checkActive === false) {

            if (this.categoryId === 1) {
                let model = {
                    VisitId: this.visiId,
                    ProblemId: this.data.ProblemId,
                    OrganId: 0,
                    TestId: item.TestId,
                    TestcategoryId: this.testcategoryId
                }
                this.orderTest.orderTest(model).subscribe(res => {
                    newListTest.checkActive = !newListTest.checkActive;
                    this.listTestCategoryId(this.testcategoryId);
                    Swal.fire({
                        icon: 'success',
                        title: 'Order successful!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else if (this.categoryId === 4) {
                let model = {
                    VisitId: this.visiId,
                    ProblemId: this.data.ProblemId,
                    OrganId: this.organId,
                    TestId: item.TestId,
                    TestcategoryId: this.testcategoryId
                }
                this.orderTest.orderTest(model).subscribe(res => {
                    newListTest.checkActive = !newListTest.checkActive;
                    this.listTestCategoryId(this.testcategoryId);
                    Swal.fire({
                        icon: 'success',
                        title: 'Order successful!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else if (this.categoryId === 2 || this.categoryId === 3) {
                let model = {
                    VisitId: this.visiId,
                    ProblemId: this.data.ProblemId,
                    OrganId: this.organId,
                    TestId: item.TestId,
                    TestcategoryId: this.categoryId
                }
                this.orderTest.orderTest(model).subscribe(res => {
                    newListTest.checkActive = !newListTest.checkActive;
                    this.listTestCategoryId(this.testcategoryId);
                    Swal.fire({
                        icon: 'success',
                        title: 'Order successful!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            }
        }
        else {
            this.orderTest.removeOrderTest(newListTest.OrderId).subscribe(res => {
                newListTest.checkActive = !newListTest.checkActive;
                newListTest.OrderId = null;
                this.listTestCategoryId(this.testcategoryId);
            });
        }
    }

    listTestCategoryId(testcategoryId) {
        this.getlistCategory();
        this.testcategoryId = testcategoryId;
        this.orderTest.listTestOfCategory(testcategoryId).subscribe(res => {
            this.listTest = res;
            this.listTest.map(i => {
                i.checkActive = false;
                i.OrderId = null;
            });
            this.getListOrderTest();
            this.listCategorySub.forEach(x => {
                if (x.TestcategoryId == testcategoryId) {
                    x.isActive = true;
                } else {
                    x.isActive = false;
                }
            });
        });
    }
    orderTestAll() {
        let listTest = this.listTest.filter(x => x.checkActive === false);
        if (this.categoryId === 1) {
            listTest.forEach(x => {
                let model = {
                    VisitId: this.visiId,
                    ProblemId: this.data.ProblemId,
                    OrganId: 0,
                    TestId: x.TestId,
                    TestcategoryId: this.testcategoryId
                }
                this.orderTest.orderTest(model).subscribe(res => {
                });
            });
            this.listTestCategoryId(this.testcategoryId);
            this.listOrgan();
            Swal.fire({
                icon: 'success',
                title: 'Order successful!',
                showConfirmButton: false,
                timer: 1500
            });

        } else if (this.categoryId === 4) {
            listTest.forEach(x => {
                let model = {
                    VisitId: this.visiId,
                    ProblemId: this.data.ProblemId,
                    OrganId: this.organId,
                    TestId: x.TestId,
                    TestcategoryId: this.testcategoryId
                }
                this.orderTest.orderTest(model).subscribe(res => {
                });
            });
            this.listTestCategoryId(this.testcategoryId);
            this.listOrgan();
            Swal.fire({
                icon: 'success',
                title: 'Order successful!',
                showConfirmButton: false,
                timer: 1500
            });
        } else if (this.categoryId === 2 || this.categoryId === 3) {
            listTest.forEach(x => {
                let model = {
                    VisitId: this.visiId,
                    ProblemId: this.data.ProblemId,
                    OrganId: this.organId,
                    TestId: x.TestId,
                    TestcategoryId: this.categoryId
                }
                this.orderTest.orderTest(model).subscribe(res => {
                });
            });
            this.listTestCategoryId(this.testcategoryId);
            this.listOrgan();
            Swal.fire({
                icon: 'success',
                title: 'Order successful!',
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    getListOrderTest() {
        this.orderTest.getListOrderTest(this.visiId, this.data.ProblemId).subscribe(res => {
            this.checkOrder = res;
            console.log(this.checkOrder);
            if (this.categoryId != 1) {
                this.listOrderTest = res.find(i => i.OrganId === this.organId && i.TestCategoryId === this.testcategoryId);
                if (this.listOrderTest === undefined) {
                    this.listTestId = [];
                }
                else {
                    this.listTestId = this.listOrderTest.ListTestId;
                    this.listTest.forEach(x => {
                        const check = this.listTestId.find(i => i.TestId == x.TestId);
                        if (check !== undefined) {
                            x.checkActive = true;
                            x.OrderId = check.OrderId;
                        }
                        else {
                            x.checkActive = false;
                        }
                    });
                };
            }
            else {
                this.listOrderTest = res.find(i => i.TestCategoryId === this.testcategoryId);
                if (this.listOrderTest === undefined) {
                    this.listTestId = [];
                }
                else {
                    this.listTestId = this.listOrderTest.ListTestId;
                    this.listTest.forEach(x => {
                        const check = this.listTestId.find(i => i.TestId == x.TestId);
                        if (check !== undefined) {
                            x.checkActive = true;
                            x.OrderId = check.OrderId;
                        }
                        else {
                            x.checkActive = false;
                        }
                    });
                };
            }
        });
    }
}
