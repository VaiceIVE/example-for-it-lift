export class CreateCardDto {
    title: string
    status: "completed" | "up"
    author_id: number
    path_id?: number
}
