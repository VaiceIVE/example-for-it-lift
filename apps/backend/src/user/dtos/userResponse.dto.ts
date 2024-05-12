export class UserResponseDto
{
    constructor(data: Record<string, any>)
    {
        this.id = data.id ?? null
        this.email = data.email
        this.username = data.username
        this.nickname = data.nickname ?? null
        this.rank = data.rank ?? null
        this.role = data.role ?? null
        this.type = data.type ?? null
    }
    id?: number
    email: string
    username: string
    nickname: string
    rank: string
    role?: "admin" | "user"
    type?: string

}
