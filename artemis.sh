#! /bin/bash

create() {
	echo "[+] creating migrations hold on..."
	i=1
	for dir in migration/*; do
		if [ -d "$dir" ]; then
			echo "[+] running migration $i: $dir"
			mariadb -u censos -p'2cD2sP9mmw7d' CENSOS < "$dir/up.sql"
			i=$((i + 1))
		fi
	done
}

drop() {
	echo "[+] dropping migrations hold on..."
	i=1
	for dir in migration/*; do
		if [ -d "$dir" ]; then
			echo "[+] running migration $i: $dir"
			mariadb -u censos -p'2cD2sP9mmw7d' CENSOS < "$dir/down.sql"
			i=$((i + 1))
		fi
	done
}

case "$1" in
	create) create ;;
	drop) drop ;;
	*) echo "Usage: $0 {create|drop}" ;;
esac
