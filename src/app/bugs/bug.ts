export class Bug {
    //propiedades
    constructor(
        public title="",
        public body="",
        public isFixed=false,
        public stepsToReproduce="",
        public severity=1,
    ){
    }
}
