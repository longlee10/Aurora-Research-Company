/*******************************
File Name: survey.model.ts
Description: Defines the survey model
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

export class Survey
{
    constructor(
        public _id?: string,
        public author?: string,
        public name?: string,
        public description?: string,
        public start_time?: Date, 
        public end_time?: Date, 
        public isActive?: boolean,
        public questions?: Question[],
        public answers?: Answer[]
    ){}
}

export class Question {
    constructor(
        public _id?: string,
        public question_priority?: Number, 
        public name?: string,    
        public type?: string,   
        public options?: string[]
    ){}
}

export class Answer {
    constructor(
        public _id?: string,
        public response_date?: Date,
        public responses?: AnswerResponse[]
    ){}
}

export class AnswerResponse {
    constructor(
        public _id?: string,
        public question_id?: string,
        public options?: string[]
    ){}
}