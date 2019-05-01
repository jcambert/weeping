
interface IApplicationEnviorment{
    mode:string
    back_port:number
}

const env: IApplicationEnviorment={
    mode:process.env.NODE_ENV,
    back_port:process.env.BACK_PORT || 1337
}
export default env