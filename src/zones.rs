use crate::db::connection;
use crate::models::Zones;
use mysql::*;
use mysql::prelude::Queryable;
use rocket::serde::json::Json;

#[get("/zones")]
pub fn fetch_zones() -> Json<Vec<Zones>> {
    let mut conn = connection();

    let res:Vec<Zones> = conn.query_map(
        "SELECT * FROM zones",
        |(id, prefix, zone, notifier)|
        Zones {
            id,
            prefix,
            zone,
            notifier
        }
    ).expect("Query failed");

    Json(res)
}

#[get("/zones/<id>")]
pub fn get_zone(id: u64) -> Json<Option<Zones>> {
    let mut conn = connection();

    let query = format!("SELECT * FROM zones WHERE id = {}", id);

    let res = conn
        .query_first(query)
        .map(|row|{
            row.map(
            |(id, prefix, zone, notifier)|
            Zones {
                id,
                prefix,
                zone,
                notifier
            })
        })
        .unwrap();

    Json(res)
}

#[post("/zones/create-zone", format="json", data="<data>")]
pub fn create_zone(data: Json<Zones>){
    let mut conn = connection();

    conn.exec_drop(
        "INSERT INTO zones (prefix, zone, notifier) VALUES (:prefix, :zone, :notifier)",
        params! {
            "prefix" => &data.prefix,
            "zone" => &data.zone,
            "notifier" => &data.notifier
        }
    ).unwrap();

}

#[put("/zones/update-zone/<id>", format="json", data="<data>")]
pub fn update_zone(data: Json<Zones>, id: u64) {
    let mut conn = connection();

    conn
        .exec_drop(
            "UPDATE zones SET 
                prefix = :prefix, zone = :zone, notifier = :notifier 
                WHERE id = :id
            ",
            params! {
                "prefix" => &data.prefix,
                "zone" => &data.zone,
                "notifier" => &data.notifier,
                "id" => id
            }
        )
        .unwrap();
}

#[delete("/zones/delete/<id>")]
pub fn delete_zone(id: u64) {
    let mut conn = connection();

    conn
        .exec_drop(
            "DELETE FROM zones WHERE id = :id",
            params! {
                "id" => id
            }
        )
        .unwrap();
}
