import sql from 'mssql';

let pool: sql.ConnectionPool | null = null; // 커넥션 풀을 저장할 전역 변수

const dbConfig = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE || '',
    // port: parseInt(process.env.DB_PORT || '1433', 10),
    options: {
        instancename: 'SQLEXPRESS',
        trustedconnection: true,
        trustServerCertificate: true,
        encrypt: true, // 필요한 경우 암호화 사용
    },
}

export const ExcuteQuery = async (query: string) => {
    try {
      if (!pool) {
        pool = await sql.connect(dbConfig);
      }
      const result = await pool.request().query(query);
      return result.recordsets;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

export const ExcuteStoredProcedure = async (storedProcName: string, params: any) => {
try {
    if (!pool) {
    pool = await sql.connect(dbConfig);
    }
    const request = pool.request();    
    if (params) { // 인수가 있다면 request에 추가합니다
        for (const key in params) {
            request.input(key, params[key]);
        }
    }

    const result = await request.execute(storedProcName);
    return result.recordsets
} catch (error) {
    console.error('Error executing stored procedure:', error);
    throw error;
}
};
  