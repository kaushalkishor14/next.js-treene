import bcrypt from 'bcryptjs';

export async function hashPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// function to verify password
export  async function verifyPassword(password:string, hashPassword:string){
    return await bcrypt.compare(password,hashPassword)
}