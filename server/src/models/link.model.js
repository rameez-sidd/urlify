import { pool } from '../db/index.js'

export async function createLink(code, url){
    const result = await pool.query(
        `INSERT INTO LINKS (code, target_url, created_at)
        VALUES ($1, $2, NOW() AT TIME ZONE 'Asia/Kolkata') RETURNING *`,
        [code, url]
    );
    return result.rows[0];
}

export async function findLink(code) {
  const result = await pool.query(
    `SELECT * FROM links WHERE code=$1`,
    [code]
  );
  return result.rows[0];
}

export async function getAllLinks() {
  const result = await pool.query("SELECT * FROM links ORDER BY created_at DESC");
  return result.rows;
}

export async function deleteLink(code) {
  const result = await pool.query(
    `DELETE FROM links WHERE code=$1 RETURNING *`,
    [code]
  );
  return result.rows[0];
}

export async function incrementClicks(code) {
  await pool.query(
    `UPDATE links 
     SET total_clicks = total_clicks + 1, last_clicked = NOW() AT TIME ZONE 'Asia/Kolkata'
     WHERE code=$1`,
    [code]
  );
}