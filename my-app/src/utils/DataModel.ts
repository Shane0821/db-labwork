export interface EmployeeModel {
    eno: number;
    ename: string;
    gender: string;
    age: number;
    phone: string;
    dno: number;
    dname: string;
}


export interface DepartmentModel {
    dno: number;
    dname: string;
    address: string;
    bossno: number;
    ename: string;
}

export interface ProjectModel {
    pno: number;
    dsc: string;
    stime: Date;
    ftime: Date;
    leaderno: number;
    ename: string;
}
