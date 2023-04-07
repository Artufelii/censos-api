use crate::db::connection;
use mysql::prelude::Queryable;

pub fn business_table() {
    let mut conn = connection();
    conn.query_drop(
        r"CREATE TABLE IF NOT EXISTS business (
            id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
            notificador VARCHAR(150) NOT NULL,
            folio VARCHAR(150) DEFAULT NULL,
            contrato VARCHAR(200) DEFAULT NULL,
            giro VARCHAR(200) DEFAULT NULL,
            nombre VARCHAR(150) DEFAULT NULL,
            direccion VARCHAR(300) DEFAULT NULL,
            colonia VARCHAR(150) DEFAULT NULL,
            fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            zona VARCHAR(50) DEFAULT NULL,
            estatus VARCHAR(100) DEFAULT NULL,
            obs VARCHAR(300) DEFAULT NULL
        );"
    );
}

pub fn zones_table() {
    let mut conn = connection();
    conn.query_drop(
        r"CREATE TABLE IF NOT EXISTS zones (
            id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
            prefix VARCHAR(150) DEFAULT NULL,
            zone VARCHAR(150) DEFAULT NULL,
            notifier VARCHAR(150) DEFAULT NULL
        );"
    );
}

pub fn notifiers_table() {
    let mut conn = connection();
    conn.query_drop(
        r"CREATE TABLE IF NOT EXISTS notifiers (
            id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
            userid VARCHAR(150) NOT NULL,
            name VARCHAR(150) DEFAULT NULL,
            username VARCHAR(150) DEFAULT NULL,
            password VARCHAR(500) DEFAULT NULL,
            zone VARCHAR(150) DEFAULT NULL,
            role VARCHAR(150) DEFAULT NULL
        );"
    );
}
