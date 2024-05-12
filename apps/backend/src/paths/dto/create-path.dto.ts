import { CreatePathStepDto } from "./create-pathstep.dto"
import { CreateSpecialityDto } from "./create-speciality.dto"

export class CreatePathDto {
    id?: number
    name: string
    steps: CreatePathStepDto[]
    specialities: CreateSpecialityDto[]  
    description: string
}
