use rocket::serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Business {
    pub id: Option<u64>,
    pub notificador: String,
    pub folio: Option<String>,
    pub contrato: String,
    pub giro: String,
    pub nombre: String,
    pub direccion: String,
    pub colonia: String,
    pub fecha: Option<String>,
    pub zona: String,
    pub estatus: String,
    pub obs: Option<String>,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Zones {
    pub id: Option<u64>,
    pub prefix: String,
    pub zone: String,
    pub notifier: String,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Notifiers {
    pub id: Option<u64>,
    pub userid: Option<String>,
    pub name: Option<String>,
    pub username: Option<String>,
    pub password: Option<String>,
    pub zone: Option<String>,
    pub role: Option<String>,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Login {
    pub username: String,
    pub password: String
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Response {
    pub succes: Option<String>,
    pub error: Option<String>
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct LoginResponse {
    pub token: Option<String>,
    pub error: Option<String>
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Claims {
    pub userid: String,
    pub name: String,
    pub zone: String,
    pub role: String,
    pub exp: usize
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Token {
    pub error: Option<String>,
    pub claims: Option<Claims>,
}
