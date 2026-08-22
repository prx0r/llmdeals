use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Model {
    pub model_id: String,
    pub provider: String,
    pub name: String,
    pub description: Option<String>,
    pub input_per_m: f64,
    pub output_per_m: f64,
    pub cache_read_per_m: Option<f64>,
    pub context_window: Option<i32>,
    pub max_output: Option<i32>,
    pub has_tool_calling: bool,
    pub has_vision: bool,
    pub has_structured_output: bool,
    pub free_tier: Option<String>,
    pub free_rpm: Option<i32>,
    pub free_rpd: Option<i32>,
    pub source_url: Option<String>,
    pub observed_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Deal {
    pub deal_id: String,
    pub provider: String,
    pub product: String,
    pub title: String,
    pub deal_type: String,
    pub model_ids: Vec<String>,
    pub subscription_usd: Option<f64>,
    pub allowance_usd: Option<f64>,
    pub effective_input_per_m: Option<f64>,
    pub effective_output_per_m: Option<f64>,
    pub max_multiplier: Option<f64>,
    pub savings_pct: Option<f64>,
    pub expires_at: Option<String>,
    pub canonical_url: Option<String>,
    pub observed_at: String,
}

pub struct AppState {
    pub db: Mutex<Connection>,
}

pub fn init_db(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS models (
            model_id TEXT NOT NULL,
            provider_id TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            input_per_m REAL NOT NULL,
            output_per_m REAL NOT NULL,
            cache_read_per_m REAL,
            context_window INTEGER,
            max_output INTEGER,
            has_tool_calling BOOLEAN DEFAULT FALSE,
            has_vision BOOLEAN DEFAULT FALSE,
            has_structured_output BOOLEAN DEFAULT FALSE,
            free_tier TEXT,
            free_rpm INTEGER,
            free_rpd INTEGER,
            source_url TEXT,
            observed_at TEXT NOT NULL,
            PRIMARY KEY (model_id, provider_id)
        );
        CREATE TABLE IF NOT EXISTS deals (
            deal_id TEXT PRIMARY KEY,
            provider TEXT NOT NULL,
            product TEXT NOT NULL,
            title TEXT NOT NULL,
            deal_type TEXT NOT NULL,
            model_ids TEXT NOT NULL,
            subscription_usd REAL,
            allowance_usd REAL,
            effective_input_per_m REAL,
            effective_output_per_m REAL,
            max_multiplier REAL,
            savings_pct REAL,
            expires_at TEXT,
            canonical_url TEXT,
            observed_at TEXT NOT NULL
        );"
    )?;
    Ok(())
}

pub fn insert_model(conn: &Connection, model: &Model) -> Result<()> {
    conn.execute(
        "INSERT OR REPLACE INTO models (model_id, provider_id, name, description, input_per_m, output_per_m, cache_read_per_m, context_window, max_output, has_tool_calling, has_vision, has_structured_output, free_tier, free_rpm, free_rpd, source_url, observed_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17)",
        rusqlite::params![
            model.model_id,
            model.provider,
            model.name,
            model.description,
            model.input_per_m,
            model.output_per_m,
            model.cache_read_per_m,
            model.context_window,
            model.max_output,
            model.has_tool_calling,
            model.has_vision,
            model.has_structured_output,
            model.free_tier,
            model.free_rpm,
            model.free_rpd,
            model.source_url,
            model.observed_at,
        ],
    )?;
    Ok(())
}

pub fn list_models(conn: &Connection) -> Result<Vec<Model>> {
    let mut stmt = conn.prepare(
        "SELECT model_id, provider_id, name, description, input_per_m, output_per_m, cache_read_per_m, context_window, max_output, has_tool_calling, has_vision, has_structured_output, free_tier, free_rpm, free_rpd, source_url, observed_at FROM models ORDER BY provider_id, model_id"
    )?;
    let rows = stmt.query_map([], |row| {
        Ok(Model {
            model_id: row.get(0)?,
            provider: row.get(1)?,
            name: row.get(2)?,
            description: row.get(3)?,
            input_per_m: row.get(4)?,
            output_per_m: row.get(5)?,
            cache_read_per_m: row.get(6)?,
            context_window: row.get(7)?,
            max_output: row.get(8)?,
            has_tool_calling: row.get(9)?,
            has_vision: row.get(10)?,
            has_structured_output: row.get(11)?,
            free_tier: row.get(12)?,
            free_rpm: row.get(13)?,
            free_rpd: row.get(14)?,
            source_url: row.get(15)?,
            observed_at: row.get(16)?,
        })
    })?.collect::<Result<Vec<_>, _>>()?;
    Ok(rows)
}

pub fn list_deals(conn: &Connection) -> Result<Vec<Deal>> {
    let mut stmt = conn.prepare(
        "SELECT deal_id, provider, product, title, deal_type, model_ids, subscription_usd, allowance_usd, effective_input_per_m, effective_output_per_m, max_multiplier, savings_pct, expires_at, canonical_url, observed_at FROM deals ORDER BY savings_pct DESC"
    )?;
    let rows = stmt.query_map([], |row| {
        let model_ids_str: String = row.get(5)?;
        Ok(Deal {
            deal_id: row.get(0)?,
            provider: row.get(1)?,
            product: row.get(2)?,
            title: row.get(3)?,
            deal_type: row.get(4)?,
            model_ids: serde_json::from_str(&model_ids_str).unwrap_or_default(),
            subscription_usd: row.get(6)?,
            allowance_usd: row.get(7)?,
            effective_input_per_m: row.get(8)?,
            effective_output_per_m: row.get(9)?,
            max_multiplier: row.get(10)?,
            savings_pct: row.get(11)?,
            expires_at: row.get(12)?,
            canonical_url: row.get(13)?,
            observed_at: row.get(14)?,
        })
    })?.collect::<Result<Vec<_>, _>>()?;
    Ok(rows)
}
