use mysql::*;
use mysql::prelude::Queryable;
use rocket::serde::json::Json;
use bcrypt::{DEFAULT_COST, hash};
use crate::db::connection;
use crate::models::{ Notifiers, Response };

#[get("/notifiers")]
pub fn fetch_notifiers() -> Json<Vec<Notifiers>> {
    let mut conn = connection();

    let res:Vec<Notifiers> = conn.query_map(
        "SELECT id, userid, name, username, zone, role FROM notifiers",
        |(id, userid, name, username, zone, role): (u64, String, String, String, String, String)|
        Notifiers {
            id: Some(id),
            userid: Some(userid),
            name: Some(name),
            username: Some(username),
            password: None,
            zone: Some(zone),
            role: Some(role),
        }
    ).expect("Query failed");

    Json(res)
}

#[get("/notifiers/<id>")]
pub fn get_notifier(id: u64) -> Json<Option<Notifiers>> {
    let mut conn = connection();

    let query = format!("SELECT id, userid, name, username, zone, role FROM notifiers WHERE id = {}", id);

    let res = conn
        .query_first(query)
        .map(|row: std::option::Option<(u64, String, String, String, String, String)>|{
            row.map(
            |(id, userid, name, username, zone, role): (u64, String, String, String, String, String)|
            Notifiers {
                id: Some(id),
                userid: Some(userid),
                name: Some(name),
                username: Some(username),
                password: None,
                zone: Some(zone), 
                role: Some(role) 
            })
        })
        .unwrap();

    Json(res)
}

#[post("/notifiers/create-notifier", format="json", data="<data>")]
pub fn create_notifier(data: Json<Notifiers>) -> Json<Response> {
    let mut conn = connection();
    let query = format!("SELECT * FROM notifiers WHERE username = {:?}", &data.username.as_ref().unwrap());
    let notifier:Vec<Notifiers> = conn.query_map(
        query,
        |(id, userid, name, username, password, zone, role): (u64, String, String, String, String, String, String)|
        Notifiers {
            id: Some(id),
            userid: Some(userid),
            name: Some(name),
            username: Some(username),
            password: Some(password),
            zone: Some(zone), 
            role: Some(role), 
        }
    ).expect("Query failed");

    if notifier.len() != 0 {
        let res: Response = Response {
            succes: None,
            error: Some("Usuario ya registrado".to_string()),
        };

        Json(res)
    } else {
        let pass = &data.password.as_ref().unwrap();
        let hashed = hash(pass, DEFAULT_COST).unwrap();

        conn.exec_drop(
            "INSERT INTO notifiers (userid, name, username, password, zone, role) VALUES (:userid, :name, :username, :password, :zone, :role)",
            params! {
                "userid" => &data.userid,
                "name" => &data.name,
                "username" => &data.username,
                "password" => hashed,
                "zone" => &data.zone,
                "role" => &data.role,
            }
        ).unwrap();
        
        let res: Response = Response {
            succes: Some("Usuario registrado con éxito".to_string()),
            error: None
        };

        Json(res)
    }


}

#[put("/notifiers/update-notifier/<id>", format="json", data="<data>")]
pub fn update_notifier(data: Json<Notifiers>, id: u64) {
    let mut conn = connection();

    conn
        .exec_drop(
            "UPDATE notifiers SET 
                userid = :userid, name = :name, username = :username, zone = :zone, role = :role
                WHERE id = :id
            ",
            params! {
                "userid" => &data.userid,
                "name" => &data.name,
                "username" => &data.username,
                "zone" => &data.zone,
                "role" => &data.role,
                "id" => id,
            }
        )
        .unwrap();
}

#[delete("/notifiers/delete/<id>")]
pub fn delete_notifier(id: u64) {
    let mut conn = connection();

    conn
        .exec_drop(
            "DELETE FROM notifiers WHERE id = :id",
            params! {
                "id" => id
            }
        )
        .unwrap();
}
