export type Business = {
    id?: number,
    notificador: string,
    fecha?: string,
    folio?: string,
    contrato: string,
    giro: string,
    nombre: string,
    direccion: string,
    colonia: string,
    zona: string,
    estatus: string,
    obs?: string
}

export type Zones = {
    id?: number,
    prefix: string,
    zone: string,
    notifier: string,
}

export type Notifiers = {
    id?: number,
    userid?: string,
    name?: string,
    username?: string,
    password?: string,
    zone?: string,
    role?: string,
}

export interface Employee {
    userid: string,
    name: string,
    zone: string,
    role: string,
    exp: number
}

export interface Response {
	succes?: string, 
	error?: string, 
}

export interface Decoded {
    error?: string,
    claims: Employee
}
