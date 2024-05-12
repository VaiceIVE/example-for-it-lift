export class CreateUserDto
{
    nickname: string
    username: string
    password: string
    avatar?: string
    role: "user" | "admin" 
    grade: "8" | "9" | "10" | "11" 
}
