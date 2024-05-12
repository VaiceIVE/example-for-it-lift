import { CreateStepContentDto } from "./create-step-content.dto"

export class CreatePathStepDto{
    step: number
    title: string
    points: number
    tags: string[]
    content: CreateStepContentDto
}