#[macro_use] extern crate rocket;

mod db;
mod models;
mod auth;
mod business;
mod notifiers;
mod zones;
mod migrations;

use std::path::Path;
use std::path::PathBuf;
use rocket::fs::NamedFile;
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

use crate::auth::*;
use crate::business::*;
use crate::notifiers::*;
use crate::zones::*;
use crate::migrations::*;

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>){
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentiasl", "true"));
    }
}

#[get("/")]
async fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new("frontend/dist/").join("index.html")).await.ok()
}

#[get("/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("frontend/dist/").join(file)).await.ok()
}

#[launch]
fn rocket() -> _ {
    business_table();
    zones_table();
    notifiers_table();
    
    rocket::build()
        .attach(CORS)
        .mount("/", routes![index, files])
        .mount("/api", routes![
            fetch_business,
            get_business,
            create_business,
            update_business,
            delete_business,
            fetch_notifiers,
            get_notifier,
            create_notifier,
            update_notifier,
            delete_notifier,
            fetch_zones,
            get_zone,
            create_zone,
            update_zone,
            delete_zone,
            login,
            update_password,
            verify_token
        ])
}
