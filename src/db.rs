use mysql::*;
use dotenvy::dotenv;
use std::env;

pub fn connection() -> PooledConn {
    dotenv().ok();
    let url = env::var("MYSQL_URL").expect("MYSQL_URL must be set");
    let opts = Opts::from_url(&url).expect("Invalid MYSQL_URL");
    let pool = Pool::new(opts).unwrap();
    let conn = pool.get_conn().unwrap();

    conn
}
