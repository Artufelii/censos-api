use mysql::*;
use mysql::prelude::Queryable;
use rocket::serde::json::Json;
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use bcrypt::{verify, hash, DEFAULT_COST};
use chrono::prelude::*;
use crate::models::{ Login, LoginResponse, Notifiers, Claims, Token, Response };
use crate::db::connection;


#[post("/auth/login", format="json", data="<data>")]
pub fn login(data: Json<Login>) -> Json<LoginResponse> {
    let mut conn = connection();
    let query = format!("SELECT * FROM notifiers WHERE username = '{}'", data.username);

    let mut notifier: Vec<Notifiers> = conn.query_map(
      query,
      |(id, userid, name, username, password, zone, role): (u64, String, String, String, String, String, String)| 
      Notifiers {
        id: Some(id),
        userid: Some(userid),
        name: Some(name),
        username: Some(username),
        password: Some(password),
        zone: Some(zone),
        role: Some(role)
      }
    ).expect("Query Fail");

    if notifier.len() == 0 {
      return Json(LoginResponse {
        error: Some("Usuario o contraseña incorrecta".to_string()),
        token: None
      });
    } else {
      let n = notifier.remove(0);
      let pass = verify(&data.password, &n.password.unwrap()).unwrap();

      if !pass {
        return Json(LoginResponse {
          error: Some("Usuario o contraseña incorrecta".to_string()),
          token: None
        });
      }

      let exp = Utc::now()
        .checked_add_signed(chrono::Duration::hours(9)) 
        .expect("valid timestamp")
        .timestamp();

      let claims = Claims {
        userid: n.userid.unwrap(),
        name: n.name.unwrap(),
        zone: n.zone.unwrap(),
        role: n.role.unwrap(),
        exp: exp as usize,
      };

      let token = encode(&Header::default(), &claims, &EncodingKey::from_secret("superultrasecreto234".as_ref())).unwrap();

      return Json(LoginResponse {
        error: None,
        token: Some(token)
      });
    }
}

#[put("/auth/update-password/<username>", data="<password>")]
pub fn update_password(password: String, username: String ) -> Json<Response> {
    let mut conn = connection();

    let hashed = hash(password, DEFAULT_COST).unwrap();

    conn.exec_drop(
        "UPDATE notifiers SET password = :password WHERE username = :username",
        params! {
            "password" => hashed,
            "username" => username
        }
    ).unwrap();

    return Json(Response {
        succes: Some("Contraseña Actualizada con éxito".to_string()),
        error: None
    });
    
}

#[post("/auth/verify-token", data="<token_str>")]
pub fn verify_token(token_str: String) -> Json<Token> {
  let token = decode::<Claims>(&token_str, &DecodingKey::from_secret("superultrasecreto234".as_ref()), &Validation::default());

  if token.is_err() {
    let err = token.as_ref().unwrap_err();
    return Json(Token {
      error: Some(err.to_string()),
      claims: None,
    });
  }

  return Json(Token {
    error: None,
    claims: Some(token.unwrap().claims),
  });
}

