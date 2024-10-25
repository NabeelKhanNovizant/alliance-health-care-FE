import { Assessment } from "./assessment";
import { Patient } from "./patient";

export class CarePlanModel {
    patient: Patient | null = null;
    assessment: Assessment | null = null;
    caseName: string = "";
    caseAcuity: string = "";
    caseSource: string = "";
    caseType: string = "";
    description: string = "";
    note: string = "";
    primaryContact: string = "";
    mainDiagnosis: string = "";
    additionalDiagnosis: string = "";
    AdditionalOtherDiagnosis: string = "";

    problems: CarePlanProblem[] = [];
}

export class CarePlanProblem {
    problemId: number = 0;
    name: string = "";
    status: string = "";
    startDate: Date = new Date();
    endDate: Date = new Date();

    goals: CarePlanGoal[] = [];
}

export class CarePlanGoal {
    goalId: number = 0;
    name: string = "";
    status: string = "";
    priority: string = "";
    startDate: Date = new Date();
    endDate: Date = new Date();
    problemId: number = 0;

    milestones: CarePlanMilestone[] = [];
}

export class CarePlanMilestone {
    milestoneId: number = 0;
    name: string = "";
    status: string = "";
    actionType: string = "";
    startDate: Date = new Date();
    endDate: Date = new Date();
    goalId: number = 0;
}
