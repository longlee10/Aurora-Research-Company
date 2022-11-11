export class Survey
{
    constructor(
        public _id?: string,
        public author?: String,
        public name?: String,
        public description?: String,
        public start_time?: Date, 
        public end_time?: Date, 
        public questions?: Question[],
        public answers?: Answer[]
    ){}
}

export class Question {
    constructor(
        public _id?: string,
        public question_priority?: Number, 
        public name?: String,    
        public type?: String,   // yes/no, true/false, radio buttons, dropdown list 
        public options?:String[]
    ){}
}

export class Answer {
    constructor(
        public _id?: string,
        public response_date?: Date,
        public responses?: Response1[]
    ){}
}

export class Response1 {
    constructor(
        public _id?: string,
        public question_id?: string,
        public options?: String[]
    ){}
}