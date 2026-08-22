mod db;

use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, middleware};
use actix_files::Files;
use rusqlite::Connection;
use std::sync::Mutex;

async fn get_models(data: web::Data<db::AppState>) -> HttpResponse {
    let conn = data.db.lock().unwrap();
    match db::list_models(&conn) {
        Ok(models) => HttpResponse::Ok().json(models),
        Err(e) => HttpResponse::InternalServerError().json(serde_json::json!({"error": e.to_string()})),
    }
}

async fn get_deals(data: web::Data<db::AppState>) -> HttpResponse {
    let conn = data.db.lock().unwrap();
    match db::list_deals(&conn) {
        Ok(deals) => HttpResponse::Ok().json(deals),
        Err(e) => HttpResponse::InternalServerError().json(serde_json::json!({"error": e.to_string()})),
    }
}

async fn get_health() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({"status": "ok"}))
}

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));
    
    let db_path = std::env::var("DATABASE_URL").unwrap_or_else(|_| "data/llmdeals.db".to_string());
    let conn = Connection::open(&db_path)?;
    db::init_db(&conn)?;
    
    // Seed with OpenCode Go models if empty
    let count: i32 = conn.query_row("SELECT COUNT(*) FROM models", [], |row| row.get(0))?;
    if count == 0 {
        seed_opencode_go_models(&conn)?;
    }
    
    let data = web::Data::new(db::AppState {
        db: Mutex::new(conn),
    });
    
    log::info!("Starting llmdeals server at http://0.0.0.0:8080");
    
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();
        
        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .app_data(data.clone())
            .route("/api/models", web::get().to(get_models))
            .route("/api/deals", web::get().to(get_deals))
            .route("/api/health", web::get().to(get_health))
            .service(Files::new("/", "./web/dist").index_file("index.html"))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await?;
    
    Ok(())
}

fn seed_opencode_go_models(conn: &Connection) -> Result<(), Box<dyn std::error::Error>> {
    let models = vec![
        db::Model {
            model_id: "mimo-v2.5".to_string(),
            provider: "opencode-go".to_string(),
            name: "MiMo V2.5".to_string(),
            description: Some("Xiaomi's flagship reasoning model with 32B parameters".to_string()),
            input_per_m: 0.14,
            output_per_m: 0.28,
            cache_read_per_m: Some(0.0028),
            context_window: Some(131072),
            max_output: Some(32768),
            has_tool_calling: true,
            has_vision: false,
            has_structured_output: true,
            free_tier: Some("Limited free tier".to_string()),
            free_rpm: Some(10),
            free_rpd: Some(100),
            source_url: Some("https://opencode.ai/go".to_string()),
            observed_at: chrono::Utc::now().to_rfc3339(),
        },
        db::Model {
            model_id: "mimo-v2-pro".to_string(),
            provider: "opencode-go".to_string(),
            name: "MiMo V2 Pro".to_string(),
            description: Some("Enhanced reasoning model with larger context window".to_string()),
            input_per_m: 0.28,
            output_per_m: 0.56,
            cache_read_per_m: Some(0.0056),
            context_window: Some(262144),
            max_output: Some(65536),
            has_tool_calling: true,
            has_vision: true,
            has_structured_output: true,
            free_tier: None,
            free_rpm: None,
            free_rpd: None,
            source_url: Some("https://opencode.ai/go".to_string()),
            observed_at: chrono::Utc::now().to_rfc3339(),
        },
        db::Model {
            model_id: "claude-sonnet-4".to_string(),
            provider: "opencode-go".to_string(),
            name: "Claude Sonnet 4".to_string(),
            description: Some("Anthropic's balanced model for coding and analysis".to_string()),
            input_per_m: 0.30,
            output_per_m: 1.50,
            cache_read_per_m: Some(0.03),
            context_window: Some(200000),
            max_output: Some(64000),
            has_tool_calling: true,
            has_vision: true,
            has_structured_output: true,
            free_tier: None,
            free_rpm: None,
            free_rpd: None,
            source_url: Some("https://opencode.ai/go".to_string()),
            observed_at: chrono::Utc::now().to_rfc3339(),
        },
        db::Model {
            model_id: "gpt-4o".to_string(),
            provider: "opencode-go".to_string(),
            name: "GPT-4o".to_string(),
            description: Some("OpenAI's multimodal flagship model".to_string()),
            input_per_m: 0.25,
            output_per_m: 1.00,
            cache_read_per_m: Some(0.025),
            context_window: Some(128000),
            max_output: Some(16384),
            has_tool_calling: true,
            has_vision: true,
            has_structured_output: true,
            free_tier: None,
            free_rpm: None,
            free_rpd: None,
            source_url: Some("https://opencode.ai/go".to_string()),
            observed_at: chrono::Utc::now().to_rfc3339(),
        },
        db::Model {
            model_id: "gemini-2.5-pro".to_string(),
            provider: "opencode-go".to_string(),
            name: "Gemini 2.5 Pro".to_string(),
            description: Some("Google's advanced reasoning model with huge context".to_string()),
            input_per_m: 0.125,
            output_per_m: 1.00,
            cache_read_per_m: Some(0.0125),
            context_window: Some(1048576),
            max_output: Some(65536),
            has_tool_calling: true,
            has_vision: true,
            has_structured_output: true,
            free_tier: Some("Free tier available".to_string()),
            free_rpm: Some(5),
            free_rpd: Some(50),
            source_url: Some("https://opencode.ai/go".to_string()),
            observed_at: chrono::Utc::now().to_rfc3339(),
        },
        db::Model {
            model_id: "deepseek-r1".to_string(),
            provider: "opencode-go".to_string(),
            name: "DeepSeek R1".to_string(),
            description: Some("DeepSeek's reasoning model with chain-of-thought".to_string()),
            input_per_m: 0.14,
            output_per_m: 0.28,
            cache_read_per_m: Some(0.014),
            context_window: Some(128000),
            max_output: Some(32768),
            has_tool_calling: true,
            has_vision: false,
            has_structured_output: true,
            free_tier: None,
            free_rpm: None,
            free_rpd: None,
            source_url: Some("https://opencode.ai/go".to_string()),
            observed_at: chrono::Utc::now().to_rfc3339(),
        },
    ];
    
    for model in models {
        db::insert_model(conn, &model)?;
    }
    
    // Seed the OpenCode Go deal
    let deal = db::Deal {
        deal_id: "opencode-go-pro".to_string(),
        provider: "opencode-go".to_string(),
        product: "Go Pro".to_string(),
        title: "OpenCode Go Pro Subscription".to_string(),
        deal_type: "subscription_credit".to_string(),
        model_ids: vec!["mimo-v2.5".to_string(), "mimo-v2-pro".to_string(), "claude-sonnet-4".to_string(), "gpt-4o".to_string(), "gemini-2.5-pro".to_string(), "deepseek-r1".to_string()],
        subscription_usd: Some(10.0),
        allowance_usd: Some(60.0),
        effective_input_per_m: Some(0.0233),
        effective_output_per_m: Some(0.0467),
        max_multiplier: Some(6.0),
        savings_pct: Some(83.33),
        expires_at: None,
        canonical_url: Some("https://opencode.ai/go".to_string()),
        observed_at: chrono::Utc::now().to_rfc3339(),
    };
    
    conn.execute(
        "INSERT OR REPLACE INTO deals (deal_id, provider, product, title, deal_type, model_ids, subscription_usd, allowance_usd, effective_input_per_m, effective_output_per_m, max_multiplier, savings_pct, expires_at, canonical_url, observed_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15)",
        rusqlite::params![
            deal.deal_id,
            deal.provider,
            deal.product,
            deal.title,
            deal.deal_type,
            serde_json::to_string(&deal.model_ids).unwrap_or_default(),
            deal.subscription_usd,
            deal.allowance_usd,
            deal.effective_input_per_m,
            deal.effective_output_per_m,
            deal.max_multiplier,
            deal.savings_pct,
            deal.expires_at,
            deal.canonical_url,
            deal.observed_at,
        ],
    )?;
    
    log::info!("Seeded {} models and 1 deal", 6);
    Ok(())
}
