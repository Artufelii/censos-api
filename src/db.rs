use mysql::*;

pub fn connection() -> PooledConn {
    let url = "mysql://root:Suavicrema2709!@localhost/censos_db";
    let pool = Pool::new(url).unwrap();
    let conn = pool.get_conn().unwrap();

    conn
}
