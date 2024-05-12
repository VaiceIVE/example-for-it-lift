export class CreateUniDto
{
    name: string
    city: string
    popularity: string
    students: number
    budgetPlaces: boolean
    tags: string[] | string
    image?: string
    imageBuff?: Buffer
}