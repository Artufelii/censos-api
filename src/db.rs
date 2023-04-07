use mysql::*;

pub fn connection() -> PooledConn {
    //let url = "mysql://root:Suavicrema2709!@localhost/censos_db";
    let url = "mysql://root:Rsw59BOOGdwlL4l3fLLa@containers-us-west-16.railway.app:8060/railway";
    //let opts = OptsBuilder::new()
        //.ip_or_hostname(Some("bqdgeb8gbemgjr2pnpcr-mysql.services.clever-cloud.com"))
        //.user(Some("uxulkkpajntrmm5r"))
        //.pass(Some("HXUGEdrDfMKlQVpxXy54"))
        //.db_name(Some("bqdgeb8gbemgjr2pnpcr"));

    let pool = Pool::new(url).unwrap();
    let conn = pool.get_conn().unwrap();

    conn
}
