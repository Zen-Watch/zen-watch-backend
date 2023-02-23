https://sehannrathnayake.medium.com/how-to-handle-mysql-database-transactions-with-nodejs-b7a2bf1fd203

const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'dev_user',
    password: 'abc',
    database: 'mysql_transactions'
});

const addStudent = (studentId, name, address, city) => {
    return new Promise((resolve, reject) => {
        pool.getConnection( (err, connection)=> {
            if (err) {
                return reject("Error occurred while getting the connection");
            }
            return connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return reject("Error occurred while creating the transaction");
                }
                return connection.execute(
                    'INSERT INTO STUDENT (STUDENT_ID,NAME) VALUES (?,?)', [studentId, name], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return reject("Inserting to STUDENT table failed", err)
                            });
                        }
                        return connection.execute(
                            'INSERT INTO ADDRESS (STUDENT_ID,ADDRESS,CITY) VALUES (?,?,?)', [studentId, address, city], (err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return reject("Inserting to ADDRESS table failed");
                                    });
                                }
                                return connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return reject("Commit failed");
                                        });
                                    }
                                    connection.release();
                                });
                            })

                    });

            });
        });
    });
}


addStudent(100, 'John Doyle', '221B Baker Street', 'London').catch(err => {
    console.log(err)
});
addStudent(101, 'Michael Smith', '14A Adam Street', 'Invalid value exceeding 20 characters').catch(err => {
    console.log(err)
});