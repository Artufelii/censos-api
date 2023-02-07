use crate::db::connection;
use crate::models::Business;
use rocket::serde::json::Json;
use mysql::*;
use mysql::prelude::Queryable;

#[get("/business")]
pub fn fetch_business() -> Json<Vec<Business>> {
    let mut conn = connection();

    let res:Vec<Business> = conn.query_map(
        "SELECT * FROM business",
        |(id, notificador, folio, contrato, giro, nombre, direccion, colonia, fecha, zona, estatus, obs)|
        Business {
            id,
            notificador,
            folio,
            contrato,
            giro,
            nombre,
            direccion,
            colonia,
            fecha,
            zona,
            estatus,
            obs,
        }
    ).expect("Query failed");

    Json(res)
}

#[get("/business/<id>")]
pub fn get_business(id: u64) -> Json<Option<Business>> {
    let mut conn = connection();

    let query = format!("SELECT * FROM business WHERE id = {}", id);

    let res = conn
        .query_first(query)
        .map(|row|{
            row.map(
            |(id, notificador, folio, contrato, giro, nombre, direccion, colonia, fecha, zona, estatus, obs)|
            Business {
                id,
                notificador,
                folio,
                contrato,
                giro,
                nombre,
                direccion,
                colonia,
                fecha,
                zona,
                estatus,
                obs,
            })
        })
        .unwrap();

    Json(res)
}

#[post("/business/create", format="json", data="<data>")]
pub fn create_business(data: Json<Business>){
    let mut conn = connection();
    let folio = format!("SAPASAC/DC/OV/{}", &data.zona);

    conn.exec_drop(
        "INSERT INTO business (notificador, folio, contrato, giro, nombre, direccion, colonia, zona, estatus, obs)
            VALUES (:notificador, :folio, :contrato, :giro, :nombre, :direccion, :colonia, :zona, :estatus, :obs)
        ",
        params! {
            "notificador" => &data.notificador,
            "folio" => folio,
            "contrato" => &data.contrato,
            "giro" => &data.giro,
            "nombre" => &data.nombre,
            "direccion" => &data.direccion,
            "colonia" => &data.colonia,
            "zona" => &data.zona,
            "estatus" => &data.estatus,
            "obs" => &data.obs,
        }
    ).unwrap();

}

#[put("/business/update/<id>", format="json", data="<data>")]
pub fn update_business(data: Json<Business>, id: u64) {
    let mut conn = connection();

    conn
        .exec_drop(
            "UPDATE business SET 
                notificador = :notificador, contrato = :contrato, giro = :giro, nombre = :nombre, 
                direccion = :direccion, colonia = :colonia, zona = :zona, estatus = :estatus, obs = :obs 
                WHERE id = :id
            ",
            params! {
                "notificador" => &data.notificador,
                "contrato" => &data.contrato,
                "giro" => &data.giro,
                "nombre" => &data.nombre,
                "direccion" => &data.direccion,
                "colonia" => &data.colonia,
                "zona" => &data.zona,
                "estatus" => &data.estatus,
                "obs" => &data.obs,
                "id" => id
            }
        )
        .unwrap();
}

#[delete("/business/delete/<id>")]
pub fn delete_business(id: u64) {
    let mut conn = connection();

    conn
        .exec_drop(
            "DELETE FROM business WHERE id = :id",
            params! {
                "id" => id
            }
        )
        .unwrap();
}
