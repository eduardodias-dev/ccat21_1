export function validatePassword(password: string)
{
    return password && password.length >= 8
            && password.match(/[A-Z]/)
            && password.match(/[a-z]/)
            && password.match(/\d/);
}